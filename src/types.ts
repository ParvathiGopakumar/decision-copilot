export interface Option {
    name: string;
    description?: string;
}

export interface DecisionRequest {
    description: string;
    options: Option[];
    constraints: string[];
    risk_tolerance: string;
}

export interface AnalyzedOption {
    name: string;
    pros: string[];
    cons: string[];
    risks: string[];
    score: number;
}

export interface DecisionAnalysis {
    summary: string;
    criteria: string[];
    options_analysis: AnalyzedOption[];
    trade_offs: string[];
    recommendation: string;
    reasoning: string;
    confidence_score: number;
}
