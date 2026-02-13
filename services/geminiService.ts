
import { GoogleGenAI, Type } from "@google/genai";
import { StudentProfile, MentorshipPlan, AppMode } from "../types";

export const generateMentorshipPlan = async (profile: StudentProfile, mode: AppMode): Promise<MentorshipPlan> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

  const modeIntentMap: Record<AppMode, string> = {
    [AppMode.CAREER]: "INTENT: Focus on long-term career growth, industry trends, and strategic positioning.",
    [AppMode.STUDY]: "INTENT: Focus on day-to-day study schedules, academic resources, and exam preparation.",
    [AppMode.SKILL]: "INTENT: Focus on technical proficiency, specific toolsets, and mastery roadmaps.",
    [AppMode.JOB]: "INTENT: Focus on interview prep, resumes, networking, and immediate job market entry.",
    [AppMode.PROJECT]: "INTENT: Focus on hands-on building, portfolio development, and real-world application."
  };

  const prompt = `
    You are EduPath AI, a professional AI education and career mentor.
    
    Current Selection: ${mode}
    ${modeIntentMap[mode]}

    STUDENT PROFILE:
    - Name: ${profile.name}
    - Education: ${profile.educationLevel}
    - Proficiency: ${profile.experienceLevel}
    - Stream: ${profile.stream}
    - Current Skills: ${profile.currentSkills}
    - Interests: ${profile.interests}
    - Strengths: ${profile.strengths}
    - Weaknesses: ${profile.weaknesses}
    - Goals: ${profile.goals}
    - Available Time: ${profile.dailyAvailableTime}
    - Target: ${profile.targetCareerExam}

    ADAPTIVE RULES (MANDATORY):
    1. IF CONFUSED/MISSING DATA: Prepend a "❓ Clarifying Note" section asking the user for specific missing details while giving your best available advice.
    2. IF BEGINNER: Use simple language, simplify the roadmap, and focus heavily on core fundamentals.
    3. IF ADVANCED: Increase technical depth, suggest niche advanced topics, and focus on high-level strategy.
    4. IF LOW TIME: Optimize the plan for extreme efficiency. Prioritize high-impact tasks (Pareto principle).
    5. IF EXAM FOCUS: Prioritize academic concepts, testing strategies, and resource mastery.
    6. IF JOB FOCUS: Prioritize hands-on projects, skill validation, and career readiness.
    7. IF STARTUP FOCUS: Prioritize business thinking, MVP creation, and entrepreneurial mindset.

    OUTPUT UI SETTINGS:
    - STYLE: Highly structured, clean formatting, and engaging.
    - HEADINGS: Use bold sub-headings for sub-points within sections.
    - EMOJIS: Use relevant emojis to make the content student-friendly.
    - BULLET POINTS: Use bullet points for all lists and actionable steps.
    - CLEAR SECTIONS: Strictly follow the header structure below.

    REQUIRED RESPONSE STRUCTURE:
    ❓ Clarifying Note (Only if profile is confusing/missing details)
    📍 Profile Summary
    🎯 Career Paths
    🧠 Skill Roadmap
    📚 Study Plan
    🚀 Project Ideas
    💼 Career Preparation
    📈 Growth Strategy

    Always be motivational, practical, and provide specific actionable steps.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.9,
      }
    });

    const text = response.text || '';
    const sections = text.split(/(?=❓|📍|🎯|🧠|📚|🚀|💼|📈)/);
    
    const getSection = (marker: string) => {
      const section = sections.find(s => s.trim().startsWith(marker));
      return section ? section.replace(marker, '').trim() : "";
    };

    return {
      clarifyingNote: getSection('❓'),
      profileSummary: getSection('📍') || "Summary unavailable.",
      careerPaths: getSection('🎯') || "Career paths unavailable.",
      skillRoadmap: getSection('🧠') || "Skill roadmap unavailable.",
      studyPlan: getSection('📚') || "Study plan unavailable.",
      projectIdeas: getSection('🚀') || "Project ideas unavailable.",
      careerPrep: getSection('💼') || "Career prep unavailable.",
      growthStrategy: getSection('📈') || "Growth strategy unavailable.",
      rawResponse: text
    };
  } catch (error) {
    console.error("Gemini Error:", error);
    throw new Error("EduPath AI is temporarily resting. Please try again in a moment.");
  }
};
