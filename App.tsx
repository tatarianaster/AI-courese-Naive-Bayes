import React, { useState } from 'react';
import { StepType } from './types';
import StepIntro from './components/StepIntro';
import StepTheory from './components/StepTheory';
import StepMathLab from './components/StepMathLab';
import StepPython from './components/StepPython';
import StepCases from './components/StepCases';
import StepSummary from './components/StepSummary';
import StepTutor from './components/StepTutor';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<StepType>(StepType.INTRO);

  const steps = [
    { id: StepType.INTRO, label: '1. 直观理解' },
    { id: StepType.THEORY, label: '2. 核心原理' },
    { id: StepType.MATH_LAB, label: '3. 动手计算' },
    { id: StepType.PYTHON, label: '4. 代码实现' },
    { id: StepType.CASES, label: '5. 应用场景' },
    { id: StepType.SUMMARY, label: '6. 5分钟总结' },
    { id: StepType.TUTOR, label: '7. 智能助教' },
  ];

  const renderContent = () => {
    switch (currentStep) {
      case StepType.INTRO: return <StepIntro />;
      case StepType.THEORY: return <StepTheory />;
      case StepType.MATH_LAB: return <StepMathLab />;
      case StepType.PYTHON: return <StepPython />;
      case StepType.CASES: return <StepCases />;
      case StepType.SUMMARY: return <StepSummary />;
      case StepType.TUTOR: return <StepTutor />;
      default: return <StepIntro />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-12">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-blue-200 shadow-lg">B</div>
             <h1 className="text-xl font-bold text-slate-800 hidden sm:block">Naive Bayes Master</h1>
          </div>
          
          <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar mask-linear-fade">
            {steps.map((step) => (
              <button
                key={step.id}
                onClick={() => setCurrentStep(step.id)}
                className={`px-3 py-1.5 whitespace-nowrap rounded-full text-xs sm:text-sm font-medium transition-all ${
                  currentStep === step.id
                    ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-500 ring-offset-1'
                    : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                {step.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {renderContent()}
      </main>

      {/* Footer Navigation */}
      <div className="max-w-5xl mx-auto px-4 flex justify-between mt-8 mb-12">
         <button 
           className={`px-6 py-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-white hover:shadow-sm transition-all ${
             steps.findIndex(s => s.id === currentStep) === 0 ? 'invisible' : ''
           }`}
           onClick={() => {
             const idx = steps.findIndex(s => s.id === currentStep);
             if (idx > 0) setCurrentStep(steps[idx - 1].id);
           }}
         >
           ← 上一步
         </button>

         <button 
           className={`px-6 py-2 rounded-lg bg-blue-600 text-white shadow-md shadow-blue-200 hover:bg-blue-700 hover:shadow-lg transition-all ${
             steps.findIndex(s => s.id === currentStep) === steps.length - 1 ? 'invisible' : ''
           }`}
           onClick={() => {
             const idx = steps.findIndex(s => s.id === currentStep);
             if (idx < steps.length - 1) setCurrentStep(steps[idx + 1].id);
           }}
         >
           下一步 →
         </button>
      </div>
    </div>
  );
};

export default App;