void setup() {
  Serial.begin(9600); // Initialize serial communication at 9600 baud rate
  while (!Serial) {
    ; // Wait for serial port to connect
  }
  Serial.println("Gateway ready to receive data");
}

void loop() {
  if (Serial.available()) {
    String receivedData = Serial.readStringUntil('\n'); // Read data from serial
    // Serial.println("Data received: " + receivedData);   // Display the received data
  }
}
