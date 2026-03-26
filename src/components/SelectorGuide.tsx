import React from 'react';
import { motion } from 'motion/react';
import { SelectorInfo, SELECTORS } from '../constants';
import { Info, Code, Zap } from 'lucide-react';

export const SelectorGuide: React.FC = () => {
  const categories = {
    basic: '기본 선택자',
    'at-rule': '앳 규칙 (@)',
    advanced: '고급 지시자',
    combinator: '결합 법칙'
  };

  return (
    <div className="space-y-8">
      {(Object.keys(categories) as Array<keyof typeof categories>).map((cat) => (
        <section key={cat} className="space-y-4">
          <h3 className="text-lg font-bold text-zinc-800 flex items-center gap-2 border-b border-zinc-200 pb-2">
            <Zap className="w-4 h-4 text-amber-500" />
            {categories[cat]}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SELECTORS.filter(s => s.category === cat).map((selector) => (
              <motion.div
                key={selector.name}
                whileHover={{ y: -2 }}
                className="p-4 bg-white rounded-xl border border-zinc-200 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="px-2 py-1 bg-zinc-100 rounded text-xs font-mono font-bold text-zinc-600 border border-zinc-200">
                    {selector.symbol}
                  </span>
                  <span className="text-xs font-medium text-zinc-400">{selector.name}</span>
                </div>
                <h4 className="font-bold text-zinc-800 mb-1">{selector.meaning}</h4>
                <p className="text-sm text-zinc-500 mb-3 leading-relaxed">
                  {selector.description}
                </p>
                <div className="flex items-center gap-2 p-2 bg-zinc-50 rounded border border-zinc-100">
                  <Code className="w-3 h-3 text-zinc-400" />
                  <code className="text-xs font-mono text-indigo-600 font-bold">
                    {selector.example}
                  </code>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      ))}

      <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
        <h3 className="text-lg font-bold text-indigo-900 mb-4 flex items-center gap-2">
          <Info className="w-5 h-5" />
          💡 꿀팁: 결합 법칙
        </h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <code className="text-sm font-mono bg-white px-2 py-1 rounded border border-indigo-200 text-indigo-700 whitespace-nowrap">div.active</code>
            <p className="text-sm text-indigo-800 pt-1">div 태그 중에서 active 클래스를 가진 것만!</p>
          </div>
          <div className="flex items-start gap-3">
            <code className="text-sm font-mono bg-white px-2 py-1 rounded border border-indigo-200 text-indigo-700 whitespace-nowrap">.container &gt; p</code>
            <p className="text-sm text-indigo-800 pt-1">container 클래스 바로 밑에 있는(자식) p 태그만!</p>
          </div>
          <div className="flex items-start gap-3">
            <code className="text-sm font-mono bg-white px-2 py-1 rounded border border-indigo-200 text-indigo-700 whitespace-nowrap">.btn:hover</code>
            <p className="text-sm text-indigo-800 pt-1">btn 클래스에 마우스 올렸을 때만!</p>
          </div>
        </div>
      </div>
    </div>
  );
};
