# Product Requirements Document: Calendar Notes Themes

## 1. Overview

**Application Name:** Calendar Notes Themes
**Type:** Desktop application (Electron + Node.js)
**Platforms:** Linux, Windows
**Purpose:** Create and edit theme files for the [Calendar Notes](https://github.com/dhunt84971/CalendarNotes) application
**Author:** Dave Hunt

Calendar Notes Themes is a visual theme editor that provides a live preview of the Calendar Notes application interface, allowing users to interactively select UI components and modify their style properties. Themes are saved as JSON files compatible with the Calendar Notes theme system.

## 2. Goals

- Provide an intuitive visual editor for creating and modifying Calendar Notes themes
- Display a faithful preview of the Calendar Notes UI that updates in real-time
- Allow interactive selection of UI components to reveal and edit their associated style properties
- Support all 80+ theme properties used by Calendar Notes
- Produce theme JSON files fully compatible with the Calendar Notes theme system
- Target both Linux (.deb) and Windows (NSIS installer) platforms using the same packaging approach as Calendar Notes

## 3. Future Integration

This application will initially be a standalone application. A future phase will integrate it into the Calendar Notes application, allowing users to launch the theme editor directly from within Calendar Notes.

## 4. Functional Requirements

### 4.1 Theme File Management

#### 4.1.1 Create New Theme
- The user can create a new theme file
- New themes use the **Default** theme as the starting point:
  ```json
  {
    "name": "Default",
    "invertSettingsIcon": false,
    "appBack": "#e0e0e0",
    "buttonsBack": "#a74c00",
    "buttonsBorder": "#fff",
    "buttonsBorderStyle": "none",
    "buttonsBorderSize": "0px",
    "buttonsHoverBack": "#d96200",
    "buttonsHoverText": "#fff",
    "buttonsSelectedBack": "#d96200",
    "buttonsSelectedText": "#fff",
    "buttonsText": "#fff",
    "calDaysBack": "#fff",
    "calDaysBorder": "#a74c00",
    "calDaysHoverBack": "#d96200",
    "calDaysHoverText": "#fff",
    "calDaysSelectedBack": "#d96200",
    "calDaysSelectedText": "#fff",
    "calDaysHighlightedBack": "#FF7A0D",
    "calDaysHighlightedText": "#fff",
    "calDaysText": "#000",
    "calDOWBack": "#fff",
    "calDOWBorder": "#a74c00",
    "calDOWText": "#000",
    "calHeaderBack": "#ff7400",
    "calHeaderBorder": "#ff7400",
    "calHeaderDivider": "#ffb170",
    "calHeaderHoverBack": "#d96200",
    "calHeaderHoverText": "#fff",
    "calHeaderText": "#fff",
    "docBack": "#e0e0e0",
    "docBorder": "none",
    "foundBack": "#ffcda4",
    "foundBorder": "lightgray",
    "foundHoverBack": "#d96200",
    "foundHoverText": "#fff",
    "foundText": "#000",
    "listBack": "#fff",
    "listBorder": "#ff7400",
    "notesBack": "#fff",
    "notesBorder": "#ff7400",
    "notesHeaderBack": "#ff7400",
    "notesHeaderBorder": "#ff7400",
    "notesHeaderText": "#fff",
    "notesSelectedBack": "blue",
    "notesSelectedText": "#000",
    "notesText": "#000",
    "notesHighlightText": "#ffcda4",
    "pagesBack": "#fff",
    "pagesBorder": "#ff7400",
    "pageBack": "#ffcda4",
    "pageBorder": "lightgray",
    "pageText": "#000",
    "pageHoverBack": "#d96200",
    "pageHoverText": "#fff",
    "pageSelectedBack": "#d96200",
    "pageSelectedText": "#fff",
    "pageSelectedBorder": "lightgray",
    "searchBack": "#fff",
    "searchBorder": "lightgray",
    "searchText": "#000",
    "settingsBack": "#ffcda4",
    "settingsText": "#000",
    "tabBack": "#a74c00",
    "tabBorder": "#00ffea",
    "tabDivider": "#ff7400",
    "tabHoverBack": "#d96200",
    "tabHoverText": "#fff",
    "tabSelectedBack": "#ff7400",
    "tabSelectedText": "#fff",
    "tabText": "#fff",
    "tasksBack": "#ffcda4",
    "tasksBorder": "#ff7400",
    "tasksSelectedBack": "blue",
    "tasksSelectedText": "#000",
    "tasksText": "#000",
    "tvBack": "#ffcda4",
    "tvBorder": "lightgray",
    "tvHoverBack": "#d96200",
    "tvHoverText": "#fff",
    "tvNavBack": "#a74c00",
    "tvNavHover": "#d96200",
    "tvSelectedBack": "#d96200",
    "tvSelectedText": "#fff",
    "tvText": "#000"
  }
  ```
- The user is prompted to provide a name for the new theme

#### 4.1.2 Open Existing Theme
- The user can open an existing `.json` theme file via a file dialog
- The loaded theme is validated to ensure it contains the expected properties
- Missing properties are filled in from the Default theme values
- The preview updates to reflect the loaded theme

#### 4.1.3 Save Theme
- **Save:** Overwrites the currently opened theme file with the current theme state
- **Save As:** Saves the current theme state to a new file chosen via a save dialog
- Changes are **not** written to disk until the user explicitly saves
- Theme files are saved as pretty-printed JSON (2-space indentation)

### 4.2 Application Preview

#### 4.2.1 Preview Layout
The preview displays a faithful representation of the Calendar Notes UI with the following component hierarchy:

```
Application Container (appBack)
├── Sidebar
│   ├── Calendar Header (calHeaderBack, calHeaderBorder, calHeaderText)
│   │   ├── Navigation Arrows (calHeaderHoverBack, calHeaderHoverText)
│   │   └── Month/Year Label
│   ├── Day-of-Week Header (calDOWBack, calDOWBorder, calDOWText)
│   ├── Calendar Grid (calDaysBack, calDaysBorder, calDaysText)
│   │   ├── Normal Days
│   │   ├── Hovered Day (calDaysHoverBack, calDaysHoverText)
│   │   ├── Selected Day (calDaysSelectedBack, calDaysSelectedText)
│   │   └── Highlighted Day (calDaysHighlightedBack, calDaysHighlightedText)
│   ├── Panel Tabs (tabBack, tabBorder, tabDivider, tabText)
│   │   ├── Normal Tab
│   │   ├── Hovered Tab (tabHoverBack, tabHoverText)
│   │   └── Selected Tab (tabSelectedBack, tabSelectedText)
│   └── Panel Content Area
│       ├── Tasks Panel (tasksBack, tasksBorder, tasksText)
│       │   ├── Selected Task (tasksSelectedBack, tasksSelectedText)
│       ├── Documents Panel (docBack, docBorder)
│       │   ├── Tree View (tvBack, tvBorder, tvText)
│       │   ├── Tree Item Hover (tvHoverBack, tvHoverText)
│       │   ├── Tree Item Selected (tvSelectedBack, tvSelectedText)
│       │   └── Tree Navigation (tvNavBack, tvNavHover)
│       └── Search Panel
│           ├── Search Input (searchBack, searchBorder, searchText)
│           └── Search Results (foundBack, foundBorder, foundText)
│               ├── Result Hover (foundHoverBack, foundHoverText)
├── Notes Editor Area
│   ├── Notes Header (notesHeaderBack, notesHeaderBorder, notesHeaderText)
│   ├── Notes Content (notesBack, notesBorder, notesText)
│   ├── Notes Highlights (notesHighlightText)
│   └── Selected Note Text (notesSelectedBack, notesSelectedText)
├── Pages Sidebar
│   ├── Pages Container (pagesBack, pagesBorder)
│   ├── Page Item (pageBack, pageBorder, pageText)
│   ├── Page Hover (pageHoverBack, pageHoverText)
│   └── Page Selected (pageSelectedBack, pageSelectedText, pageSelectedBorder)
├── Buttons (buttonsBack, buttonsBorder, buttonsBorderStyle, buttonsBorderSize, buttonsText)
│   ├── Button Hover (buttonsHoverBack, buttonsHoverText)
│   └── Button Selected (buttonsSelectedBack, buttonsSelectedText)
├── List Views (listBack, listBorder)
└── Settings Dialog (settingsBack, settingsText)
```

#### 4.2.2 Preview Interactivity
- The preview shows sample data (dates, text, task items, document tree, search results) to provide a realistic representation
- All panels (Tasks, Documents, Search) are shown simultaneously or via tab switching to allow editing of all component styles
- Hover and selected states are demonstrated via sample elements within each component area

### 4.3 Interactive Style Editing

#### 4.3.1 Component Selection
- Clicking on any area of the preview selects the corresponding UI component
- The selected component is visually highlighted (e.g., with a selection indicator or outline)
- The associated theme property names and current values are displayed in the **Style Editor Panel**

#### 4.3.2 Style Editor Panel
- Displays the variable name(s) for the selected component (e.g., `calHeaderBack`, `calHeaderText`)
- Displays the current value for each variable
- Groups related properties together (e.g., all calendar header properties when the calendar header is clicked)

#### 4.3.3 Color Editing
For properties that specify a color value:
- **Color Palette Selector:** A color picker dialog/widget for visual color selection
- **Direct Input:** A text field for entering color codes (hex, e.g., `#ff7400`) or CSS color names (e.g., `lightgray`)
- Both methods update the displayed value in real-time

#### 4.3.4 Non-Color Properties
Some theme properties are not colors:
- **buttonsBorderStyle:** Accepts CSS border-style values (e.g., `none`, `solid`)
- **buttonsBorderSize:** Accepts CSS size values (e.g., `0px`, `1px`, `2px`)
- **invertSettingsIcon:** Boolean toggle (true/false)
- These properties use appropriate input controls (dropdowns or text fields)

#### 4.3.5 Apply and Cancel
- **Apply Button:** Applies the edited values to the preview, updating the displayed theme in real-time. The edited values are stored in memory but not saved to disk.
- **Cancel Button:** Reverts any unapplied changes back to the last applied state.

### 4.4 Menu and Toolbar

#### 4.4.1 File Menu
- **New Theme** — Create a new theme from the Default template
- **Open Theme** — Open an existing theme JSON file
- **Save** — Save current theme to the opened file
- **Save As** — Save current theme to a new file
- **Exit** — Close the application (prompt to save if unsaved changes exist)

#### 4.4.2 Unsaved Changes Protection
- The application tracks whether modifications have been made since the last save
- If the user attempts to close the application or create/open a new theme with unsaved changes, a confirmation dialog is displayed

## 5. Theme Property Reference

### 5.1 Property Groups

| Group | Properties | Description |
|-------|-----------|-------------|
| **Application** | `appBack`, `docBack` | Main app and document panel backgrounds |
| **Buttons** | `buttonsBack`, `buttonsBorder`, `buttonsBorderStyle`, `buttonsBorderSize`, `buttonsHoverBack`, `buttonsHoverText`, `buttonsSelectedBack`, `buttonsSelectedText`, `buttonsText` | All button states and borders |
| **Calendar Days** | `calDaysBack`, `calDaysBorder`, `calDaysHoverBack`, `calDaysHoverText`, `calDaysSelectedBack`, `calDaysSelectedText`, `calDaysHighlightedBack`, `calDaysHighlightedText`, `calDaysText` | Calendar day cells |
| **Calendar DOW** | `calDOWBack`, `calDOWBorder`, `calDOWText` | Day-of-week header row |
| **Calendar Header** | `calHeaderBack`, `calHeaderBorder`, `calHeaderDivider`, `calHeaderHoverBack`, `calHeaderHoverText`, `calHeaderText` | Month/year navigation header |
| **Documents** | `docBack`, `docBorder` | Document panel container |
| **Search Results** | `foundBack`, `foundBorder`, `foundHoverBack`, `foundHoverText`, `foundText` | Search result items |
| **List** | `listBack`, `listBorder` | Generic list views |
| **Notes Editor** | `notesBack`, `notesBorder`, `notesHeaderBack`, `notesHeaderBorder`, `notesHeaderText`, `notesSelectedBack`, `notesSelectedText`, `notesText`, `notesHighlightText` | Notes editing area |
| **Pages** | `pagesBack`, `pagesBorder`, `pageBack`, `pageBorder`, `pageText`, `pageHoverBack`, `pageHoverText`, `pageSelectedBack`, `pageSelectedText`, `pageSelectedBorder` | Document pages sidebar |
| **Search Input** | `searchBack`, `searchBorder`, `searchText` | Search input field |
| **Settings** | `settingsBack`, `settingsText` | Settings dialog |
| **Tabs** | `tabBack`, `tabBorder`, `tabDivider`, `tabHoverBack`, `tabHoverText`, `tabSelectedBack`, `tabSelectedText`, `tabText` | Panel tab bar |
| **Tasks** | `tasksBack`, `tasksBorder`, `tasksSelectedBack`, `tasksSelectedText`, `tasksText` | Tasks panel |
| **Tree View** | `tvBack`, `tvBorder`, `tvHoverBack`, `tvHoverText`, `tvNavBack`, `tvNavHover`, `tvSelectedBack`, `tvSelectedText`, `tvText` | Document tree view |
| **Meta** | `name`, `invertSettingsIcon` | Theme name and icon inversion flag |

## 6. Non-Functional Requirements

### 6.1 Technology Stack
- **Runtime:** Node.js with Electron
- **Build Tool:** electron-vite (matching Calendar Notes)
- **Module System:** ESM (`"type": "module"`)
- **Packaging:** electron-builder

### 6.2 Platform Support
- **Linux:** `.deb` package (Debian/Ubuntu)
- **Windows:** NSIS installer (x64)

### 6.3 Packaging Configuration
Follows the same packaging pattern as Calendar Notes:
- Linux: `.deb` target, Office/Utility category
- Windows: NSIS installer with custom install directory, desktop and Start Menu shortcuts
- Build scripts: `dist`, `dist:win`, `dist:linux`

### 6.4 Compatibility
- Theme files produced must be fully compatible with Calendar Notes v2.3.0+ theme system
- Theme JSON files use 2-space indentation for readability

### 6.5 User Experience
- The preview should be visually accurate to the actual Calendar Notes interface
- Color changes should be reflected in the preview immediately after clicking Apply
- The application should be responsive and not freeze during color picker operations

## 7. UI Wireframe (Conceptual Layout)

```
┌──────────────────────────────────────────────────────────────────────┐
│  File  [New] [Open] [Save] [Save As]                                │
├──────────────────────────────────────┬───────────────────────────────┤
│                                      │  Style Editor                 │
│                                      │                               │
│      Calendar Notes Preview          │  Selected: Calendar Header    │
│                                      │                               │
│  ┌────────────────┬────────────┐     │  calHeaderBack:  [#ff7400] 🎨│
│  │  ◄  March 2026 ►           │     │  calHeaderText:  [#fff   ] 🎨│
│  │  S  M  T  W  T  F  S      │     │  calHeaderBorder:[#ff7400] 🎨│
│  │  1  2  3  4  5  6  7      │     │  calHeaderDivider:[#ffb170]🎨│
│  │  8  9  10 ...              │     │  calHeaderHoverBack:[#d962] 🎨│
│  │                            │     │  calHeaderHoverText:[#fff ] 🎨│
│  │ [Tasks][Docs][Search]      │     │                               │
│  │ ┌────────────────────┐     │     │                               │
│  │ │ Task content...    │     │     │                               │
│  │ └────────────────────┘     │     │                               │
│  ├────────────────┴────┐      │     │                               │
│  │ Notes Editor Area   │      │     │  [Apply]  [Cancel]            │
│  │                     │      │     │                               │
│  └─────────────────────┘      │     │                               │
│                                      │                               │
├──────────────────────────────────────┴───────────────────────────────┤
│  Theme: MyCustomTheme.json                    Modified: Yes          │
└──────────────────────────────────────────────────────────────────────┘
```

## 8. Acceptance Criteria

1. User can create a new theme starting from the Default theme values
2. User can open an existing Calendar Notes theme JSON file
3. The preview accurately represents the Calendar Notes UI layout and applies theme colors
4. Clicking on a preview component reveals its associated theme properties in the editor
5. Color properties can be edited via a color picker or direct text input
6. Non-color properties (border style, border size, invertSettingsIcon) have appropriate input controls
7. Apply updates the preview; Cancel reverts unapplied changes
8. Save writes the theme to the current file; Save As prompts for a new file
9. Unsaved changes trigger a confirmation prompt before losing work
10. The application builds and packages for both Linux (.deb) and Windows (NSIS)
11. Generated theme files load correctly in Calendar Notes
