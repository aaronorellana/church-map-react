import { create } from 'zustand';

const useLanguageStore = create((set) => ({
  language: 'en',
  setLanguage: (newLanguage) => set({ language: newLanguage }),
}));

export default useLanguageStore;