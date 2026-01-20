import os
from dotenv import load_dotenv
from pathlib import Path
from pydantic_ai import Agent
from pydantic_ai.models.openai import OpenAIModel

# Load .env explicitly from backend/
env_path = Path(__file__).resolve().parent / ".env"
load_dotenv(dotenv_path=env_path)

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

if not OPENROUTER_API_KEY:
    raise RuntimeError("OPENROUTER_API_KEY not found in backend/.env")

# Force OpenRouter config
os.environ.clear()  # prevents ghost OpenAI vars
os.environ["OPENAI_API_KEY"] = OPENROUTER_API_KEY
os.environ["OPENAI_BASE_URL"] = "https://openrouter.ai/api/v1"

# 🔁 Free models fallback order
MODEL_CANDIDATES = [
    "meta-llama/llama-3.2-3b-instruct:free",
    "mistralai/mistral-7b-instruct:free",
    "google/gemini-2.0-flash-exp:free",
]

SYSTEM_PROMPT = (
    "You are a Decision Copilot.\n"
    "Return ONLY valid JSON.\n"
    "The JSON MUST strictly match this schema:\n"
    "{"
    " summary: string,"
    " criteria: string[],"
    " options_analysis: {name, pros, cons, risks, score}[],"
    " trade_offs: string[],"
    " recommendation: string,"
    " reasoning: string,"
    " confidence_score: number"
    "}"
)

last_error = None
decision_agent = None

for model_name in MODEL_CANDIDATES:
    try:
        model = OpenAIModel(model_name)
        decision_agent = Agent(
            model,
            system_prompt=SYSTEM_PROMPT,
        )
        print(f"✅ Using model: {model_name}")
        break
    except Exception as e:
        print(f"❌ Model failed: {model_name} → {e}")
        last_error = e

if not decision_agent:
    raise RuntimeError(f"All models failed. Last error: {last_error}")
