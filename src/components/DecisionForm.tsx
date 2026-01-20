'use client';

import { useState } from 'react';
import { DecisionRequest, Option } from '@/types';
import { Plus, Trash2, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface DecisionFormProps {
  onSubmit: (data: DecisionRequest) => void;
  isLoading: boolean;
}

export default function DecisionForm({ onSubmit, isLoading }: DecisionFormProps) {
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState<Option[]>([{ name: '', description: '' }, { name: '', description: '' }]);
  const [constraints, setConstraints] = useState('');
  const [riskTolerance, setRiskTolerance] = useState('Medium');

  const addOption = () => {
    setOptions([...options, { name: '', description: '' }]);
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const updateOption = (index: number, field: keyof Option, value: string) => {
    const newOptions = [...options];
    newOptions[index] = { ...newOptions[index], [field]: value };
    setOptions(newOptions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const constraintList = constraints.split('\n').map(c => c.trim()).filter(c => c);
    const validOptions = options.filter(o => o.name.trim());
    
    if (!description || validOptions.length < 2) return;

    onSubmit({
      description,
      options: validOptions,
      constraints: constraintList,
      risk_tolerance: riskTolerance
    });
  };

  return (
    <motion.form 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto space-y-6 bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800"
      onSubmit={handleSubmit}
    >
      <div>
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          What decision do you need to make?
        </label>
        <textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g., Should I relocate for a new job in London or stay in New York?"
          className="w-full p-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none h-24"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          Options (Minimum 2)
        </label>
        <div className="space-y-3">
          {options.map((option, idx) => (
            <div key={idx} className="flex gap-2 items-start">
              <div className="flex-1 space-y-2">
                <input
                  required
                  value={option.name}
                  onChange={(e) => updateOption(idx, 'name', e.target.value)}
                  placeholder={`Option ${idx + 1} Name`}
                  className="w-full p-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <input
                  value={option.description || ''}
                  onChange={(e) => updateOption(idx, 'description', e.target.value)}
                  placeholder="Description (Optional)"
                  className="w-full p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              {options.length > 2 && (
                <button
                  type="button"
                  onClick={() => removeOption(idx)}
                  className="p-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors mt-0.5"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addOption}
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium px-2 py-1"
          >
            <Plus className="w-4 h-4" /> Add Another Option
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Constraints (One per line)
          </label>
          <textarea
            value={constraints}
            onChange={(e) => setConstraints(e.target.value)}
            placeholder="e.g., Budget under ₹50k&#10;Must happen within 3 months"
            className="w-full p-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none h-32 resize-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Risk Tolerance
          </label>
          <div className="space-y-2">
            {['Low', 'Medium', 'High'].map((level) => (
              <label key={level} className="flex items-center p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                <input
                  type="radio"
                  name="risk"
                  value={level}
                  checked={riskTolerance === level}
                  onChange={(e) => setRiskTolerance(e.target.value)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-3 font-medium text-zinc-700 dark:text-zinc-300">{level}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition-all transform active:scale-98 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" /> Analyzing Decision...
          </>
        ) : (
          <>
            Analyze with AI <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>
    </motion.form>
  );
}
