from flask import Flask, request, jsonify
from flask_cors import CORS
from pprint import pprint
import warnings
import json
from datetime import datetime
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from llama_index.llms.upstage import Upstage
from llama_index.embeddings.upstage import UpstageEmbedding
from llama_index.core.settings import Settings
from llama_index.core import Document
from llama_index.core import VectorStoreIndex
from llama_index.core.node_parser import SentenceWindowNodeParser
from llama_index.core.postprocessor import MetadataReplacementPostProcessor
from smtp_email_sender import send_email_async
import asyncio

app = Flask(__name__)
CORS(app)


from dotenv import load_dotenv

load_dotenv()

warnings.filterwarnings("ignore")
cred = credentials.Certificate('./phy00007-guardian-firebase-adminsdk-p8f3k-e9cd734047.json')
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://phy00007-guardian-default-rtdb.asia-southeast1.firebasedatabase.app/'
})

llm = Upstage(model="solar-pro-241126")
embed = UpstageEmbedding(model="solar-embedding-1-large")
Settings.llm = llm
Settings.embeddings = embed

index = None
query_engine = None

def get_latest_data(sensor_data):
    newest_data = None
    print(sensor_data)
    for timestamp, data in sensor_data.items():
        if newest_data is None or data['timestamp'] > newest_data['timestamp']:
            newest_data = data
    return newest_data

async def notify_latest_data_danger_level(sensor_data):
    data = get_latest_data(sensor_data)
    temperature = data['temperature']
    airMoisture = data['air_moisture']
    distance = data['distance']
    lightIntensity = data['light_intensity']
    movingMagnitude = data['moving_magnitude']
    soilMoisture = data['soil_moisture']
    coConcentration = data['co_concentration']
    dangerScore = 0
    dangerLevel = "LOW"
    if (temperature > 35 or temperature < 15):
        dangerScore += 2
    if (airMoisture < 30 or airMoisture > 80):
        dangerScore += 2
    if (distance < 50):
        dangerScore += 2
    if (lightIntensity < 10):
        dangerScore += 1
    if (movingMagnitude > 2):
        dangerScore += 2
    if (soilMoisture < 20 or soilMoisture > 80):
        dangerScore += 2
    if (coConcentration > 5):
        dangerScore += 2

    if (dangerScore >= 6):
        dangerLevel= "HIGH"
    if (dangerScore >= 3):
        dangerLevel= "AVERAGE"
    print(dangerLevel)
    
    if (dangerLevel == "HIGH" or dangerLevel == "AVERAGE"):
        info = f"""
        Timestamp: {data['timestamp']}<br>
        Temperature: {temperature}°F<br>
        Air Moisture: {airMoisture}%<br>
        Distance: {distance} cm<br>
        Light Intensity: {lightIntensity} lux<br>
        Moving Magnitude: {movingMagnitude}<br>
        Soil Moisture: {soilMoisture}%<br>
        CO Concentration: {coConcentration} ppm<br>
        Danger Level: <strong>{dangerLevel}</strong><br>
        """

        receiver = "johnysiu2004@gmail.com"
        await send_email_async(receiver, info)
    return

def initialize_rag():
    global index, query_engine
    
    def fetch_sensor_data(node_id):
        ref = db.reference(f'/nodes/{node_id}/data')
        return ref.get()

    def format_data(sensor_data):
        formatted_documents = []
        for timestamp, data in sensor_data.items():
            text = f"""
            Timestamp: {data['timestamp']}
            Temperature: {data['temperature']}°F
            Air Moisture: {data['air_moisture']}%
            CO Concentration: {data['co_concentration']} ppm
            Distance: {data['distance']} cm
            Light Intensity: {data['light_intensity']} lux
            Moving Magnitude: {data['moving_magnitude']}
            Soil Moisture: {data['soil_moisture']}%
            """
            doc = Document(
                text=text,
                metadata={
                    "timestamp": data['timestamp'],
                    "data_type": "sensor_reading"
                }
            )
            formatted_documents.append(doc)

        return formatted_documents

    sensor_data = fetch_sensor_data("ph5H1bCl3nb2rI7FU1Ac")
    documents = format_data(sensor_data)
    asyncio.create_task(notify_latest_data_danger_level(sensor_data))
    
    node_parser = SentenceWindowNodeParser.from_defaults(
        window_size=3,
        window_metadata_key="window",
        original_text_metadata_key="original_text",
    )
    
    nodes = node_parser.get_nodes_from_documents(documents)
    index = VectorStoreIndex(nodes, embed_model=embed)
    
    query_engine = index.as_query_engine(
        similarity_top_k=3,
        node_postprocessors=[
            MetadataReplacementPostProcessor(target_metadata_key="window")
        ],
    )

initialize_rag()
print("[RAG] Initialized")

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        message = data.get('message')
        
        if not message:
            return jsonify({'error': 'No message provided'}), 400
            
        response = query_engine.query(message)
        return jsonify({'response': str(response)})
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
