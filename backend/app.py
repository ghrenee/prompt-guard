# backend/app.py
import os
from flask import Flask, jsonify, request, render_template
import openai
from dotenv import load_dotenv
import json

load_dotenv()

app = Flask(__name__, template_folder='templates')

# Configure OpenAI client
openai.api_key = os.getenv("OPENAI_API_KEY")

META_PROMPT_TEMPLATE = """
You are a world-class prompt engineering expert and AI safety specialist. Your task is to analyze the user’s input prompt. Return your response ONLY as a valid JSON object with three keys: "risk_level" (either 'Safe', 'Warning', or 'Danger'), "analysis" (a single sentence explaining your reasoning), and "suggestion" (a rewritten, safer version of the prompt).

User prompt: \"\"\"{user_prompt}\"\"\"
"""

# ROUTE 1: SERVE THE WEBPAGE
@app.route('/')
def index():
    return render_template('index.html')

# ROUTE 2: HANDLE THE API CALL
@app.route('/api/analyze', methods=['POST'])
def analyze_prompt():
    data = request.get_json()
    if not data or 'prompt' not in data:
        return jsonify({"error": "No prompt provided"}), 400

    user_prompt = data['prompt']

    try:
        response = openai.chat.completions.create(
            model="gpt-4-turbo",
            messages=[{"role": "system", "content": META_PROMPT_TEMPLATE.format(user_prompt=user_prompt)}],
            response_format={"type": "json_object"}
        )
        analysis_data = json.loads(response.choices[0].message.content)
        return jsonify(analysis_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)