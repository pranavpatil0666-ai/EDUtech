
import React from 'react';
import { MentorshipPlan as PlanType } from '../types';

interface MentorshipPlanProps {
  plan: PlanType;
  onReset: () => void;
}

const MentorshipPlan: React.FC<MentorshipPlanProps> = ({ plan, onReset }) => {
  const Section = ({ title, icon, content, color, gradient }: { title: string, icon: string, content: string, color: string, gradient: string }) => {
    if (!content || content.trim() === "") return null;
    
    return (
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-8 transition-all hover:shadow-md group">
        <div className={`h-1.5 w-full ${gradient}`}></div>
        <div className="p-6 md:p-8">
          <div className="flex items-center mb-6">
            <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center text-2xl shadow-sm mr-4 group-hover:rotate-6 transition-transform`}>
              {icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 tracking-tight">{title}</h3>
          </div>
          <div className="text-gray-700 space-y-3">
            {content.split('\n').map((line, i) => {
               const trimmed = line.trim();
               if (!trimmed) return <div key={i} className="h-2"></div>;
               
               const isListItem = trimmed.startsWith('-') || trimmed.startsWith('*') || /^\d+\./.test(trimmed);
               const isHeading = trimmed.endsWith(':') && !isListItem;
               
               // Render bold text parts
               const parts = line.split('**');
               const renderedLine = parts.map((part, j) => 
                 j % 2 === 1 ? <strong key={j} className="text-gray-900 font-bold">{part}</strong> : part
               );

               return (
                 <div 
                   key={i} 
                   className={`
                     ${isListItem ? 'pl-6 -indent-6' : ''} 
                     ${isHeading ? 'text-gray-900 font-bold mt-4 mb-2 border-l-4 border-indigo-200 pl-3' : 'text-sm md:text-base'}
                     leading-relaxed
                   `}
                 >
                   {renderedLine}
                 </div>
               );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-2">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 leading-tight">
            Your Adaptive <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Growth Blueprint</span>
          </h2>
          <p className="text-gray-500 mt-2 font-medium">Curated by EduPath AI for your unique profile.</p>
        </div>
        <button 
          onClick={onReset}
          className="flex items-center space-x-2 px-6 py-3 rounded-2xl bg-white border border-gray-200 text-gray-600 font-bold text-sm hover:border-indigo-600 hover:text-indigo-600 transition-all shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
          </svg>
          <span>Modify Profile</span>
        </button>
      </div>

      {plan.clarifyingNote && (
        <div className="bg-amber-50 border border-amber-200 rounded-[2rem] p-8 mb-10 flex items-start space-x-5 shadow-sm">
          <div className="text-4xl animate-bounce">❓</div>
          <div>
            <h4 className="font-extrabold text-amber-900 text-lg mb-2">Mentor's Clarifying Note</h4>
            <div className="text-amber-800 text-sm md:text-base leading-relaxed whitespace-pre-line">
              {plan.clarifyingNote}
            </div>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Section 
          title="Profile Analysis" icon="📍" 
          content={plan.profileSummary} 
          color="bg-blue-50" gradient="bg-blue-500" 
        />
        <Section 
          title="Career Paths" icon="🎯" 
          content={plan.careerPaths} 
          color="bg-indigo-50" gradient="bg-indigo-500" 
        />
        <Section 
          title="Skill Roadmap" icon="🧠" 
          content={plan.skillRoadmap} 
          color="bg-purple-50" gradient="bg-purple-500" 
        />
        <Section 
          title="Study Plan" icon="📚" 
          content={plan.studyPlan} 
          color="bg-emerald-50" gradient="bg-emerald-500" 
        />
        <Section 
          title="Project Ideas" icon="🚀" 
          content={plan.projectIdeas} 
          color="bg-orange-50" gradient="bg-orange-500" 
        />
        <Section 
          title="Career Preparation" icon="💼" 
          content={plan.careerPrep} 
          color="bg-rose-50" gradient="bg-rose-500" 
        />
        <Section 
          title="Growth Strategy" icon="📈" 
          content={plan.growthStrategy} 
          color="bg-cyan-50" gradient="bg-cyan-500" 
        />
      </div>

      <div className="mt-16 bg-gray-900 rounded-[3rem] p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/20 rounded-full -mr-40 -mt-40 blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-violet-500/20 rounded-full -ml-40 -mb-40 blur-[100px]"></div>
        
        <h3 className="text-3xl md:text-4xl font-bold mb-6 relative z-10">Roadmap Ready.</h3>
        <p className="text-gray-400 mb-10 max-w-xl mx-auto text-lg relative z-10">
          Success is built on small, consistent daily actions. Choose one step from your study plan and start now.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 relative z-10">
          <button 
            className="w-full sm:w-auto bg-white text-gray-900 px-10 py-4 rounded-2xl font-extrabold hover:bg-indigo-50 transition-all shadow-xl"
            onClick={() => window.print()}
          >
            Export Blueprint
          </button>
          <button 
            className="w-full sm:w-auto bg-gray-800 border border-gray-700 text-white px-10 py-4 rounded-2xl font-bold hover:bg-gray-700 transition-all"
            onClick={() => {
              navigator.clipboard.writeText(plan.rawResponse || '');
              alert('Copied to clipboard!');
            }}
          >
            Copy Text
          </button>
        </div>
      </div>
    </div>
  );
};

export default MentorshipPlan;
