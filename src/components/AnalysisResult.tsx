'use client';

import { DecisionAnalysis, AnalyzedOption } from '@/types';
import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, TrendingUp, Info } from 'lucide-react';

interface AnalysisResultProps {
  analysis: DecisionAnalysis;
}

export default function AnalysisResult({ analysis }: AnalysisResultProps) {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 border border-zinc-200 dark:border-zinc-800"
      >
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
          Analysis Outcome
        </h2>
        <p className="text-zinc-600 dark:text-zinc-300 text-lg leading-relaxed mb-6">
          {analysis.summary}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {analysis.criteria.map((criterion, i) => (
            <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100">
              {criterion}
            </span>
          ))}
        </div>

        <div className="p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800 mb-8">
          <div className="flex items-center gap-3 mb-3">
            <CheckCircle className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-xl font-semibold text-indigo-900 dark:text-indigo-200">Recommendation</h3>
          </div>
          <p className="text-lg font-medium text-indigo-800 dark:text-indigo-300 mb-2">
            {analysis.recommendation}
          </p>
          <p className="text-indigo-700 dark:text-indigo-400">
            {analysis.reasoning}
          </p>
          <div className="mt-4 flex items-center gap-2">
            <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">Confidence Score:</span>
            <div className="h-2 w-32 bg-indigo-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-600 rounded-full"
                style={{ width: `${analysis.confidence_score * 100}%` }}
              />
            </div>
            <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
              {(analysis.confidence_score * 100).toFixed(0)}%
            </span>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-zinc-800 dark:text-white">Option Analysis</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {analysis.options_analysis.map((option, idx) => (
              <OptionCard key={idx} option={option} />
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800">
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-3 text-zinc-800 dark:text-zinc-200">
            <TrendingUp className="w-5 h-5 text-amber-500" />
            Trade-offs
          </h3>
          <ul className="list-disc list-inside space-y-1 text-zinc-600 dark:text-zinc-400">
            {analysis.trade_offs.map((tradeoff, i) => (
              <li key={i}>{tradeoff}</li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}

function OptionCard({ option }: { option: AnalyzedOption }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:border-blue-300 transition-colors"
    >
      <div className="flex justify-between items-start mb-4">
        <h4 className="text-lg font-bold text-zinc-900 dark:text-white">{option.name}</h4>
        <span className={`px-2 py-1 rounded text-xs font-bold ${
          option.score >= 8 ? 'bg-green-100 text-green-700' :
          option.score >= 5 ? 'bg-yellow-100 text-yellow-700' :
          'bg-red-100 text-red-700'
        }`}>
          Score: {option.score}/10
        </span>
      </div>
      
      <div className="space-y-3">
        <div>
          <span className="text-xs font-semibold text-green-600 uppercase tracking-wider">Pros</span>
          <ul className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            {option.pros.map((pro, i) => <li key={i} className="flex gap-2"><span className="text-green-500">+</span> {pro}</li>)}
          </ul>
        </div>
        <div>
          <span className="text-xs font-semibold text-red-600 uppercase tracking-wider">Cons</span>
          <ul className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            {option.cons.map((con, i) => <li key={i} className="flex gap-2"><span className="text-red-500">-</span> {con}</li>)}
          </ul>
        </div>
        {option.risks.length > 0 && (
          <div>
            <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" /> Risks
            </span>
            <ul className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
              {option.risks.map((risk, i) => <li key={i} className="italic">{risk}</li>)}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
}
