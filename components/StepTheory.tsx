import React from 'react';

const StepTheory: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
        <h2 className="text-3xl font-bold text-slate-800 mb-6">2. 核心原理：贝叶斯公式拆解</h2>
        <p className="text-slate-600 mb-8">
          不要被数学符号吓跑。贝叶斯公式其实就是在说：<br/>
          <span className="font-semibold text-slate-800">“在看到新证据（Feature）后，我们原来对事情发生的信念（Prior）应该如何更新。”</span>
        </p>

        {/* Formula Visualizer */}
        <div className="flex flex-col items-center justify-center py-8 bg-slate-50 rounded-xl border border-slate-200 mb-8">
          <div className="flex items-center gap-4 text-xl md:text-3xl font-serif">
            <div className="flex flex-col items-center group relative">
              <span className="text-purple-600 font-bold border-b-2 border-transparent group-hover:border-purple-600 transition-all cursor-help">P(A|B)</span>
              <span className="text-xs font-sans text-slate-400 mt-2 absolute top-full w-32 text-center opacity-0 group-hover:opacity-100 transition-opacity">后验概率<br/>(看到B后A的概率)</span>
            </div>
            <span>=</span>
            <div className="flex flex-col items-center">
              <div className="border-b-2 border-slate-400 px-4 pb-2 mb-2 flex gap-2">
                 <div className="flex flex-col items-center group relative">
                    <span className="text-blue-600 font-bold cursor-help">P(B|A)</span>
                    <span className="text-xs font-sans text-slate-400 absolute bottom-full mb-2 w-32 text-center opacity-0 group-hover:opacity-100 transition-opacity bg-white p-1 rounded shadow">似然度<br/>(如果是A，出现B的概率)</span>
                 </div>
                 <span>×</span>
                 <div className="flex flex-col items-center group relative">
                    <span className="text-amber-600 font-bold cursor-help">P(A)</span>
                    <span className="text-xs font-sans text-slate-400 absolute bottom-full mb-2 w-32 text-center opacity-0 group-hover:opacity-100 transition-opacity bg-white p-1 rounded shadow">先验概率<br/>(A本身发生的概率)</span>
                 </div>
              </div>
              <div className="flex flex-col items-center group relative">
                 <span className="text-slate-600 font-bold cursor-help">P(B)</span>
                 <span className="text-xs font-sans text-slate-400 mt-2 absolute top-full w-32 text-center opacity-0 group-hover:opacity-100 transition-opacity">证据因子<br/>(B发生的总概率)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Explanation with Fruit Example */}
        <h3 className="text-xl font-bold text-slate-800 mb-4">🌰 举个具体的栗子：水果分类</h3>
        <p className="text-slate-600 mb-4">
          假设我们面前有一个水果，它既<strong>红</strong>又<strong>圆</strong>。我们要判断它是<strong>苹果</strong>的概率。
        </p>
        <p className="font-mono bg-slate-100 p-2 rounded mb-6 text-sm md:text-base">
          P(苹果 | 红,圆) = P(红,圆 | 苹果) × P(苹果) / P(红,圆)
        </p>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
            <div className="text-amber-600 font-bold mb-2">1. P(苹果) - 先验概率</div>
            <p className="text-sm text-slate-700">
              在你看这个水果之前，它是苹果的概率是多少？<br/>
              如果超市里 50% 是苹果，30% 是桃子，20% 是梨。那么 <span className="font-mono">P(苹果) = 0.5</span>。
              <br/><span className="text-xs text-slate-500 mt-1 block">这代表了我们的“基础常识”。</span>
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="text-blue-600 font-bold mb-2">2. P(红,圆 | 苹果) - 似然度</div>
            <p className="text-sm text-slate-700">
              如果它真的是苹果，它长得“又红又圆”的概率多大？<br/>
              苹果通常很红(0.8)也很圆(0.9)。<br/>
              <span className="font-mono">0.8 × 0.9 = 0.72</span>
              <br/><span className="text-xs text-slate-500 mt-1 block">这代表了特征与类别的匹配度。</span>
            </p>
          </div>

          <div className="bg-slate-100 p-4 rounded-lg border border-slate-200">
            <div className="text-slate-600 font-bold mb-2">3. 为什么要叫“朴素”？</div>
            <p className="text-sm text-slate-700">
              注意上面计算似然度时：<br/>
              <span className="font-mono">P(红,圆) ≈ P(红) × P(圆)</span><br/>
              我们假设了“红”和“圆”是完全独立的。虽然这在现实中不一定对（红苹果通常更圆），但这个简单的假设让计算变得极其快速！
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepTheory;