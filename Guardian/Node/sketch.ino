void setup() {
  Serial.begin(9600); // Initialize serial communication at 9600 baud rate
  while (!Serial) {
    ; // Wait for serial port to connect
  }
}

void loop() {
  Serial.println("Hello World"); // Send data
  Serial.println("Data sent");   // Display message
  delay(1000);                  // Wait for a second before sending next data
}
