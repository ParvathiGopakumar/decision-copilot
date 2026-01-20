# 🧠 Decision Copilot

Decision Copilot is a full-stack **AI-assisted** decision analysis application that helps users evaluate multiple options against constraints and risk tolerance, and provides a structured, explainable recommendation. The system is designed with graceful fallback intelligence, ensuring reliable outputs even when external AI services are unavailable.

---

## 🚀 Features

- 📋 Accepts real-world decision problems with multiple options  
- ⚖️ Evaluates options using:  
  - Pros  
  - Cons  
  - Risks  
  - Numerical scoring  
- 🎯 Generates a clear recommendation with confidence score  
- 🦩 Structured JSON output (schema-driven)  
- 🛡️ Built-in fallback decision engine for reliability  
- 🌐 Full-stack setup (Next.js + FastAPI)

---

## 🏇 Architecture

### Frontend

- Next.js (App Router)  
- TypeScript  
- Tailwind CSS  
- Responsive UI with structured result visualization

### Backend

- FastAPI  
- Pydantic models for strict validation  
- Modular AI agent layer  
- Deterministic fallback decision engine

---

## 🧠 Decision Intelligence Flow

1. User submits:
   - Decision description  
   - Options (minimum 2)  
   - Constraints  
   - Risk tolerance  

2. Backend constructs a structured prompt.

3. Primary AI Agent attempts structured analysis.

4. If unavailable or invalid:
   - Fallback Decision Engine produces a deterministic, explainable analysis.

5. Frontend renders:
   - Option comparison cards  
   - Scores  
   - Recommendation  
   - Confidence level  

This design ensures the application never fails silently and always produces a meaningful result.

---

## 🔁 Fallback Handling (Reliability by Design)

The system includes an internal fallback decision engine that:

- Uses rule-based scoring  
- Adjusts scores based on risk tolerance  
- Produces consistent, explainable outputs  
- Matches the same response schema as the AI agent  

This allows the application to:

- Remain functional during API outages  
- Be deployed without dependency on paid services  
- Maintain a seamless user experience  

---

## 📁 Project Structure

```
decision-copilot/
│
├── backend/
│   ├── agent.py              # AI agent configuration
│   ├── fallback_ai.py        # Deterministic fallback engine
│   ├── main.py               # FastAPI entry point
│   ├── models.py             # Pydantic schemas
│   └── requirements.txt
│
├── src/
│   ├── app/                  # Next.js app router
│   ├── components/           # UI components
│   └── types.ts              # Shared types
│
└── README.md
```

---

## ▶️ Running the Project Locally

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn backend.main:app --reload --port 8000
```

### Frontend

```bash
npm install
npm run dev
```

- Frontend runs on: `http://localhost:3000`  
- Backend runs on: `http://localhost:8000`  

---

## 🧪 Example Demo Input

**Decision**  
- Should I relocate for a new job?

**Options**

- Relocate to London — Better work-life balance  
- Relocate to New York — Higher salary and growth  

**Constraints**

- Visa requirements  
- Cost of living  

**Risk Tolerance**

- Medium

  ## Result

  <img width="1280" height="719" alt="image" src="https://github.com/ParvathiGopakumar/decision-copilot/blob/f486118e79ba32d179650ca9ce91cb3796ad0882/Screenshot%202026-01-20%20150338.png" />
  <img width="1280" height="719" alt="image" src="https://github.com/ParvathiGopakumar/decision-copilot/blob/f486118e79ba32d179650ca9ce91cb3796ad0882/Screenshot%202026-01-20%20150751.png" />

---
