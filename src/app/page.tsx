'use client';

import { useState } from 'react';
import DecisionForm from '@/components/DecisionForm';
import AnalysisResult from '@/components/AnalysisResult';
import { DecisionRequest, DecisionAnalysis } from '@/types';
import { Sparkles, BrainCircuit, RefreshCw } from 'lucide-react';

export default function Home() {
  const [analysis, setAnalysis] = useState<DecisionAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (data: DecisionRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:8000/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }
      
      const result = await res.json();
      setAnalysis(result);
    } catch (err) {
      console.error(err);
      setError('Failed to analyze decision. Please ensure the backend is running and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setAnalysis(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans selection:bg-blue-100 dark:selection:bg-blue-900">
      <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2 rounded-lg">
              <BrainCircuit className="w-6 h-6 text-white" />
            </div>
            <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700 dark:from-blue-400 dark:to-indigo-400">
              Decision Copilot
            </span>
          </div>
          
        </div>
      </header>

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          {!analysis && (
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
                Make Smarter Decisions with <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
                  Artificial Intelligence
                </span>
              </h1>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                Describe your dilemma, list your options, and let our AI agent analyze the trade-offs, risks, and benefits to calculate the optimal path forward.
              </p>
            </div>
          )}

          {error && (
            <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-800 flex items-center gap-2">
              <span className="font-bold">Error:</span> {error}
            </div>
          )}

          {!analysis ? (
            <DecisionForm onSubmit={handleAnalyze} isLoading={isLoading} />
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
               <div className="flex justify-between items-center max-w-4xl mx-auto mb-8">
                 <h2 className="text-2xl font-bold">Analysis Report</h2>
                 <button 
                   onClick={handleReset}
                   className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-600 bg-white border border-zinc-200 rounded-lg hover:bg-zinc-50 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300 transition-colors shadow-sm"
                 >
                   <RefreshCw className="w-4 h-4" /> New Decision
                 </button>
               </div>
               <AnalysisResult analysis={analysis} />
            </div>
          )}
        </div>
      </main>
      
      <footer className="py-8 text-center text-sm text-zinc-500 border-t border-zinc-200 dark:border-zinc-800">
        <p>© 2026 Decision Copilot. Powered by Next.js & Pydantic AI.</p>
      </footer>
    </div>
  );
}
