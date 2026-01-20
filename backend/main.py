from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.models import DecisionRequest, DecisionAnalysis
from backend.agent import decision_agent
from backend.fallback_ai import fallback_decision_engine
from dotenv import load_dotenv
import json

load_dotenv()

app = FastAPI(title="Decision Copilot API")

# Allow CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/analyze", response_model=DecisionAnalysis)
async def analyze_decision(request: DecisionRequest):
    print(f"Received request: {request.description}")

    prompt = f"""
Decision Context: {request.description}
Risk Tolerance: {request.risk_tolerance}
Constraints: {', '.join(request.constraints) if request.constraints else 'None'}

Options:
{chr(10).join(f"- {o.name}: {o.description}" for o in request.options)}
"""

    try:
        # 🔹 Run AI agent
        result = await decision_agent.run(prompt)
        raw_response = result.data
        print("Agent Raw Response:", raw_response)

        # 🔹 Clean markdown fences if present
        clean_json = raw_response
        if "```json" in clean_json:
            clean_json = clean_json.split("```json")[1].split("```")[0].strip()
        elif "```" in clean_json:
            clean_json = clean_json.split("```")[1].split("```")[0].strip()

        data = json.loads(clean_json)

        return DecisionAnalysis(**data)

    except Exception as e:
       print(f"The better decision would be: {e}")

       return fallback_decision_engine(
           description=request.description,
           options=request.options,
           constraints=request.constraints,
           risk_tolerance=request.risk_tolerance
    )



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
