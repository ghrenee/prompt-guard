import os
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from dotenv import load_dotenv
import openai

load_dotenv()  # Load OPENAI_API_KEY from .env
openai.api_key = os.getenv("OPENAI_API_KEY")

app = Flask(__name__, static_folder='static', template_folder='templates')
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/analyze', methods=['POST'])
def analyze():
    data = request.get_json() or {}
    user_prompt = data.get('prompt', '').strip()

    # Build a system prompt asking ChatGPT‑5 to categorize and improve the prompt.
    # Feel free to tailor these instructions to your needs.
    system_prompt = (
        "You are Prompt Guard, a helpful assistant that analyzes user prompts "
        "for large language models. Your tasks are:\n"
        "1. Identify any issues in the prompt (vague, ambiguous, contradictory, malformed, etc.).\n"
        "2. Suggest either an improved prompt or a clarifying question.\n"
        "Respond in JSON with two keys: 'flaw' and 'improved_prompt'."
    )

    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt}
    ]

    try:
        completion = openai.ChatCompletion.create(
            model="gpt-5",         # or the most capable ChatGPT model available to you
            messages=messages,
            temperature=0.0
        )
        # Expecting the assistant to reply with JSON
        assistant_reply = completion.choices[0].message.content
        result = json.loads(assistant_reply)
        return jsonify(result), 200

    except Exception as e:
        # If something goes wrong (rate limits, JSON parsing, etc.), fall back gracefully
        return jsonify({
            "flaw": "Error during analysis",
            "improved_prompt": str(e)
        }), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
