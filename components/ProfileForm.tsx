
import React from 'react';
import { StudentProfile, AppMode } from '../types';

interface ProfileFormProps {
  profile: StudentProfile;
  setProfile: React.Dispatch<React.SetStateAction<StudentProfile>>;
  onSubmit: (mode: AppMode) => void;
  isLoading: boolean;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ profile, setProfile, onSubmit, isLoading }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const loadDemo = () => {
    setProfile({
      name: 'Alex Rivera',
      educationLevel: '2nd Year Undergraduate',
      experienceLevel: 'Beginner',
      stream: 'Computer Science',
      currentSkills: 'Python, basic blockchain',
      interests: 'AI, Web3, startups',
      strengths: 'Logical thinking, consistency',
      weaknesses: 'Communication, time management',
      goals: 'High paying tech job',
      dailyAvailableTime: '3-5 Hours',
      targetCareerExam: 'AI Engineer / Product-based company'
    });
  };

  const inputClass = "w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all bg-white text-gray-900";
  const labelClass = "block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1";

  const modeButtons = [
    { mode: AppMode.CAREER, icon: '🎯', color: 'bg-indigo-600', hover: 'hover:bg-indigo-700' },
    { mode: AppMode.STUDY, icon: '📚', color: 'bg-emerald-600', hover: 'hover:bg-emerald-700' },
    { mode: AppMode.SKILL, icon: '🚀', color: 'bg-amber-600', hover: 'hover:bg-amber-700' },
    { mode: AppMode.JOB, icon: '💼', color: 'bg-rose-600', hover: 'hover:bg-rose-700' },
    { mode: AppMode.PROJECT, icon: '🧪', color: 'bg-purple-600', hover: 'hover:bg-purple-700' },
  ];

  const isFormValid = profile.name && profile.targetCareerExam && profile.experienceLevel;

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 border border-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900">Mentor Input</h2>
          <p className="text-gray-500 mt-1 font-medium">Tell us about yourself to tailor your plan.</p>
        </div>
        <button 
          onClick={loadDemo}
          className="text-xs font-bold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-full hover:bg-indigo-100 transition-colors border border-indigo-100"
        >
          Auto-fill Demo Profile ✨
        </button>
      </div>

      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className={labelClass}>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Alex Johnson"
              value={profile.name}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Education Level</label>
            <input
              type="text"
              name="educationLevel"
              placeholder="e.g. Undergraduate / 12th Grade"
              value={profile.educationLevel}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className={labelClass}>Current Level</label>
            <select
              name="experienceLevel"
              value={profile.experienceLevel}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select Proficiency</option>
              <option value="Beginner">Beginner (Adapt for Fundamentals)</option>
              <option value="Intermediate">Intermediate (Adapt for Core Concepts)</option>
              <option value="Advanced">Advanced (Adapt for In-depth Strategy)</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Academic Stream</label>
            <input
              type="text"
              name="stream"
              placeholder="e.g. Computer Science / Science"
              value={profile.stream}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Target Goal / Career / Exam</label>
          <input
            type="text"
            name="targetCareerExam"
            placeholder="e.g. UPSC, AI Engineer at Google, GRE"
            value={profile.targetCareerExam}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className={labelClass}>Daily Bandwidth</label>
            <select
              name="dailyAvailableTime"
              value={profile.dailyAvailableTime}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select Time</option>
              <option value="1-2 Hours">1-2 Hours (Optimize for speed)</option>
              <option value="3-5 Hours">3-5 Hours (Balanced roadmap)</option>
              <option value="5+ Hours">5+ Hours (In-depth mastery)</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Main Goal Summary</label>
            <input
              type="text"
              name="goals"
              placeholder="e.g. Get a high paying remote job"
              value={profile.goals}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className={labelClass}>Skills & Tools</label>
            <textarea
              name="currentSkills"
              rows={3}
              placeholder="What can you do now?"
              value={profile.currentSkills}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Interests</label>
            <textarea
              name="interests"
              rows={3}
              placeholder="What do you enjoy?"
              value={profile.interests}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>

        <div className="pt-10 border-t border-gray-100">
          <label className="block text-center text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-8">
            Select Your Blueprint Focus
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {modeButtons.map((btn) => (
              <button
                key={btn.mode}
                onClick={() => onSubmit(btn.mode)}
                disabled={isLoading || !isFormValid}
                className={`group flex flex-col items-center justify-center space-y-2 p-4 rounded-3xl transition-all ${
                  isLoading || !isFormValid
                    ? 'bg-gray-50 text-gray-300 cursor-not-allowed opacity-50'
                    : `bg-white border-2 border-gray-100 hover:border-indigo-500 hover:shadow-xl active:scale-95`
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl ${isLoading || !isFormValid ? 'bg-gray-100' : btn.color} flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform`}>
                  <span className={isLoading || !isFormValid ? 'grayscale' : ''}>{btn.icon}</span>
                </div>
                <span className={`text-xs font-black uppercase tracking-tighter ${isLoading || !isFormValid ? 'text-gray-300' : 'text-gray-600 group-hover:text-indigo-600'}`}>
                  {btn.mode.split(' ')[0]}
                </span>
              </button>
            ))}
          </div>
          
          {isLoading && (
             <div className="mt-10 flex flex-col items-center justify-center text-indigo-600 animate-pulse">
                <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
                <span className="font-bold text-sm tracking-widest uppercase">Consulting AI Mentor...</span>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
