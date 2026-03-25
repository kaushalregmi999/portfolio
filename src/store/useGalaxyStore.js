import { create } from 'zustand'

export const useGalaxyStore = create((set) => ({
  selectedProjectId: null,
  focusSection: 'projects',
  chat: [
    {
      id: 'welcome',
      role: 'assistant',
      content:
        'Hi, I am your recruiter guide. Ask me about Kaushal\'s strongest projects, leadership impact, or stack depth.',
    },
  ],
  setSelectedProject: (projectId) =>
    set(() => ({ selectedProjectId: projectId, focusSection: 'projects' })),
  setFocusSection: (section) => set(() => ({ focusSection: section })),
  pushMessage: (message) => set((state) => ({ chat: [...state.chat, message] })),
  resetChat: () =>
    set(() => ({
      chat: [
        {
          id: 'welcome',
          role: 'assistant',
          content:
            'Hi, I am your recruiter guide. Ask me about Kaushal\'s strongest projects, leadership impact, or stack depth.',
        },
      ],
    })),
}))
