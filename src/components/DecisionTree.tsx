import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Check, RefreshCw } from 'lucide-react';
import modesData from '../data/modes.json';

interface DecisionTreeProps {
  onComplete: (result: { mode: string; confidence: number; reason: string }) => void;
}

interface Recommendation {
  mode: string;
  confidence: number;
  reason: string;
}

interface RecommendationsMap {
  [key: string]: Recommendation;
}

export default function DecisionTree({ onComplete }: DecisionTreeProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isComplete, setIsComplete] = useState(false);

  const { questions, recommendations } = modesData.decisionTree as { questions: typeof modesData.decisionTree.questions; recommendations: RecommendationsMap };

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    const selectedOption = currentQuestion.options.find(opt => opt.value === value);
    
    if (selectedOption?.next === 'result') {
      // 生成推荐
      const key = Object.values(newAnswers).join('-');
      const recommendation = recommendations[key] || recommendations[Object.keys(recommendations)[0]];
      setIsComplete(true);
      onComplete(recommendation);
    } else {
      // 找到下一个问题
      const nextIndex = questions.findIndex(q => q.id === selectedOption?.next);
      if (nextIndex !== -1) {
        setCurrentQuestionIndex(nextIndex);
      }
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setIsComplete(false);
  };

  if (isComplete) {
    return (
      <div className="text-center py-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <Check className="w-8 h-8 text-green-600" />
        </motion.div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">分析完成！</h3>
        <p className="text-slate-600">已为您找到最适合的协作模式</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 进度条 */}
      <div className="flex items-center gap-2 mb-6">
        <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary-500 to-accent-500"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <span className="text-sm text-slate-500">
          {currentQuestionIndex + 1} / {questions.length}
        </span>
      </div>

      {/* 问题 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-xl font-bold text-slate-900 mb-6">
            {currentQuestion.question}
          </h3>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <motion.button
                key={option.value}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleAnswer(option.value)}
                className="w-full text-left p-4 rounded-xl border-2 border-slate-200 hover:border-primary-400 hover:bg-primary-50 transition-all duration-200 group"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="font-semibold text-slate-900 group-hover:text-primary-700">
                      {option.label}
                    </div>
                    <div className="text-sm text-slate-500 mt-1">
                      {option.description}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 重置按钮 */}
      {currentQuestionIndex > 0 && (
        <button
          onClick={handleReset}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mx-auto"
        >
          <RefreshCw className="w-4 h-4" />
          重新开始
        </button>
      )}
    </div>
  );
}