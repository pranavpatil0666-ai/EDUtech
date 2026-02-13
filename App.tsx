
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import ProfileForm from './components/ProfileForm';
import MentorshipPlan from './components/MentorshipPlan';
import { StudentProfile, MentorshipPlan as PlanType, AppStatus, AppMode } from './types';
import { generateMentorshipPlan } from './services/geminiService';

const INITIAL_PROFILE: StudentProfile = {
  name: '',
  educationLevel: '',
  experienceLevel: '',
  stream: '',
  currentSkills: '',
  interests: '',
  strengths: '',
  weaknesses: '',
  goals: '',
  dailyAvailableTime: '',
  targetCareerExam: ''
};

const App: React.FC = () => {
  const [profile, setProfile] = useState<StudentProfile>(INITIAL_PROFILE);
  const [plan, setPlan] = useState<PlanType | null>(null);
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [error, setError] = useState<string | null>(null);
  const [activeMode, setActiveMode] = useState<AppMode | null>(null);

  const handleSubmit = useCallback(async (mode: AppMode) => {
    setStatus(AppStatus.LOADING);
    setActiveMode(mode);
    setError(null);
    try {
      const result = await generateMentorshipPlan(profile, mode);
      setPlan(result);
      setStatus(AppStatus.SUCCESS);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
      setStatus(AppStatus.ERROR);
    }
  }, [profile]);

  const handleReset = () => {
    setPlan(null);
    setStatus(AppStatus.IDLE);
    setError(null);
    setActiveMode(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
        {status === AppStatus.IDLE || status === AppStatus.LOADING || status === AppStatus.ERROR ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 pt-8">
              <span className="inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-4">
                Powered by Gemini 3.0
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                Your Personal <br />
                <span className="text-indigo-600">AI Mentor.</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-md">
                Get a customized roadmap designed for your specific needs—whether it's acing an exam, building a career, or mastering a skill.
              </p>
              
              <div className="grid grid-cols-1 gap-4 mb-8">
                {[
                  { title: "Career Mode", desc: "Long-term strategy & growth.", icon: "🎯" },
                  { title: "Study Mode", desc: "Schedules & resources.", icon: "📚" },
                  { title: "Skill Mode", desc: "Technical & soft skills.", icon: "🚀" },
                  { title: "Job Mode", desc: "Resumes & interview prep.", icon: "💼" },
                  { title: "Project Mode", desc: "Hands-on portfolio building.", icon: "🧪" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-3 p-3 bg-white rounded-xl shadow-sm border border-gray-100">
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <div className="text-sm font-bold text-gray-900">{item.title}</div>
                      <div className="text-xs text-gray-500">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {error && (
                <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm animate-pulse">
                  <div className="flex items-center space-x-2 font-bold mb-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Something went wrong</span>
                  </div>
                  {error}
                </div>
              )}
            </div>

            <div className="lg:col-span-7">
              <ProfileForm 
                profile={profile} 
                setProfile={setProfile} 
                onSubmit={handleSubmit} 
                isLoading={status === AppStatus.LOADING} 
              />
            </div>
          </div>
        ) : (
          plan && (
            <div>
               <div className="mb-4 flex items-center space-x-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg inline-flex">
                 <span className="text-lg font-bold">Mode: {activeMode}</span>
               </div>
               <MentorshipPlan plan={plan} onReset={handleReset} />
            </div>
          )
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 py-12 mt-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span className="font-bold text-gray-900">EduPath AI</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-indigo-600">Privacy Policy</a>
              <a href="#" className="hover:text-indigo-600">Terms of Service</a>
              <a href="#" className="hover:text-indigo-600">Contact</a>
            </div>
            <p>© {new Date().getFullYear()} EduPath AI. Empowering Students.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
