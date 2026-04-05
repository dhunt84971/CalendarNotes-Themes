// Theme property types
export const PropType = {
  COLOR: 'color',
  BORDER_STYLE: 'border-style',
  BORDER_SIZE: 'border-size',
  BOOLEAN: 'boolean',
  TEXT: 'text'
};

// Default theme matching CalendarNotes Default theme
export const DEFAULT_THEME = {
  name: 'Default',
  invertSettingsIcon: false,
  appBack: '#e0e0e0',
  buttonsBack: '#a74c00',
  buttonsBorder: '#fff',
  buttonsBorderStyle: 'none',
  buttonsBorderSize: '0px',
  buttonsHoverBack: '#d96200',
  buttonsHoverText: '#fff',
  buttonsSelectedBack: '#d96200',
  buttonsSelectedText: '#fff',
  buttonsText: '#fff',
  calDaysBack: '#fff',
  calDaysBorder: '#a74c00',
  calDaysHoverBack: '#d96200',
  calDaysHoverText: '#fff',
  calDaysSelectedBack: '#d96200',
  calDaysSelectedText: '#fff',
  calDaysHighlightedBack: '#FF7A0D',
  calDaysHighlightedText: '#fff',
  calDaysText: '#000',
  calDOWBack: '#fff',
  calDOWBorder: '#a74c00',
  calDOWText: '#000',
  calHeaderBack: '#ff7400',
  calHeaderBorder: '#ff7400',
  calHeaderDivider: '#ffb170',
  calHeaderHoverBack: '#d96200',
  calHeaderHoverText: '#fff',
  calHeaderText: '#fff',
  docBack: '#e0e0e0',
  docBorder: 'none',
  foundBack: '#ffcda4',
  foundBorder: 'lightgray',
  foundHoverBack: '#d96200',
  foundHoverText: '#fff',
  foundText: '#000',
  listBack: '#fff',
  listBorder: '#ff7400',
  notesBack: '#fff',
  notesBorder: '#ff7400',
  notesHeaderBack: '#ff7400',
  notesHeaderBorder: '#ff7400',
  notesHeaderText: '#fff',
  notesSelectedBack: 'blue',
  notesSelectedText: '#000', // Not currently used by CalendarNotes - hidden from editor
  notesText: '#000',
  notesHighlightText: '#ffcda4',
  pagesBack: '#fff',
  pagesBorder: '#ff7400',
  pageBack: '#ffcda4',
  pageBorder: 'lightgray',
  pageText: '#000',
  pageHoverBack: '#d96200',
  pageHoverText: '#fff',
  pageSelectedBack: '#d96200',
  pageSelectedText: '#fff', // Not currently used by CalendarNotes - hidden from editor
  pageSelectedBorder: 'lightgray',
  searchBack: '#fff',
  searchBorder: 'lightgray',
  searchText: '#000',
  settingsBack: '#ffcda4',
  settingsText: '#000',
  tabBack: '#a74c00',
  tabBorder: 'none',
  tabDivider: '#ff7400',
  tabHoverBack: '#d96200',
  tabHoverText: '#fff',
  tabSelectedBack: '#ff7400',
  tabSelectedText: '#fff',
  tabText: '#fff',
  tasksBack: '#ffcda4',
  tasksBorder: '#ff7400',
  tasksSelectedBack: 'blue',
  tasksSelectedText: '#000', // Not currently used by CalendarNotes - hidden from editor
  tasksText: '#000',
  tvBack: '#ffcda4',
  tvBorder: 'lightgray',
  tvHoverBack: '#d96200',
  tvHoverText: '#fff',
  tvNavBack: '#a74c00',
  tvNavHover: '#d96200',
  tvSelectedBack: '#d96200',
  tvSelectedText: '#fff',
  tvText: '#000'
};

// Property type metadata - maps each property to its type
const PROPERTY_TYPES = {
  name: PropType.TEXT,
  invertSettingsIcon: PropType.BOOLEAN,
  buttonsBorderStyle: PropType.BORDER_STYLE,
  buttonsBorderSize: PropType.BORDER_SIZE
  // All other properties are COLOR type by default
};

// Property groups - maps group name to display name and property list
const GROUPS = {
  application: {
    label: 'Application',
    properties: ['appBack', 'docBack', 'docBorder']
  },
  buttons: {
    label: 'Buttons',
    properties: [
      'buttonsBack', 'buttonsText', 'buttonsBorder',
      'buttonsBorderStyle', 'buttonsBorderSize',
      'buttonsHoverBack', 'buttonsHoverText',
      'buttonsSelectedBack', 'buttonsSelectedText'
    ]
  },
  calendarHeader: {
    label: 'Calendar Header',
    properties: [
      'calHeaderBack', 'calHeaderBorder', 'calHeaderDivider',
      'calHeaderText', 'calHeaderHoverBack', 'calHeaderHoverText'
    ]
  },
  calendarDOW: {
    label: 'Calendar Day-of-Week',
    properties: ['calDOWBack', 'calDOWBorder', 'calDOWText']
  },
  calendarDays: {
    label: 'Calendar Days',
    properties: [
      'calDaysBack', 'calDaysBorder', 'calDaysText',
      'calDaysHoverBack', 'calDaysHoverText',
      'calDaysSelectedBack', 'calDaysSelectedText',
      'calDaysHighlightedBack', 'calDaysHighlightedText'
    ]
  },
  tabs: {
    label: 'Panel Tabs',
    properties: [
      'tabBack', 'tabBorder', 'tabDivider', 'tabText',
      'tabHoverBack', 'tabHoverText',
      'tabSelectedBack', 'tabSelectedText'
    ]
  },
  tasks: {
    label: 'Tasks Panel',
    properties: [
      'tasksBack', 'tasksBorder', 'tasksText',
      'tasksSelectedBack' //, 'tasksSelectedText' // Not currently used by CalendarNotes
    ]
  },
  treeView: {
    label: 'Document Tree',
    properties: [
      'tvBack', 'tvBorder', 'tvText',
      'tvHoverBack', 'tvHoverText',
      'tvSelectedBack', 'tvSelectedText',
      'tvNavBack', 'tvNavHover'
    ]
  },
  search: {
    label: 'Search',
    properties: [
      'searchBack', 'searchBorder', 'searchText',
      'foundBack', 'foundBorder', 'foundText',
      'foundHoverBack', 'foundHoverText'
    ]
  },
  notesHeader: {
    label: 'Notes Header',
    properties: ['notesHeaderBack', 'notesHeaderBorder', 'notesHeaderText']
  },
  notesEditor: {
    label: 'Notes Editor',
    properties: [
      'notesBack', 'notesBorder', 'notesText',
      'notesHighlightText',
      'notesSelectedBack' //, 'notesSelectedText' // Not currently used by CalendarNotes
    ]
  },
  pages: {
    label: 'Pages Sidebar',
    properties: [
      'pagesBack', 'pagesBorder',
      'pageBack', 'pageBorder', 'pageText',
      'pageHoverBack', 'pageHoverText',
      'pageSelectedBack', /* 'pageSelectedText', // Not currently used by CalendarNotes */ 'pageSelectedBorder'
    ]
  },
  list: {
    label: 'List Views',
    properties: ['listBack', 'listBorder']
  },
  settings: {
    label: 'Settings Dialog',
    properties: ['settingsBack', 'settingsText', 'invertSettingsIcon']
  },
  meta: {
    label: 'Theme Info',
    properties: ['name']
  }
};

export const ThemeSchema = {
  getGroup(name) {
    return GROUPS[name] || null;
  },

  getAllGroups() {
    return GROUPS;
  },

  getGroupNames() {
    return Object.keys(GROUPS);
  },

  getPropertyType(propName) {
    return PROPERTY_TYPES[propName] || PropType.COLOR;
  },

  getAllPropertyNames() {
    return Object.keys(DEFAULT_THEME);
  }
};
