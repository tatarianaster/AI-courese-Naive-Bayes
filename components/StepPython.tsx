import React from 'react';

const StepPython: React.FC = () => {
  const codeString = `# 我们不再使用复杂的外部数据，而是直接写几个简单的句子。
from sklearn.naive_bayes import MultinomialNB
from sklearn.feature_extraction.text import CountVectorizer

# 1. 准备最简单的数据
# 只有两类：'Normal'(正常) 和 'Spam'(垃圾)
train_sentences = [
    "love homework study",    # 正常邮件
    "meeting work project",   # 正常邮件
    "money cash free",        # 垃圾邮件
    "free offer cash"         # 垃圾邮件
]
train_labels = [0, 0, 1, 1]   # 0代表正常，1代表垃圾

# 2. 将文字转化为数字 (特征向量化)
# 电脑看不懂 "money"，它只能看懂数字。
# CountVectorizer 会数每个词出现的次数。
vectorizer = CountVectorizer()
X_train = vectorizer.fit_transform(train_sentences)

# 打印来看看它学到了哪些词 (按字母顺序):
# ['cash', 'free', 'homework', 'love', 'meeting', 'money', 'offer', 'project', 'study', 'work']
# print(vectorizer.get_feature_names_out())

# 3. 训练模型
clf = MultinomialNB()
clf.fit(X_train, train_labels)

# 4. 预测新邮件
# 假设来了一封信："free cash"
new_email = ["free cash"]
X_new = vectorizer.transform(new_email) # 也要转成数字

# 预测结果
print("预测类别:", clf.predict(X_new))       # 输出 [1] -> 垃圾邮件
print("概率分布:", clf.predict_proba(X_new)) # 输出 [[0.05, 0.95]] -> 95%是垃圾邮件`;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
        <h2 className="text-3xl font-bold text-slate-800 mb-6">4. Python 代码实战 (简化版)</h2>
        <p className="text-slate-600 mb-6">
          这里我们用最直观的数据来演示。你会发现，代码的核心逻辑和我们刚才手算的完全一样。
        </p>

        <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg mb-8">
          <div className="bg-slate-800 px-4 py-2 flex items-center gap-2 border-b border-slate-700">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-slate-400 text-sm ml-2 font-mono">simple_bayes.py</span>
          </div>
          <pre className="p-6 overflow-x-auto custom-scrollbar">
            <code className="font-mono text-sm text-blue-300 leading-relaxed">
              {codeString.split('\n').map((line, i) => (
                <div key={i} className="table-row">
                  <span className="table-cell text-slate-600 select-none pr-4 text-right w-8 border-r border-slate-700 mr-4">{i + 1}</span>
                  <span className="table-cell pl-4 whitespace-pre">
                     <span dangerouslySetInnerHTML={{__html: line
                        .replace(/#.*/, (m) => `<span class="text-slate-500 italic">${m}</span>`)
                        .replace(/('.*?')|(".*?")/g, (m) => `<span class="text-orange-300">${m}</span>`)
                        .replace(/\b(from|import|def|return|class|if|else)\b/g, (m) => `<span class="text-purple-400 font-bold">${m}</span>`)
                        .replace(/\b(MultinomialNB|CountVectorizer)\b/g, (m) => `<span class="text-yellow-300">${m}</span>`)
                        .replace(/\b(fit|transform|predict|fit_transform)\b/g, (m) => `<span class="text-cyan-400">${m}</span>`)
                      }} />
                  </span>
                </div>
              ))}
            </code>
          </pre>
        </div>

        <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100">
          <h3 className="text-lg font-bold text-emerald-900 mb-3">🛠️ 代码在做什么？</h3>
          <ul className="space-y-3 text-sm text-emerald-800">
            <li className="flex gap-2">
              <span className="font-mono bg-white px-1 rounded border border-emerald-200">CountVectorizer</span>
              <span>
                <strong>数数工具</strong>。它把 "free cash" 变成向量 <code className="text-xs">[1, 1, 0, 0...]</code>。这就好比我们在实验室里数的 "30个Offer"。
              </span>
            </li>
            <li className="flex gap-2">
              <span className="font-mono bg-white px-1 rounded border border-emerald-200">MultinomialNB</span>
              <span>
                <strong>计算器</strong>。它内部自动帮我们算了 $P(Word|Spam)$ 和 $P(Spam)$，然后套用公式。
              </span>
            </li>
            <li className="flex gap-2">
              <span className="font-mono bg-white px-1 rounded border border-emerald-200">predict_proba</span>
              <span>
                <strong>输出概率</strong>。它不仅告诉你结果，还告诉你信心指数（比如 95% 确定）。
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StepPython;