import React from 'react';

const StepIntro: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* 1. 为什么要学朴素贝叶斯？ */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
        <h2 className="text-3xl font-bold text-slate-800 mb-6">1. 为什么我们需要“概率”？</h2>
        <p className="text-lg text-slate-600 leading-relaxed mb-6">
          在编程的世界里，我们习惯了用确定的规则（Rule-based）来解决问题。
          比如：“如果外面下雨，我就带伞”。这是一个 <code>IF Rain THEN Umbrella</code> 的逻辑。
        </p>
        
        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6">
          <h3 className="text-amber-800 font-bold mb-2">🤔 但是，现实世界充满了不确定性</h3>
          <p className="text-amber-700">
            如果你的任务是编写一个程序来识别“垃圾邮件”，用规则怎么写？<br/>
            <code>IF contains("中奖") THEN Spam</code>? <br/>
            如果朋友给你发：“如果你<strong>中奖</strong>了请告诉我”，这并不是垃圾邮件。单纯的规则会误判！
          </p>
        </div>

        <p className="text-slate-600">
          <strong>朴素贝叶斯（Naive Bayes）</strong> 就是为了解决这种“模棱两可”的问题而生的。它不再说“这一定是垃圾邮件”，而是说：“根据这几个词，这封邮件有 <strong>98.5%</strong> 的概率是垃圾邮件”。
        </p>
      </div>

      {/* 2. 生活中的例子：由浅入深 */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* 简单例子 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">☔</span>
            <h3 className="text-xl font-bold text-slate-800">例子 1：简单的推断（入门）</h3>
          </div>
          <p className="text-slate-600 mb-4">
            早晨你拉开窗帘，看不到外面，但你看到街上走过的人都撑着伞。
          </p>
          <ul className="space-y-2 text-sm text-slate-700 bg-slate-50 p-4 rounded-lg">
            <li className="flex justify-between">
              <span>观测到的现象 (Evidence):</span>
              <span className="font-semibold text-blue-600">行人都撑伞</span>
            </li>
            <li className="flex justify-between">
              <span>推断的结论 (Hypothesis):</span>
              <span className="font-semibold text-purple-600">外面在下雨</span>
            </li>
          </ul>
          <p className="mt-4 text-sm text-slate-500">
            这就是贝叶斯思维：通过<strong>结果</strong>（撑伞）反推<strong>原因</strong>（下雨）的概率。
          </p>
        </div>

        {/* 较难例子 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🩺</span>
            <h3 className="text-xl font-bold text-slate-800">例子 2：直觉的陷阱（进阶）</h3>
          </div>
          <p className="text-slate-600 mb-4">
            一种罕见病，人群发病率只有 1%。现在的检测技术有 99% 的准确率。如果你去检测，结果呈<strong>阳性</strong>，你真的患病了吗？
          </p>
          <div className="bg-slate-50 p-4 rounded-lg">
             <p className="text-sm font-semibold text-slate-700 mb-2">大多数人的直觉：99%</p>
             <p className="text-sm font-semibold text-red-600 mb-2">贝叶斯告诉我们：只有约 50%</p>
             <p className="text-xs text-slate-500">
               为什么？因为健康的人太多了（99%的人是健康的），即使只有 1% 的误诊率，健康人群里产生的“假阳性”人数也可能和真正的病人一样多。
             </p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-xl p-6 text-center">
        <p className="text-blue-900 font-medium">
          接下来的章节，我们将揭开这个反直觉结论背后的数学公式，并学会如何应用它。
        </p>
      </div>
    </div>
  );
};

export default StepIntro;