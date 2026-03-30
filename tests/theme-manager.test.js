import { describe, it, expect } from 'vitest';
import { ThemeManager } from '../src/renderer/js/ThemeManager.js';
import { DEFAULT_THEME } from '../src/renderer/js/ThemeSchema.js';

describe('ThemeManager', () => {
  describe('createNewTheme', () => {
    it('should create a theme matching DEFAULT_THEME', () => {
      const tm = new ThemeManager();
      tm.createNewTheme();
      expect(tm.currentTheme).toEqual(DEFAULT_THEME);
    });

    it('should not have unsaved changes after creation', () => {
      const tm = new ThemeManager();
      tm.createNewTheme();
      expect(tm.hasUnsavedChanges()).toBe(false);
    });
  });

  describe('loadTheme', () => {
    it('should fill missing properties from defaults', () => {
      const tm = new ThemeManager();
      tm.loadTheme({ name: 'Partial', appBack: '#ff0000' });
      expect(tm.currentTheme.name).toBe('Partial');
      expect(tm.currentTheme.appBack).toBe('#ff0000');
      expect(tm.currentTheme.buttonsBack).toBe(DEFAULT_THEME.buttonsBack);
    });

    it('should strip unknown keys', () => {
      const tm = new ThemeManager();
      tm.loadTheme({ name: 'Test', unknownProp: 'bad', __proto__: 'evil' });
      expect(tm.currentTheme.unknownProp).toBeUndefined();
      expect(tm.currentTheme.name).toBe('Test');
    });

    it('should not have unsaved changes after load', () => {
      const tm = new ThemeManager();
      tm.loadTheme({ name: 'Test' });
      expect(tm.hasUnsavedChanges()).toBe(false);
    });
  });

  describe('validateTheme', () => {
    it('should reject null', () => {
      const tm = new ThemeManager();
      expect(tm.validateTheme(null)).toBe(false);
    });

    it('should reject arrays', () => {
      const tm = new ThemeManager();
      expect(tm.validateTheme([1, 2, 3])).toBe(false);
    });

    it('should reject objects without name', () => {
      const tm = new ThemeManager();
      expect(tm.validateTheme({ appBack: '#fff' })).toBe(false);
    });

    it('should reject objects with non-string name', () => {
      const tm = new ThemeManager();
      expect(tm.validateTheme({ name: 42 })).toBe(false);
    });

    it('should reject objects with unknown keys', () => {
      const tm = new ThemeManager();
      expect(tm.validateTheme({ name: 'Test', unknownKey: 'value' })).toBe(false);
    });

    it('should accept valid theme with all keys', () => {
      const tm = new ThemeManager();
      expect(tm.validateTheme(DEFAULT_THEME)).toBe(true);
    });

    it('should accept valid theme with subset of keys', () => {
      const tm = new ThemeManager();
      expect(tm.validateTheme({ name: 'Minimal', appBack: '#000' })).toBe(true);
    });
  });

  describe('hasUnsavedChanges', () => {
    it('should detect changes after mutation', () => {
      const tm = new ThemeManager();
      tm.createNewTheme();
      tm.currentTheme.appBack = '#ff0000';
      expect(tm.hasUnsavedChanges()).toBe(true);
    });

    it('should be clean after markSaved', () => {
      const tm = new ThemeManager();
      tm.createNewTheme();
      tm.currentTheme.appBack = '#ff0000';
      tm.markSaved();
      expect(tm.hasUnsavedChanges()).toBe(false);
    });
  });
});
