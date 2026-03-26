import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK_HTML, MockElement } from '../constants';
import { Search, Code, Eye, Hash, Tag, Layers } from 'lucide-react';

export const Playground: React.FC = () => {
  const [selector, setSelector] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Simple selector matching logic for the playground
  const matchedIds = useMemo(() => {
    if (!selector.trim()) return new Set<string>();

    const ids = new Set<string>();
    const s = selector.trim();

    const checkElement = (el: MockElement, parent?: MockElement) => {
      let isMatch = false;

      // 1. Tag selector
      if (el.tag === s) isMatch = true;
      
      // 2. Class selector
      if (s.startsWith('.') && el.classes?.includes(s.slice(1))) isMatch = true;
      
      // 3. ID selector
      if (s.startsWith('#') && el.id === s.slice(1)) isMatch = true;
      
      // 4. Universal selector
      if (s === '*') isMatch = true;

      // 5. Attribute selector (basic support)
      if (s.startsWith('[') && s.endsWith(']')) {
        const attrStr = s.slice(1, -1);
        if (attrStr.includes('=')) {
          const [key, val] = attrStr.split('=').map(x => x.replace(/['"]/g, '').trim());
          if (el.attr?.[key] === val) isMatch = true;
        } else if (el.attr?.[attrStr]) {
          isMatch = true;
        }
      }

      // 6. Combinator: Child (basic support for parent > child)
      if (s.includes(' > ')) {
        const [pPart, cPart] = s.split(' > ').map(x => x.trim());
        const parentMatches = (parent: MockElement | undefined) => {
          if (!parent) return false;
          if (parent.tag === pPart) return true;
          if (pPart.startsWith('.') && parent.classes?.includes(pPart.slice(1))) return true;
          if (pPart.startsWith('#') && parent.id === pPart.slice(1)) return true;
          return false;
        };

        if (parentMatches(parent)) {
          if (el.tag === cPart) isMatch = true;
          if (cPart.startsWith('.') && el.classes?.includes(cPart.slice(1))) isMatch = true;
          if (cPart.startsWith('#') && el.id === cPart.slice(1)) isMatch = true;
        }
      }

      // 7. Combined: tag.class
      if (s.includes('.') && !s.startsWith('.')) {
        const [tag, cls] = s.split('.');
        if (el.tag === tag && el.classes?.includes(cls)) isMatch = true;
      }

      if (isMatch) ids.add(el.id);
      el.children?.forEach(child => checkElement(child, el));
    };

    MOCK_HTML.forEach(el => checkElement(el));
    return ids;
  }, [selector]);

  const renderMockElement = (el: MockElement, depth = 0) => {
    const isMatched = matchedIds.has(el.id);

    return (
      <motion.div
        key={el.id}
        layout
        className={`
          relative my-1 p-2 rounded-lg border transition-all duration-300
          ${isMatched 
            ? 'bg-indigo-50 border-indigo-400 ring-2 ring-indigo-200 shadow-sm z-10' 
            : 'bg-white border-zinc-200 opacity-80'}
        `}
        style={{ marginLeft: `${depth * 16}px` }}
      >
        <div className="flex items-center gap-2 text-[10px] font-mono mb-1">
          <span className={`px-1 rounded ${isMatched ? 'bg-indigo-500 text-white' : 'bg-zinc-200 text-zinc-600'}`}>
            &lt;{el.tag}&gt;
          </span>
          {el.id && <span className="text-amber-600">#{el.id}</span>}
          {el.classes?.map(c => (
            <span key={c} className="text-indigo-600">.{c}</span>
          ))}
          {el.attr && Object.entries(el.attr).map(([k, v]) => (
            <span key={k} className="text-emerald-600">[{k}="{v}"]</span>
          ))}
        </div>
        
        {el.text && (
          <p className={`text-sm ${isMatched ? 'text-indigo-900 font-medium' : 'text-zinc-500'}`}>
            {el.text}
          </p>
        )}
        
        {el.children?.map(child => renderMockElement(child, depth + 1))}
      </motion.div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
      {/* Input Side */}
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <label className="block text-sm font-bold text-zinc-700 mb-3 flex items-center gap-2">
            <Search className="w-4 h-4" />
            지시자 입력 (Selector Input)
          </label>
          <div className={`
            relative flex items-center transition-all duration-200
            ${isFocused ? 'ring-2 ring-indigo-500 ring-offset-2' : ''}
          `}>
            <input
              type="text"
              value={selector}
              onChange={(e) => setSelector(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="예: .item, h1, #header, main > p"
              className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl font-mono text-indigo-600 focus:outline-none placeholder:text-zinc-400"
            />
            <div className="absolute right-3 flex gap-1">
              <kbd className="px-1.5 py-0.5 bg-white border border-zinc-200 rounded text-[10px] text-zinc-400 shadow-sm">CSS</kbd>
            </div>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            {['h1', '.item', '#header', 'main > p', 'a.active', '[type="text"]'].map(hint => (
              <button
                key={hint}
                onClick={() => setSelector(hint)}
                className="text-[10px] font-mono px-2 py-1 bg-zinc-100 hover:bg-indigo-100 hover:text-indigo-700 rounded transition-colors text-zinc-500 border border-zinc-200"
              >
                {hint}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 shadow-xl overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-zinc-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <Code className="w-3 h-3" />
              HTML Structure (Mock)
            </h3>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
            </div>
          </div>
          <div className="font-mono text-[11px] space-y-1 text-zinc-500 overflow-y-auto max-h-[400px] pr-2">
            <div className="text-zinc-600">&lt;!DOCTYPE html&gt;</div>
            <div className="text-zinc-600">&lt;html lang="ko"&gt;</div>
            <div className="pl-4 text-zinc-600">&lt;body&gt;</div>
            {MOCK_HTML.map(el => (
              <div key={el.id} className="pl-8">
                <span className="text-indigo-400">&lt;{el.tag}</span>
                {el.id && <span className="text-amber-400"> id="{el.id}"</span>}
                {el.classes && <span className="text-indigo-300"> class="{el.classes.join(' ')}"</span>}
                {el.attr && Object.entries(el.attr).map(([k, v]) => (
                  <span key={k} className="text-emerald-400"> {k}="{v}"</span>
                ))}
                <span className="text-indigo-400">&gt;</span>
                {el.children && <span className="text-zinc-500">...</span>}
                {el.text && <span className="text-white"> {el.text} </span>}
                <span className="text-indigo-400">&lt;/{el.tag}&gt;</span>
              </div>
            ))}
            <div className="pl-4 text-zinc-600">&lt;/body&gt;</div>
            <div className="text-zinc-600">&lt;/html&gt;</div>
          </div>
        </div>
      </div>

      {/* Preview Side */}
      <div className="bg-zinc-100 rounded-2xl border border-zinc-200 p-6 flex flex-col h-full">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-bold text-zinc-600 flex items-center gap-2">
            <Eye className="w-4 h-4" />
            실시간 렌더링 결과 (Live Preview)
          </h3>
          <div className="flex items-center gap-3 text-[10px] text-zinc-400">
            <span className="flex items-center gap-1"><Hash className="w-3 h-3" /> ID</span>
            <span className="flex items-center gap-1"><Tag className="w-3 h-3" /> Tag</span>
            <span className="flex items-center gap-1"><Layers className="w-3 h-3" /> Class</span>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto pr-2">
          <AnimatePresence mode="popLayout">
            {MOCK_HTML.map(el => renderMockElement(el))}
          </AnimatePresence>
        </div>

        <div className="mt-6 pt-4 border-t border-zinc-200">
          <div className="flex items-center justify-between">
            <p className="text-xs text-zinc-400">
              {matchedIds.size}개의 요소가 선택됨
            </p>
            {matchedIds.size > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="px-2 py-1 bg-indigo-600 text-white text-[10px] font-bold rounded-full"
              >
                MATCH FOUND
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
