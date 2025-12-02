import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { sendMessage } from '../services/geminiService';

const SUGGESTED_QUESTIONS = [
  "为什么我们要假设特征是独立的？",
  "如果某个单词在训练集中没出现过怎么办？",
  "朴素贝叶斯和神经网络相比有什么优缺点？",
  "能再给我讲讲那个“罕见病”的例子吗？",
];

const StepTutor: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: '你好！我是你的 AI 辅导老师。🎓<br/>关于朴素贝叶斯，无论是数学推导、Python代码还是应用场景，哪里还没弄懂？' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await sendMessage(text);
      const aiMsg: ChatMessage = { role: 'model', text: responseText };
      setMessages(prev => [...prev, aiMsg]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: '抱歉，我现在有点累，请稍后再试。', isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="space-y-8 animate-fade-in h-full flex flex-col">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex-1 flex flex-col min-h-[600px]">
        <div className="border-b pb-4 mb-4">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            🤖 智能助教
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            你可以自由提问，或者点击下方的快捷问题。
          </p>
        </div>

        <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2 custom-scrollbar">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[85%] rounded-2xl px-5 py-3 text-sm md:text-base leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200'
                } ${msg.isError ? 'bg-red-50 text-red-600 border border-red-200' : ''}`}
              >
                 <div dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>') }} />
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-50 px-4 py-2 rounded-2xl rounded-bl-none flex items-center gap-2 border border-slate-100">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions Chips */}
        {messages.length < 3 && !isLoading && (
          <div className="flex flex-wrap gap-2 mb-4">
             {SUGGESTED_QUESTIONS.map((q, i) => (
               <button 
                 key={i}
                 onClick={() => handleSend(q)}
                 className="text-xs sm:text-sm bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors border border-blue-100"
               >
                 {q}
               </button>
             ))}
          </div>
        )}

        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入你的问题..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all resize-none h-14"
          />
          <button
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepTutor;