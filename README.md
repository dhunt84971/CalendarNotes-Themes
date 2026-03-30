# Calendar Notes Themes

A visual theme editor for the [Calendar Notes](https://github.com/dhunt84971/CalendarNotes) application. Calendar Notes Themes allows you to create, edit, and preview theme files that control the look and feel of Calendar Notes.

## Features

- **Live Preview** — A faithful representation of the Calendar Notes interface that updates as you edit theme colors
- **Interactive Selection** — Click on any part of the preview to select it and reveal its associated style properties
- **Color Picker** — Edit colors using a visual color palette or by entering hex codes / CSS color names directly
- **Full Theme Support** — Edit all 80+ theme properties including colors, border styles, and the icon inversion flag
- **New & Open** — Create a new theme from the Default template or open any existing Calendar Notes theme file
- **Save & Save As** — Save edits to the current file or export to a new file
- **Unsaved Changes Protection** — Prompted to save before closing or switching themes if changes exist
- **Cross-Platform** — Runs on Linux and Windows

## Usage

1. Launch the application
2. Create a new theme (**File > New Theme**) or open an existing `.json` theme file (**File > Open Theme**)
3. Click on areas of the preview to select UI components
4. Edit the displayed style properties using the color picker or text input
5. Click **Apply** to update the preview with your changes
6. Click **Save** or **Save As** to write the theme file to disk

Theme files are standard JSON and can be placed in the Calendar Notes themes directory for immediate use.

## Developer Guide

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm (included with Node.js)
- Git

### Dependencies

| Dependency | Type | Purpose |
|---|---|---|
| @simonwep/pickr | Runtime | Color picker widget |
| electron | Dev | Desktop application framework |
| electron-builder | Dev | Packaging and distribution |
| electron-vite | Dev | Build tooling (Vite + Electron integration) |
| vite | Dev | Frontend build tool |
| vitest | Dev | Unit testing framework |
| eslint | Dev | Code linting |

### Project Setup

```bash
# Clone the repository
git clone https://github.com/dhunt84971/CalendarNotes-Themes.git
cd CalendarNotes-Themes

# Install dependencies
npm install
```

### Development

```bash
# Start the application in development mode with hot-reload
npm run dev
```

### Building

```bash
# Build the application (compile source)
npm run build
```

### Packaging

Packaging uses `electron-builder`, the same toolchain as Calendar Notes.

```bash
# Build and package for the current platform
npm run dist

# Build and package for Linux (.deb)
npm run dist:linux

# Build and package for Windows (NSIS installer)
npm run dist:win
```

Built packages are output to the `release/` directory.

#### Linux Package
- Format: `.deb` (Debian/Ubuntu)
- Category: Office / Utility
- Executable: `calendar-notes-themes`

#### Windows Package
- Format: NSIS installer (x64)
- Creates desktop and Start Menu shortcuts
- Allows custom installation directory

### Project Structure

```
CalendarNotes-Themes/
├── src/
│   ├── main/           # Electron main process
│   ├── preload/        # Preload scripts (context bridge)
│   └── renderer/       # UI (HTML, CSS, JavaScript)
├── build/              # Icons and build resources
├── electron.vite.config.js
├── package.json
├── PRD.md              # Product Requirements Document
└── README.md
```

## License

MIT
