from pydantic import BaseModel, Field
from typing import List, Optional

class Option(BaseModel):
    name: str = Field(..., description="Name of the option")
    description: Optional[str] = Field(None, description="Detailed description of the option")

class DecisionRequest(BaseModel):
    description: str = Field(..., description="Description of the decision to be made")
    options: List[Option] = Field(..., description="List of available options")
    constraints: List[str] = Field(default_factory=list, description="Constraints or limitations")
    risk_tolerance: str = Field(..., description="User's risk tolerance (e.g., Low, Medium, High)")

class AnalyzedOption(BaseModel):
    name: str
    pros: List[str]
    cons: List[str]
    risks: List[str]
    score: int = Field(description="Score out of 10 based on suitability")

class DecisionAnalysis(BaseModel):
    summary: str = Field(..., description="Executive summary of the decision context")
    criteria: List[str] = Field(..., description="Criteria used for evaluation")
    options_analysis: List[AnalyzedOption] = Field(..., description="Detailed analysis of each option")
    trade_offs: List[str] = Field(..., description="Key trade-offs identified")
    recommendation: str = Field(..., description="The recommended option")
    reasoning: str = Field(..., description="Reasoning behind the recommendation")
    confidence_score: float = Field(..., description="Confidence score between 0 and 1")
