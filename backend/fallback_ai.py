from backend.models import DecisionAnalysis

def fallback_decision_engine(description, options, constraints, risk_tolerance):
    analyses = []

    for idx, option in enumerate(options):
        pros = []
        cons = []
        risks = []

        name = option.name.lower()

      
        if "startup" in name:
            pros += [
                "Faster learning through hands-on responsibilities",
                "Greater ownership and impact in early-stage teams",
            ]
            cons += [
                "Lower job stability compared to established firms",
                "Work-life balance may be unpredictable",
            ]
            risks += [
                "Business sustainability depends on funding and market conditions",
            ]
            score = 7 if risk_tolerance != "low" else 5

        elif "corporate" in name:
            pros += [
                "Higher job stability and structured career paths",
                "Clear processes and established support systems",
            ]
            cons += [
                "Slower skill diversification",
                "Limited autonomy in decision-making",
            ]
            risks += [
                "Career growth may be slower due to hierarchy",
            ]
            score = 6 if risk_tolerance != "high" else 7

        else:
            pros += ["Meets some stated requirements"]
            cons += ["Insufficient information to fully evaluate"]
            risks += ["Unclear long-term implications"]
            score = 5

        analyses.append({
            "name": option.name,
            "pros": pros,
            "cons": cons,
            "risks": risks,
            "score": score,
        })

    best_option = max(analyses, key=lambda x: x["score"])

    return DecisionAnalysis(
        summary="Decision evaluated using structured reasoning based on provided context.",
        criteria=["Risk tolerance", "Stability", "Growth potential"],
        options_analysis=analyses,
        trade_offs=[
            "Higher growth often comes with increased risk",
            "Stability may limit rapid skill expansion",
        ],
        recommendation=best_option["name"],
        reasoning=f"{best_option['name']} aligns better with the stated risk tolerance and constraints.",
        confidence_score=0.75,
    )
