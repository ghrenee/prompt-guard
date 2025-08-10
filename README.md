# 🛡️ Prompt Guard: The Enterprise Firewall for LLMs

*Submission for Hack-Nation.ai 2025, Challenge #6: FailProof LLM*

---

## Core Concept

Prompt Guard is a proactive, enterprise-grade security layer for Large Language Models. It acts as a real-time, intelligent shield that sits between users and an organization's AI, preventing the "garbage in, garbage out" problem at the source. Our live demo showcases the core "Guard" engine, which analyzes user prompts for malicious intent (like prompt injections) or vagueness, and coaches the user to provide safer, more effective inputs. This protects expensive AI investments from misuse and brand-damaging errors.

## The Two-Part Demo

This submission consists of two components that demonstrate our product and our vision:

1.  **The Live MVP (`prompt-guard-mvp`):** A working, end-to-end application that shows the core "Guard" engine in action. It uses a Flask backend and OpenAI's GPT-4-turbo to analyze user prompts in real-time.
2.  **The Vision Dashboard (`prompt-guard-dashboard`):** A static mockup of our full B2B product, the "FailProof LLM" analytics platform. This dashboard shows the enterprise-level security insights and threat intelligence that would be aggregated from all "Prompt Guard" instances.

## Tech Stack

* **Backend:** Python, Flask, OpenAI API (GPT-4-turbo)
* **Frontend (MVP):** HTML, CSS, Vanilla JavaScript
* **Frontend (Dashboard):** HTML, CSS, JavaScript with Chart.js

---

## Getting Started & How to Run

This project contains two separate applications.

### Prerequisites
* Python 3.10+
* An OpenAI API Key

### 1. The Live MVP (The Engine)

1.  **Navigate to the MVP folder:**
    ```bash
    cd prompt-guard-mvp
    ```
2.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
3.  **Set up your API key:**
    * Create a file named `.env` inside the `prompt-guard-mvp` folder.
    * Add your OpenAI API key to it like this: `OPENAI_API_KEY=sk-xxxxxxxxxx`
4.  **Run the server:**
    ```bash
    python3 app.py
    ```
5.  View the application at `http://127.0.0.1:5001`.

### 2. The Vision Dashboard (The Mockup)

1.  **Navigate to the dashboard folder:**
    ```bash
    cd prompt-guard-dashboard
    ```
2.  **Run the simple server:**
    ```bash
    python3 -m http.server 8000
    ```
3.  View the dashboard at `http://127.0.0.1:8000`.
