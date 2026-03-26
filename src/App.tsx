import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SelectorGuide } from './components/SelectorGuide';
import { Playground } from './components/Playground';
import { BookOpen, Terminal, Sparkles, Github, ExternalLink } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'learn' | 'playground'>('learn');

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <Sparkles className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-zinc-900">
                CSS SELECTOR <span className="text-indigo-600">MASTER</span>
              </h1>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Interactive Learning Lab</p>
            </div>
          </div>

          <nav className="flex bg-zinc-100 p-1 rounded-xl border border-zinc-200">
            <button
              onClick={() => setActiveTab('learn')}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all
                ${activeTab === 'learn' 
                  ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-zinc-200' 
                  : 'text-zinc-500 hover:text-zinc-800'}
              `}
            >
              <BookOpen className="w-4 h-4" />
              이론 학습
            </button>
            <button
              onClick={() => setActiveTab('playground')}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all
                ${activeTab === 'playground' 
                  ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-zinc-200' 
                  : 'text-zinc-500 hover:text-zinc-800'}
              `}
            >
              <Terminal className="w-4 h-4" />
              실습 놀이터
            </button>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a 
              href="https://github.com/greenoceanplanet/CSS-SELECTOR-MASTER-" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 text-zinc-400 hover:text-zinc-900 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <button className="px-4 py-2 bg-zinc-900 text-white text-xs font-bold rounded-lg hover:bg-zinc-800 transition-all flex items-center gap-2">
              공유하기
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-6">
        <AnimatePresence mode="wait">
          {activeTab === 'learn' ? (
            <motion.div
              key="learn"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-10 text-center max-w-2xl mx-auto">
                <h2 className="text-3xl font-black text-zinc-900 mb-4">CSS 지시자(Selector) 완벽 가이드</h2>
                <p className="text-zinc-500 leading-relaxed">
                  CSS의 핵심은 원하는 요소를 정확하게 집어내는 것입니다. 
                  점(.) 하나, 샵(#) 하나가 어떤 차이를 만드는지 기초부터 고급 기법까지 알아보세요.
                </p>
              </div>
              <SelectorGuide />
            </motion.div>
          ) : (
            <motion.div
              key="playground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <div className="mb-10">
                <h2 className="text-3xl font-black text-zinc-900 mb-2">실습 놀이터</h2>
                <p className="text-zinc-500">
                  왼쪽 입력창에 CSS 지시자를 입력해보세요. 오른쪽 미리보기 창에서 어떤 요소가 선택되는지 즉시 확인할 수 있습니다.
                </p>
              </div>
              <Playground />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 py-8 px-6 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-zinc-400 font-medium">
            © 2026 CSS Selector Master. Built for Jinsu.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs font-bold text-zinc-400 hover:text-indigo-600 transition-colors uppercase tracking-widest">Documentation</a>
            <a href="#" className="text-xs font-bold text-zinc-400 hover:text-indigo-600 transition-colors uppercase tracking-widest">Tutorials</a>
            <a href="#" className="text-xs font-bold text-zinc-400 hover:text-indigo-600 transition-colors uppercase tracking-widest">Community</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
