import { DEFAULT_THEME, ThemeSchema } from './ThemeSchema.js';

export class ThemeManager {
  constructor() {
    this.currentTheme = null;
    this.lastSavedTheme = null;
  }

  createNewTheme() {
    this.currentTheme = JSON.parse(JSON.stringify(DEFAULT_THEME));
    this.lastSavedTheme = JSON.parse(JSON.stringify(DEFAULT_THEME));
  }

  loadTheme(themeData) {
    // Filter to only known keys from DEFAULT_THEME before merging
    const knownKeys = Object.keys(DEFAULT_THEME);
    const filtered = {};
    for (const key of knownKeys) {
      if (key in themeData) {
        filtered[key] = themeData[key];
      }
    }
    const filled = { ...DEFAULT_THEME, ...filtered };
    this.currentTheme = filled;
    this.lastSavedTheme = JSON.parse(JSON.stringify(filled));
  }

  validateTheme(themeData) {
    if (!themeData || typeof themeData !== 'object' || Array.isArray(themeData)) return false;
    // Must have a name property that is a string
    if (typeof themeData.name !== 'string') return false;
    // Check that no unknown keys are present beyond what DEFAULT_THEME defines
    const knownKeys = new Set(Object.keys(DEFAULT_THEME));
    for (const key of Object.keys(themeData)) {
      if (!knownKeys.has(key)) return false;
    }
    return true;
  }

  hasUnsavedChanges() {
    return JSON.stringify(this.currentTheme) !== JSON.stringify(this.lastSavedTheme);
  }

  markSaved() {
    this.lastSavedTheme = JSON.parse(JSON.stringify(this.currentTheme));
  }
}
