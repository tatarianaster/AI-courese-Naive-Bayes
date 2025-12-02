import React, { useState } from 'react';

// Color Mapping constants matching Theory section
const COLORS = {
  PRIOR: "text-amber-600",
  LIKELIHOOD: "text-blue-600",
  EVIDENCE: "text-slate-500",
  RESULT: "text-purple-600"
};

const cases = [
  {
    id: 'news',
    title: "新闻分类 (News Classification)",
    icon: "📰",
    desc: "机器如何自动判断一篇文章是属于“体育”版块还是“财经”版块？",
    color: "bg-blue-50 border-blue-100 text-blue-900",
    content: {
      scenario: "系统扫描到一篇文章中包含单词：'射门' (Shoot)。",
      mathSteps: [
        { 
          symbol: "P(体育)", 
          desc: "先验概率：体育新闻在所有新闻中的占比。", 
          val: "0.3",
          color: COLORS.PRIOR 
        },
        { 
          symbol: "P(射门|体育)", 
          desc: "似然度：如果这真的是体育新闻，出现'射门'的概率。", 
          val: "0.15",
          color: COLORS.LIKELIHOOD 
        }
      ],
      conclusion: "由于 P(射门|体育) 远大于 P(射门|财经)，系统判定为【体育】。",
      calculation: {
        priorA: 0.3,
        priorB: 0.7, // 财经
        likeA: 0.15,
        likeB: 0.001,
        labelA: "体育",
        labelB: "财经"
      }
    }
  },
  {
    id: 'sentiment',
    title: "情感分析 (Sentiment Analysis)",
    icon: "😡/😍",
    desc: "电商评论分析：判断用户是在夸奖还是在吐槽。",
    color: "bg-pink-50 border-pink-100 text-pink-900",
    content: {
      scenario: "用户评论包含：'糟糕' (Terrible)。",
      mathSteps: [
        { 
          symbol: "P(差评)", 
          desc: "先验概率：通常差评的比例。", 
          val: "0.4",
          color: COLORS.PRIOR 
        },
        { 
          symbol: "P(糟糕|差评)", 
          desc: "似然度：在差评中出现'糟糕'一词的概率。", 
          val: "0.25",
          color: COLORS.LIKELIHOOD 
        }
      ],
      conclusion: "贝叶斯公式计算后，P(差评|糟糕) 极高。",
      calculation: {
        priorA: 0.4,
        priorB: 0.6, // 好评
        likeA: 0.25,
        likeB: 0.01,
        labelA: "差评",
        labelB: "好评"
      }
    }
  },
  {
    id: 'spell',
    title: "拼写检查 (Spell Check)",
    icon: "✍️",
    desc: "当你输入 'hte' 时，为什么输入法知道你想打的是 'the'？",
    color: "bg-amber-50 border-amber-100 text-amber-900",
    content: {
      scenario: "用户输入了错误单词 'hte'。",
      mathSteps: [
        { 
          symbol: "P(想打the)", 
          desc: "先验：'the' 是英语中最常用的词，概率极高。", 
          val: "0.07",
          color: COLORS.PRIOR 
        },
        { 
          symbol: "P(输成hte|想打the)", 
          desc: "似然：想打'the'却手误输成'hte'的概率。", 
          val: "0.05",
          color: COLORS.LIKELIHOOD 
        }
      ],
      conclusion: "综合比较后，系统自动纠正为 'the'。",
      calculation: {
        priorA: 0.07,
        priorB: 0.0001, // hat
        likeA: 0.05,
        likeB: 0.02,
        labelA: "单词 'the'",
        labelB: "单词 'hat'"
      }
    }
  },
  {
    id: 'security',
    title: "入侵检测 (Intrusion Detection)",
    icon: "🛡️",
    desc: "判断网络流量是正常访问还是黑客攻击。",
    color: "bg-emerald-50 border-emerald-100 text-emerald-900",
    content: {
      scenario: "检测到短时间内 1000 次登录失败。",
      mathSteps: [
        { 
          symbol: "P(攻击)", 
          desc: "先验：网络受攻击的基准概率。", 
          val: "0.01",
          color: COLORS.PRIOR 
        },
        { 
          symbol: "P(高频失败|攻击)", 
          desc: "似然：如果是攻击，出现高频失败的概率。", 
          val: "0.99",
          color: COLORS.LIKELIHOOD 
        }
      ],
      conclusion: "似然比极度悬殊，系统立即报警。",
      calculation: {
        priorA: 0.01,
        priorB: 0.99, // 正常
        likeA: 0.99,
        likeB: 0.000001,
        labelA: "黑客攻击",
        labelB: "正常访问"
      }
    }
  }
];

// Helper to calculate Bayes
const calcBayes = (prior: number, like: number, priorB: number, likeB: number) => {
  const num = prior * like;
  const den = num + (priorB * likeB);
  return {
    num,
    den,
    res: num / den
  };
};

const fmt = (n: number, d = 4) => n.toLocaleString(undefined, { maximumFractionDigits: d });
const pct = (n: number) => (n * 100).toFixed(2) + '%';

const StepCases: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<string | null>(null);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">5. 实际应用场景</h2>
        <p className="text-slate-600 mb-8">
          在不同领域，贝叶斯公式中的 $P(A)$ 和 $P(B|A)$ 分别代表什么？<br/>
          点击下方卡片，查看对应的数学映射。
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          {cases.map((c) => {
             const math = calcBayes(c.content.calculation.priorA, c.content.calculation.likeA, c.content.calculation.priorB, c.content.calculation.likeB);
             
             return (
            <div 
              key={c.id} 
              onClick={() => setSelectedCase(selectedCase === c.id ? null : c.id)}
              className={`p-6 rounded-xl border cursor-pointer transition-all duration-300 relative overflow-hidden group ${
                selectedCase === c.id ? 'ring-2 ring-offset-2 ring-blue-400 shadow-md' : 'hover:shadow-md hover:-translate-y-1'
              } ${c.color}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                   <div className="text-3xl bg-white/50 w-12 h-12 flex items-center justify-center rounded-full shadow-sm">{c.icon}</div>
                   <h3 className="text-lg font-bold">{c.title}</h3>
                </div>
                <div className={`text-slate-400 transform transition-transform ${selectedCase === c.id ? 'rotate-180' : ''}`}>
                  ▼
                </div>
              </div>
              <p className="text-sm opacity-90 mb-2 leading-relaxed">{c.desc}</p>
              
              {/* Expandable Content */}
              <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${selectedCase === c.id ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                  <div className="bg-white/90 backdrop-blur-md rounded-lg p-4 text-sm border border-white/40 shadow-sm">
                    <p className="font-bold text-slate-800 mb-2 border-b border-slate-200 pb-2">🎯 贝叶斯解析：</p>
                    <p className="text-slate-700 mb-3 italic">场景：{c.content.scenario}</p>
                    
                    <div className="space-y-3 mb-4">
                      {c.content.mathSteps.map((step, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                          <span className={`font-mono font-bold shrink-0 ${step.color}`}>{step.symbol}</span>
                          <span className="hidden sm:inline text-slate-300">→</span>
                          <span className="text-xs text-slate-600">
                             {step.desc} <span className="font-mono bg-slate-100 px-1 rounded ml-1">{step.val}</span>
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Deep Dive Calculation Block */}
                    <div className="bg-slate-800 text-slate-300 rounded p-4 font-mono text-xs">
                       <div className="mb-2 font-bold text-white border-b border-slate-600 pb-1">🧮 深度计算 (Target: {c.content.calculation.labelA})</div>
                       
                       <div className="grid grid-cols-1 gap-2">
                         <div>
                            <span className="text-amber-400">Prior(先验)</span>: {c.content.calculation.priorA}
                            <span className="mx-2 text-slate-500">vs</span>
                            Other: {c.content.calculation.priorB}
                         </div>
                         <div>
                            <span className="text-blue-400">Likelihood(似然)</span>: {c.content.calculation.likeA}
                            <span className="mx-2 text-slate-500">vs</span>
                            Other: {c.content.calculation.likeB}
                         </div>
                         <div className="border-t border-slate-600 pt-1 mt-1 text-slate-400">
                            Num = {c.content.calculation.priorA} × {c.content.calculation.likeA} = <span className="text-white font-bold">{fmt(math.num)}</span>
                         </div>
                         <div className="text-slate-400">
                            Denom (Evidence) = {fmt(math.num)} + {fmt(c.content.calculation.priorB * c.content.calculation.likeB)} = {fmt(math.den)}
                         </div>
                         <div className="border-t border-slate-600 pt-2 mt-1 text-lg text-white font-bold">
                            P({c.content.calculation.labelA}|Evidence) = {pct(math.res)}
                         </div>
                       </div>
                    </div>

                    <div className="mt-4 pt-2 border-t border-slate-200 text-right font-medium text-slate-800">
                      ✅ {c.content.conclusion}
                    </div>
                  </div>
                </div>
              </div>

              {!selectedCase && (
                 <p className="text-xs text-center opacity-50 mt-4">点击查看公式拆解</p>
              )}
            </div>
          )})}
        </div>
      </div>
    </div>
  );
};

export default StepCases;