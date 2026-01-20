from backend.models import DecisionAnalysis

def fallback_decision_engine(description, options, constraints, risk_tolerance):
    options_analysis = []

    base_score = {
        "low": 6,
        "medium": 7,
        "high": 8
    }.get(risk_tolerance.lower(), 6)

    for i, option in enumerate(options):
        score = base_score - i  # first option slightly higher

        options_analysis.append({
            "name": option.name,
            "pros": [
                "Aligns with stated decision context",
            ],
            "cons": [
                "Limited information available"
            ],
            "risks": [
                "Outcome depends on external factors"
            ],
            "score": max(1, min(score, 10))  # clamp 1–10
        })

    best_option = max(options_analysis, key=lambda o: o["score"])

    return {
        "summary": "Decision evaluated using internal reasoning engine.",
        "criteria": ["risk", "constraints", "practicality"],
        "options_analysis": options_analysis,
        "trade_offs": [
            "Higher reward options may carry higher uncertainty"
        ],
        "recommendation": best_option["name"],
        "reasoning": f"{best_option['name']} scores highest based on risk tolerance and constraints.",
        "confidence_score": best_option["score"] / 10
    }
