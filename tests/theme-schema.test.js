import { describe, it, expect } from 'vitest';
import { DEFAULT_THEME, ThemeSchema, PropType } from '../src/renderer/js/ThemeSchema.js';
import { ThemeManager } from '../src/renderer/js/ThemeManager.js';

describe('DEFAULT_THEME', () => {
  it('should have a name property', () => {
    expect(DEFAULT_THEME.name).toBe('Default');
  });

  it('should have invertSettingsIcon as boolean', () => {
    expect(typeof DEFAULT_THEME.invertSettingsIcon).toBe('boolean');
  });

  it('should contain all expected CalendarNotes theme properties', () => {
    const expectedProperties = [
      'name', 'invertSettingsIcon',
      'appBack', 'buttonsBack', 'buttonsBorder', 'buttonsBorderStyle', 'buttonsBorderSize',
      'buttonsHoverBack', 'buttonsHoverText', 'buttonsSelectedBack', 'buttonsSelectedText', 'buttonsText',
      'calDaysBack', 'calDaysBorder', 'calDaysHoverBack', 'calDaysHoverText',
      'calDaysSelectedBack', 'calDaysSelectedText', 'calDaysHighlightedBack', 'calDaysHighlightedText', 'calDaysText',
      'calDOWBack', 'calDOWBorder', 'calDOWText',
      'calHeaderBack', 'calHeaderBorder', 'calHeaderDivider', 'calHeaderHoverBack', 'calHeaderHoverText', 'calHeaderText',
      'docBack', 'docBorder',
      'foundBack', 'foundBorder', 'foundHoverBack', 'foundHoverText', 'foundText',
      'listBack', 'listBorder',
      'notesBack', 'notesBorder', 'notesHeaderBack', 'notesHeaderBorder', 'notesHeaderText',
      'notesSelectedBack', 'notesSelectedText', 'notesText', 'notesHighlightText',
      'pagesBack', 'pagesBorder', 'pageBack', 'pageBorder', 'pageText',
      'pageHoverBack', 'pageHoverText', 'pageSelectedBack', 'pageSelectedText', 'pageSelectedBorder',
      'searchBack', 'searchBorder', 'searchText',
      'settingsBack', 'settingsText',
      'tabBack', 'tabBorder', 'tabDivider', 'tabHoverBack', 'tabHoverText', 'tabSelectedBack', 'tabSelectedText', 'tabText',
      'tasksBack', 'tasksBorder', 'tasksSelectedBack', 'tasksSelectedText', 'tasksText',
      'tvBack', 'tvBorder', 'tvHoverBack', 'tvHoverText', 'tvNavBack', 'tvNavHover', 'tvSelectedBack', 'tvSelectedText', 'tvText'
    ];

    for (const prop of expectedProperties) {
      expect(DEFAULT_THEME).toHaveProperty(prop);
    }
  });

  it('should have 85 properties total', () => {
    expect(Object.keys(DEFAULT_THEME).length).toBe(85);
  });
});

describe('ThemeSchema', () => {
  it('should return all property groups', () => {
    const groups = ThemeSchema.getAllGroups();
    expect(Object.keys(groups).length).toBeGreaterThan(0);
  });

  it('should return correct group for calendarHeader', () => {
    const group = ThemeSchema.getGroup('calendarHeader');
    expect(group).not.toBeNull();
    expect(group.label).toBe('Calendar Header');
    expect(group.properties).toContain('calHeaderBack');
    expect(group.properties).toContain('calHeaderText');
  });

  it('should return null for unknown group', () => {
    expect(ThemeSchema.getGroup('nonexistent')).toBeNull();
  });

  it('should return COLOR type for most properties', () => {
    expect(ThemeSchema.getPropertyType('appBack')).toBe(PropType.COLOR);
    expect(ThemeSchema.getPropertyType('calHeaderBack')).toBe(PropType.COLOR);
  });

  it('should return correct types for non-color properties', () => {
    expect(ThemeSchema.getPropertyType('name')).toBe(PropType.TEXT);
    expect(ThemeSchema.getPropertyType('invertSettingsIcon')).toBe(PropType.BOOLEAN);
    expect(ThemeSchema.getPropertyType('buttonsBorderStyle')).toBe(PropType.BORDER_STYLE);
    expect(ThemeSchema.getPropertyType('buttonsBorderSize')).toBe(PropType.BORDER_SIZE);
  });

  it('should cover all theme properties across groups', () => {
    const groups = ThemeSchema.getAllGroups();
    const coveredProps = new Set();
    for (const group of Object.values(groups)) {
      for (const prop of group.properties) {
        coveredProps.add(prop);
      }
    }

    // Every non-meta property in DEFAULT_THEME should be covered by a group
    for (const prop of Object.keys(DEFAULT_THEME)) {
      expect(coveredProps.has(prop)).toBe(true);
    }
  });
});

describe('ThemeSchema.getAllGroups', () => {
  it('should return all expected group names', () => {
    const groups = ThemeSchema.getAllGroups();
    const expectedGroupNames = [
      'application', 'buttons', 'calendarHeader', 'calendarDOW',
      'calendarDays', 'tabs', 'tasks', 'treeView', 'search',
      'notesHeader', 'notesEditor', 'pages', 'list', 'settings', 'meta'
    ];

    for (const name of expectedGroupNames) {
      expect(groups).toHaveProperty(name);
    }
  });
});

describe('ThemeSchema.getGroupNames', () => {
  it('should return correct count of groups', () => {
    const names = ThemeSchema.getGroupNames();
    expect(names).toHaveLength(15);
  });

  it('should return an array of strings', () => {
    const names = ThemeSchema.getGroupNames();
    for (const name of names) {
      expect(typeof name).toBe('string');
    }
  });
});

describe('Group properties exist in DEFAULT_THEME', () => {
  const groups = ThemeSchema.getAllGroups();
  for (const [groupName, group] of Object.entries(groups)) {
    it(`all properties in "${groupName}" should exist in DEFAULT_THEME`, () => {
      for (const prop of group.properties) {
        expect(DEFAULT_THEME).toHaveProperty(prop);
      }
    });
  }
});

describe('Theme save/load round-trip', () => {
  it('should produce valid JSON matching CalendarNotes format', () => {
    const json = JSON.stringify(DEFAULT_THEME, null, 2);
    const parsed = JSON.parse(json);

    expect(parsed.name).toBe('Default');
    expect(parsed.invertSettingsIcon).toBe(false);
    expect(parsed.appBack).toBe('#e0e0e0');
    expect(Object.keys(parsed).length).toBe(Object.keys(DEFAULT_THEME).length);
  });

  it('should fill missing properties from defaults via ThemeManager.loadTheme()', () => {
    const tm = new ThemeManager();
    tm.loadTheme({ name: 'Partial', appBack: '#ff0000' });

    expect(tm.currentTheme.name).toBe('Partial');
    expect(tm.currentTheme.appBack).toBe('#ff0000');
    expect(tm.currentTheme.buttonsBack).toBe('#a74c00'); // Filled from default
    expect(tm.currentTheme.calHeaderBack).toBe('#ff7400'); // Filled from default
  });
});
