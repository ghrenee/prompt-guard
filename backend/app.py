from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return "Hello from the backend!"

@app.route('/api/analyze', methods=['POST'])
def analyze_prompt():
    response_data = {
      "flaw_type": "Test",
      "suggestion": "Success! The backend is connected."
    }
    return jsonify(response_data)

if __name__ == '__main__':
    app.run(debug=True, port=5001)
  