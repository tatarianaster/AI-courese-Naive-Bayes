import React from 'react';

const StepSummary: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
        <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3">
          🎓 课程结业总结
        </h2>
        <p className="text-slate-600 mb-8">
          恭喜你完成了朴素贝叶斯的学习之旅！让我们用一张图回顾整个知识体系。
        </p>

        {/* Timeline / Flow Recap */}
        <div className="relative border-l-4 border-blue-100 ml-4 space-y-10 py-2">
          
          {/* 1. Intuition */}
          <div className="relative pl-8">
            <div className="absolute -left-[13px] top-0 w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-sm"></div>
            <h3 className="font-bold text-xl text-slate-800 mb-2">1. 核心直觉 (Intuition)</h3>
            <div className="bg-slate-50 p-4 rounded-lg text-slate-700 text-sm leading-relaxed border border-slate-200">
              <p>我们不再追求非黑即白的规则 (IF...THEN)，而是拥抱<strong>概率</strong>。</p>
              <p className="mt-2">
                核心思想是：<span className="font-bold text-blue-600">“由果索因”</span>。
                当我们看到“结果/证据”(Evidence) 时，我们利用“过去的经验”(Prior & Likelihood) 来推测“原因”(Class) 的可能性。
              </p>
            </div>
          </div>

          {/* 2. The Math */}
          <div className="relative pl-8">
            <div className="absolute -left-[13px] top-0 w-6 h-6 bg-amber-500 rounded-full border-4 border-white shadow-sm"></div>
            <h3 className="font-bold text-xl text-slate-800 mb-2">2. 数学公式 (The Math)</h3>
            <div className="bg-amber-50 p-4 rounded-lg text-slate-700 text-sm border border-amber-100">
              <div className="font-mono text-center text-lg font-bold text-amber-800 mb-3 bg-white p-2 rounded shadow-sm">
                Posterior = (Likelihood × Prior) / Evidence
              </div>
              <ul className="space-y-2 list-disc pl-4">
                <li><span className="font-bold text-amber-700">Prior P(A):</span> 在没看证据前，我们认为A发生的概率（基础概率）。</li>
                <li><span className="font-bold text-blue-700">Likelihood P(B|A):</span> 如果A发生了，出现证据B的概率（特征匹配度）。</li>
                <li><span className="font-bold text-red-700">直觉陷阱:</span> 永远不要忽略 Prior！如果一种病极其罕见，即使检测呈阳性，患病率依然可能很低。</li>
              </ul>
            </div>
          </div>

          {/* 3. The "Naive" Assumption */}
          <div className="relative pl-8">
            <div className="absolute -left-[13px] top-0 w-6 h-6 bg-purple-500 rounded-full border-4 border-white shadow-sm"></div>
            <h3 className="font-bold text-xl text-slate-800 mb-2">3. 为什么“朴素”？</h3>
            <div className="bg-purple-50 p-4 rounded-lg text-slate-700 text-sm border border-purple-100">
              <p>为了简化计算，我们<strong>假设所有特征是相互独立的</strong>。</p>
              <p className="mt-2 text-xs opacity-75">
                虽然这在现实中往往不成立（比如“打雷”和“下雨”显然有关联），但这个简单的假设让算法在处理成千上万个单词（特征）时依然跑得飞快，而且效果出奇的好。
              </p>
            </div>
          </div>

          {/* 4. Application */}
          <div className="relative pl-8">
            <div className="absolute -left-[13px] top-0 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white shadow-sm"></div>
            <h3 className="font-bold text-xl text-slate-800 mb-2">4. 什么时候用？</h3>
            <div className="bg-emerald-50 p-4 rounded-lg text-slate-700 text-sm border border-emerald-100 grid grid-cols-2 gap-4">
               <div>
                 <span className="font-bold text-emerald-800 block mb-1">✅ 适合场景</span>
                 <ul className="list-disc pl-4 space-y-1">
                   <li>文本分类 (垃圾邮件、新闻)</li>
                   <li>情感分析 (好评/差评)</li>
                   <li>多分类问题</li>
                   <li>小规模数据集</li>
                 </ul>
               </div>
               <div>
                 <span className="font-bold text-red-800 block mb-1">❌ 不适合场景</span>
                 <ul className="list-disc pl-4 space-y-1">
                   <li>特征之间关联极强</li>
                   <li>需要极高精度的数值预测</li>
                 </ul>
               </div>
            </div>
          </div>

        </div>
      </div>
      
      <div className="text-center">
         <p className="text-slate-500 mb-4">学完了？试试去挑战一下智能助教，看看能不能把它问倒！👇</p>
      </div>
    </div>
  );
};

export default StepSummary;