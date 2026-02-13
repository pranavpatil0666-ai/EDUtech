
export interface StudentProfile {
  name: string;
  educationLevel: string;
  stream: string;
  currentSkills: string;
  interests: string;
  strengths: string;
  weaknesses: string;
  goals: string;
  dailyAvailableTime: string;
  targetCareerExam: string;
  experienceLevel: 'Beginner' | 'Intermediate' | 'Advanced' | '';
}

export interface MentorshipPlan {
  clarifyingNote?: string;
  profileSummary: string;
  careerPaths: string;
  skillRoadmap: string;
  studyPlan: string;
  projectIdeas: string;
  careerPrep: string;
  growthStrategy: string;
  rawResponse?: string;
}

export enum AppStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export enum AppMode {
  CAREER = 'Career Mode',
  STUDY = 'Study Mode',
  SKILL = 'Skill Mode',
  JOB = 'Job Mode',
  PROJECT = 'Project Mode'
}
