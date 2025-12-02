import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell, Legend } from 'recharts';

const StepMathLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'spam' | 'disease'>('spam');

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <div className="flex space-x-4 border-b border-slate-200 pb-4 mb-6">
          <button
            onClick={() => setActiveTab('spam')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'spam'
                ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-500 ring-offset-1'
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            📊 场景 1: 垃圾邮件 (基础计算)
          </button>
          <button
            onClick={() => setActiveTab('disease')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'disease'
                ? 'bg-red-100 text-red-700 ring-2 ring-red-500 ring-offset-1'
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            🏥 场景 2: 罕见病检测 (直觉陷阱)
          </button>
        </div>

        {activeTab === 'spam' ? <SpamLab /> : <DiseaseLab />}
      </div>
    </div>
  );
};

// Helper for formatting numbers
const fmt = (n: number, d: number = 4) => n.toLocaleString(undefined, { maximumFractionDigits: d });
const pct = (n: number) => (n * 100).toFixed(2) + '%';

// --- Sub-component: Spam Lab ---
const SpamLab: React.FC = () => {
  const [totalSpam, setTotalSpam] = useState(40);
  const [totalHam, setTotalHam] = useState(60);
  const [spamWithOffer, setSpamWithOffer] = useState(30); 
  const [hamWithOffer, setHamWithOffer] = useState(5);   

  const totalEmails = totalSpam + totalHam;
  
  // 1. Priors
  const pSpam = totalSpam / totalEmails;
  const pHam = totalHam / totalEmails;
  
  // 2. Likelihoods
  const pOfferGivenSpam = spamWithOffer / totalSpam;
  const pOfferGivenHam = hamWithOffer / totalHam;
  
  // 3. Numerator (Part A)
  const numerator = pOfferGivenSpam * pSpam;
  
  // 4. Denominator (Evidence / Total Probability)
  const term2 = pOfferGivenHam * pHam;
  const pOffer = numerator + term2;
  
  // 5. Posterior
  const pSpamGivenOffer = numerator / pOffer;

  const [userGuess, setUserGuess] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const checkAnswer = () => {
    const guess = parseFloat(userGuess);
    if (Math.abs(guess - (pSpamGivenOffer * 100)) < 1) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    setShowResult(true);
  };

  const chartData = [
    { name: '垃圾邮件 (Spam)', count: totalSpam, withWord: spamWithOffer },
    { name: '正常邮件 (Ham)', count: totalHam, withWord: hamWithOffer },
  ];

  return (
    <div className="animate-fade-in">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">动手算：垃圾邮件概率</h2>
        <p className="text-slate-600 mb-6">
          <strong>任务：</strong> 计算如果一封邮件包含单词 "Offer"，它是垃圾邮件的概率 <span className="font-mono bg-slate-100 px-1 rounded">P(Spam|Offer)</span>。
        </p>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Controls */}
          <div className="space-y-6">
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
              <h3 className="font-semibold text-amber-700 mb-4 flex items-center gap-2">
                <span className="bg-amber-200 text-amber-800 text-xs px-2 py-0.5 rounded">Prior</span> 
                1. 设定先验概率 P(Spam)
              </h3>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  垃圾邮件总量: {totalSpam} (总数 {totalEmails})
                </label>
                <input 
                  type="range" min="10" max="90" value={totalSpam} 
                  onChange={(e) => {
                      const val = parseInt(e.target.value);
                      setTotalSpam(val);
                      setTotalHam(100 - val);
                      if (spamWithOffer > val) setSpamWithOffer(val);
                  }}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                   <span>P(Spam) = {fmt(pSpam, 2)}</span>
                   <span>P(Ham) = {fmt(pHam, 2)}</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
              <h3 className="font-semibold text-blue-700 mb-4 flex items-center gap-2">
                <span className="bg-blue-200 text-blue-800 text-xs px-2 py-0.5 rounded">Likelihood</span> 
                2. 设定似然度 P(Offer|Type)
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">
                    垃圾邮件中含 "Offer" 的数量: {spamWithOffer} / {totalSpam}
                  </label>
                  <input 
                    type="range" min="0" max={totalSpam} value={spamWithOffer} 
                    onChange={(e) => setSpamWithOffer(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  <p className="text-right text-xs text-blue-600 font-mono">P(Offer|Spam) = {fmt(pOfferGivenSpam, 2)}</p>
                </div>
                
                <div className="pt-2 border-t border-slate-200">
                  <label className="block text-sm font-medium text-slate-600 mb-1">
                    正常邮件中含 "Offer" 的数量: {hamWithOffer} / {totalHam}
                  </label>
                  <input 
                    type="range" min="0" max={totalHam} value={hamWithOffer} 
                    onChange={(e) => setHamWithOffer(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-green-500"
                  />
                   <p className="text-right text-xs text-green-600 font-mono">P(Offer|Ham) = {fmt(pOfferGivenHam, 2)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Visualization */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col">
             <h3 className="text-center text-slate-700 font-semibold mb-4">数据可视化</h3>
             <div className="flex-1 min-h-[200px]">
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} />
                   <XAxis dataKey="name" />
                   <YAxis />
                   <RechartsTooltip />
                   <Legend />
                   <Bar dataKey="count" fill="#e2e8f0" name="邮件总数" stackId="a" />
                   <Bar dataKey="withWord" fill="#8884d8" name='包含 "Offer"' stackId="b">
                      {
                        chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === 0 ? '#f87171' : '#4ade80'} />
                        ))
                      }
                   </Bar>
                 </BarChart>
               </ResponsiveContainer>
             </div>
          </div>
        </div>

        {/* Calculation Input */}
        <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
          <h2 className="text-xl font-bold text-indigo-900 mb-2">你的答案</h2>
          <p className="text-sm text-indigo-700 mb-4">P(Spam|Offer) 是多少？（百分比）</p>
          
          <div className="flex gap-2 max-w-md">
            <input 
              type="number" 
              placeholder="例如 85.5" 
              className="flex-1 p-3 rounded-lg border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={userGuess}
              onChange={(e) => setUserGuess(e.target.value)}
            />
            <button 
              onClick={checkAnswer}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
            >
              验证
            </button>
          </div>
          
          {/* Detailed Calculation Process Display */}
          {showResult && (
            <div className="mt-8 animate-fade-in">
              <div className={`p-4 rounded-lg mb-6 border flex items-center gap-3 ${isCorrect ? 'bg-green-100 border-green-200 text-green-800' : 'bg-red-50 border-red-100 text-red-800'}`}>
                <div className="text-2xl">{isCorrect ? '✅' : '❌'}</div>
                <div>
                   <div className="font-bold">{isCorrect ? '回答正确！' : '不完全正确'}</div>
                   <div className="text-sm">正确答案约为 {pct(pSpamGivenOffer)}。请看下方的详细推导过程。</div>
                </div>
              </div>

               {/* Dark Theme Calculation Panel (Unified with Disease Lab) */}
               <div className="bg-slate-800 text-slate-300 rounded-xl p-6 font-mono text-sm shadow-inner overflow-x-auto">
                  <h4 className="text-white font-bold mb-4 border-b border-slate-600 pb-2">🧮 深度解析计算过程</h4>
                  
                  <div className="space-y-6">
                    {/* Step 1: Numerator */}
                    <div>
                      <div className="text-slate-400 mb-1 flex justify-between">
                         <span>// 1. 计算分子：真的是Spam且包含Offer的概率</span>
                         <span className="text-xs border border-slate-600 px-2 rounded-full">Target</span>
                      </div>
                      <div className="pl-4 border-l-2 border-blue-500">
                         <div className="flex gap-2 text-blue-300">
                            <span>Posterior_Numerator</span> 
                            <span>=</span>
                            <span title="Likelihood (似然): 这种类别下出现该特征的概率">P(Offer|Spam)</span> 
                            <span>×</span> 
                            <span title="Prior (先验): 这种类别本身的出现概率">P(Spam)</span>
                         </div>
                         <div>                      = {fmt(pOfferGivenSpam, 2)} × {fmt(pSpam, 2)}</div>
                         <div className="text-blue-400 font-bold">                      = {fmt(numerator)}</div>
                      </div>
                    </div>

                    {/* Step 2: Denominator Parts */}
                    <div>
                      <div className="text-slate-400 mb-1 flex justify-between">
                         <span>// 2. 计算分母：全概率 (Evidence)</span>
                         <span className="text-xs border border-slate-600 px-2 rounded-full">Normalization</span>
                      </div>
                      <div className="pl-4 border-l-2 border-purple-500">
                         <div className="text-slate-400 text-xs mb-1">// 包含 Offer 的总可能性 = (来自Spam) + (来自Ham)</div>
                         <div className="flex gap-2 text-purple-300">
                            <span>P(Offer)</span> 
                            <span>=</span>
                            <span>(P(Offer|Spam)×P(Spam))</span> 
                            <span>+</span> 
                            <span>(P(Offer|Ham)×P(Ham))</span>
                         </div>
                         <div>          = {fmt(numerator)} + ({fmt(pOfferGivenHam, 2)} × {fmt(pHam, 2)})</div>
                         <div>          = {fmt(numerator)} + {fmt(term2)}</div>
                         <div className="text-purple-400 font-bold">          = {fmt(pOffer)}</div>
                      </div>
                    </div>

                    {/* Step 3: Result */}
                    <div>
                      <div className="text-slate-400 mb-1">// 3. 最终除法</div>
                      <div className="pl-4 border-l-2 border-white">
                         <div>Result = Numerator / P(Offer)</div>
                         <div>       = {fmt(numerator)} / {fmt(pOffer)}</div>
                         <div className="text-2xl text-white font-bold mt-2">       = {pct(pSpamGivenOffer)}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-slate-700 text-xs text-slate-400 grid grid-cols-2 gap-4">
                     <div>
                       <strong className="text-blue-400 block mb-1">Likelihood (似然)</strong>
                       当前类别(Spam)下出现证据(Offer)的概率。
                     </div>
                     <div>
                       <strong className="text-amber-400 block mb-1">Prior (先验)</strong>
                       在看内容之前，我们认为它是Spam的基础概率。
                     </div>
                  </div>
               </div>
            </div>
          )}
        </div>
    </div>
  );
};


// --- Sub-component: Disease Lab (Detailed Calculation) ---
const DiseaseLab: React.FC = () => {
  // Population: 10,000 people
  const [population] = useState(10000);
  const [prevalence, setPrevalence] = useState(1); // Prior: P(Disease) %
  const [sensitivity, setSensitivity] = useState(99); // Likelihood: P(+|Disease) %
  const [fpr, setFpr] = useState(1); // Likelihood: P(+|Healthy) %

  // Probability calculations
  const pDisease = prevalence / 100;
  const pHealthy = 1 - pDisease;
  const pPosGivenDisease = sensitivity / 100;
  const pPosGivenHealthy = fpr / 100;

  // Components of Bayes Theorem
  const numerator = pPosGivenDisease * pDisease; // True Positives Rate
  const falsePositiveRateTotal = pPosGivenHealthy * pHealthy; // False Positives Rate
  const pPositive = numerator + falsePositiveRateTotal; // Total Evidence
  
  const pDiseaseGivenPositive = numerator / pPositive;

  // Counts for visualization (rounded for display)
  const sickCount = Math.round(population * pDisease);
  const truePositives = Math.round(sickCount * pPosGivenDisease);
  const healthyCount = population - sickCount;
  const falsePositives = Math.round(healthyCount * pPosGivenHealthy);

  return (
    <div className="animate-fade-in">
       <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
         <h3 className="font-bold text-red-800 mb-1">🧠 直觉陷阱：眼见不一定为实</h3>
         <p className="text-red-700 text-sm">
            请观察下方计算过程：当<strong>先验概率 P(Disease)</strong> 很小时，它如何像“杠杆”一样，极大地拉低了最终的患病概率。
         </p>
       </div>

       <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-6">
             {/* Slider 1: Prevalence */}
             <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
               <label className="block text-sm font-bold text-amber-700 mb-2">
                 1. 设定发病率 P(Disease) <span className="text-xs bg-amber-100 px-1 rounded ml-1">Prior</span>
               </label>
               <input 
                 type="range" min="0.1" max="10" step="0.1"
                 value={prevalence} 
                 onChange={(e) => setPrevalence(parseFloat(e.target.value))}
                 className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
               />
               <div className="flex justify-between mt-2 text-sm text-slate-600">
                  <span>0.1% (罕见)</span>
                  <span className="font-mono font-bold bg-white px-2 rounded border text-amber-600">{prevalence}%</span>
                  <span>10%</span>
               </div>
             </div>

             {/* Slider 2: FPR */}
             <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
               <label className="block text-sm font-bold text-blue-700 mb-2">
                 2. 设定误诊率 P(+|Healthy) <span className="text-xs bg-blue-100 px-1 rounded ml-1">Likelihood</span>
               </label>
               <input 
                 type="range" min="0.1" max="10" step="0.1"
                 value={fpr} 
                 onChange={(e) => setFpr(parseFloat(e.target.value))}
                 className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
               />
               <div className="flex justify-between mt-2 text-sm text-slate-600">
                  <span>0.1% (精准)</span>
                  <span className="font-mono font-bold bg-white px-2 rounded border text-blue-600">{fpr}%</span>
                  <span>10%</span>
               </div>
               <p className="text-xs text-slate-400 mt-2">注：检测准确率(Sensitivity)固定为 {sensitivity}%</p>
             </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-center items-center shadow-sm">
             <div className="text-center mb-6">
               <h3 className="text-slate-500 font-medium mb-1">如果你检测呈阳性，真实患病概率是...</h3>
               <div className={`text-5xl font-bold transition-all duration-500 ${pDiseaseGivenPositive < 0.5 ? 'text-red-500' : 'text-green-500'}`}>
                 {(pDiseaseGivenPositive * 100).toFixed(2)}%
               </div>
             </div>
             
             {/* Counts Visualization */}
             <div className="w-full flex gap-1 h-4 rounded overflow-hidden bg-slate-100 mb-2">
                <div style={{width: `${(truePositives / (truePositives + falsePositives)) * 100}%`}} className="bg-red-500 h-full transition-all"></div>
                <div style={{width: `${(falsePositives / (truePositives + falsePositives)) * 100}%`}} className="bg-slate-400 h-full transition-all"></div>
             </div>
             <div className="flex justify-between w-full text-xs text-slate-400">
                <span>真阳性 ({truePositives}人)</span>
                <span>假阳性 ({falsePositives}人)</span>
             </div>
          </div>
       </div>

       {/* Explicit Calculation Process for Disease */}
       <div className="bg-slate-800 text-slate-300 rounded-xl p-6 font-mono text-sm shadow-inner overflow-x-auto">
          <h4 className="text-white font-bold mb-4 border-b border-slate-600 pb-2">🧮 深度解析计算过程</h4>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
               <div>
                 <div className="text-slate-500 mb-1 flex justify-between">
                    <span>// 1. 真阳性概率 (True Positive)</span>
                    <span className="text-xs border border-slate-600 px-2 rounded-full">Target</span>
                 </div>
                 <div className="pl-4 border-l-2 border-green-500">
                    <div className="flex gap-2 text-green-300">
                        <span>P(POS & Disease)</span>
                        <span>=</span>
                        <span title="Likelihood (检测准确率)">P(+|Disease)</span>
                        <span>×</span>
                        <span title="Prior (发病率)">P(Disease)</span>
                    </div>
                    <div>          = {pPosGivenDisease.toFixed(2)} × {pDisease.toFixed(4)}</div>
                    <div className="text-green-400 font-bold">          = {fmt(numerator)}</div>
                 </div>
               </div>

               <div>
                 <div className="text-slate-500 mb-1 flex justify-between">
                    <span>// 2. 假阳性概率 (False Positive)</span>
                    <span className="text-xs border border-slate-600 px-2 rounded-full">Noise</span>
                 </div>
                 <div className="pl-4 border-l-2 border-red-500">
                    <div className="flex gap-2 text-red-300">
                        <span>P(POS & Healthy)</span>
                        <span>=</span>
                        <span title="Likelihood (误诊率)">P(+|Healthy)</span>
                        <span>×</span>
                        <span title="Prior (健康率)">P(Healthy)</span>
                    </div>
                    <div>          = {pPosGivenHealthy.toFixed(3)} × {pHealthy.toFixed(4)}</div>
                    <div className="text-red-400 font-bold">          = {fmt(falsePositiveRateTotal)}</div>
                 </div>
               </div>
            </div>

            <div className="space-y-4">
              <div>
                 <div className="text-slate-500 mb-1 flex justify-between">
                    <span>// 3. 全概率 (Evidence)</span>
                    <span className="text-xs border border-slate-600 px-2 rounded-full">Sum</span>
                 </div>
                 <div className="pl-4 border-l-2 border-blue-500">
                    <div className="text-blue-300">P(Positive) = TruePos + FalsePos</div>
                    <div>            = {fmt(numerator)} + {fmt(falsePositiveRateTotal)}</div>
                    <div className="text-blue-400 font-bold">            = {fmt(pPositive)}</div>
                 </div>
               </div>

               <div>
                 <div className="text-slate-500 mb-1 flex justify-between">
                    <span>// 4. 最终结果 (Posterior)</span>
                    <span className="text-xs border border-slate-600 px-2 rounded-full">Result</span>
                 </div>
                 <div className="pl-4 border-l-2 border-white">
                    <div className="text-white">P(Disease|+) = TruePos / TotalPos</div>
                    <div>             = {fmt(numerator)} / {fmt(pPositive)}</div>
                    <div className="text-2xl text-white font-bold mt-2">             = {pct(pDiseaseGivenPositive)}</div>
                 </div>
               </div>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-slate-700 text-xs text-slate-400">
             💡 <strong>概念解析：</strong> 
             <span className="mx-2 text-amber-400">Prior = 基础概率</span>
             <span className="mx-2 text-blue-400">Likelihood = 证据匹配度</span>
             <span className="mx-2 text-white">Evidence = 所有可能性的总和</span>
          </div>
       </div>
    </div>
  );
}

export default StepMathLab;