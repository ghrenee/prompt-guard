# prompt-guard-mvp/app.py
import os
from flask import Flask, jsonify, request, render_template
import openai
from dotenv import load_dotenv
import json

load_dotenv()
app = Flask(__name__, template_folder='.')
openai.api_key = os.getenv("OPENAI_API_KEY")

META_PROMPT_TEMPLATE = """
You are a world-class prompt engineering expert and AI safety specialist. Your task is to analyze the user’s input prompt.

Your analysis must have three parts:
1.  **Risk Level:** Categorize as 'Safe', 'Warning', or 'Danger'.
2.  **Analysis:** A single sentence explaining your reasoning.
3.  **Suggestion:** A rewritten, safer, or more specific version of the prompt. **If the original prompt is already good, suggest an even better, more detailed version.**

Return your response ONLY as a valid JSON object with the keys "risk_level", "analysis", and "suggestion".

User prompt: \"\"\"{user_prompt}\"\"\"
"""

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/analyze', methods=['POST'])
def analyze_prompt():
    # ... (rest of the file is the same)
    data = request.get_json()
    user_prompt = data.get('prompt', '')
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