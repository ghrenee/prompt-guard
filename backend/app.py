# backend/app.py

from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/api/analyze', methods=['POST'])
def analyze_prompt():
    """
    This is the core endpoint for our walking skeleton.
    It confirms the backend is reachable.
    """
    # We'll add our GPT-5 logic here later.
    # For now, just return a success message.
    
    response_data = {
      "flaw_type": "Test",
      "suggestion": "Success! The backend is connected."
    }
    
    return jsonify(response_data)

if __name__ == '__main__':
    # We run on port 5001 to avoid potential conflicts with other services
    app.run(debug=True, port=5001)