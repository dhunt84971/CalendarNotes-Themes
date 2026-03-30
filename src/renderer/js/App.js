import { ThemeSchema } from './ThemeSchema.js';
import { ThemeManager } from './ThemeManager.js';
import { ThemePreview } from './ThemePreview.js';
import { StyleEditor } from './StyleEditor.js';

class App {
  constructor() {
    this.themeManager = new ThemeManager();
    this.themePreview = null;
    this.styleEditor = null;
    this.currentFilePath = null;
  }

  async init() {
    // Create default theme on startup
    this.themeManager.createNewTheme();

    // Initialize preview
    this.themePreview = new ThemePreview(
      document.getElementById('preview-container'),
      (groupName) => this.onComponentSelected(groupName)
    );
    this.themePreview.render();
    this.themePreview.applyTheme(this.themeManager.currentTheme);

    // Initialize style editor
    this.styleEditor = new StyleEditor(
      document.getElementById('editor-content'),
      document.getElementById('editor-actions'),
      document.getElementById('btn-apply'),
      document.getElementById('btn-cancel'),
      (updatedProps) => this.onApplyChanges(updatedProps),
      () => this.onCancelChanges()
    );

    // Wire up menu events
    this.setupMenuHandlers();
    this.updateStatusBar();
  }

  setupMenuHandlers() {
    window.themeAPI.onMenuNewTheme(() => this.handleNew());
    window.themeAPI.onMenuOpenTheme(() => this.handleOpen());
    window.themeAPI.onMenuSave(() => this.handleSave());
    window.themeAPI.onMenuSaveAs(() => this.handleSaveAs());
    window.themeAPI.onBeforeClose(() => this.handleClose());
  }

  onComponentSelected(groupName) {
    const group = ThemeSchema.getGroup(groupName);
    if (!group) return;

    const values = {};
    for (const prop of group.properties) {
      values[prop] = this.themeManager.currentTheme[prop];
    }

    this.styleEditor.showGroup(groupName, group, values);
  }

  onApplyChanges(updatedProps) {
    for (const [key, value] of Object.entries(updatedProps)) {
      this.themeManager.currentTheme[key] = value;
    }
    this.themePreview.applyTheme(this.themeManager.currentTheme);
    this.updateStatusBar();
  }

  onCancelChanges() {
    // StyleEditor handles reverting its own UI
  }

  async handleNew() {
    if (this.themeManager.hasUnsavedChanges()) {
      const result = await this.promptSave();
      if (result === 2) return; // Cancel
      if (result === 0) await this.handleSave(); // Save
    }
    this.themeManager.createNewTheme();
    this.currentFilePath = null;
    this.themePreview.applyTheme(this.themeManager.currentTheme);
    this.styleEditor.clear();
    this.updateStatusBar();
  }

  async handleOpen() {
    if (this.themeManager.hasUnsavedChanges()) {
      const result = await this.promptSave();
      if (result === 2) return;
      if (result === 0) await this.handleSave();
    }
    const fileData = await window.themeAPI.openTheme();
    if (!fileData) return;

    if (!this.themeManager.validateTheme(fileData.content)) {
      alert('Invalid theme file: must be a JSON object with a valid "name" property and only known theme keys.');
      return;
    }

    this.themeManager.loadTheme(fileData.content);
    this.currentFilePath = fileData.filePath;
    this.themePreview.applyTheme(this.themeManager.currentTheme);
    this.styleEditor.clear();
    this.updateStatusBar();
  }

  async handleSave() {
    if (!this.currentFilePath) {
      return this.handleSaveAs();
    }
    const success = await window.themeAPI.saveTheme(this.currentFilePath, this.themeManager.currentTheme);
    if (success) {
      this.themeManager.markSaved();
      this.updateStatusBar();
    }
  }

  async handleSaveAs() {
    const filePath = await window.themeAPI.saveThemeAs(this.themeManager.currentTheme);
    if (filePath) {
      this.currentFilePath = filePath;
      this.themeManager.markSaved();
      this.updateStatusBar();
    }
  }

  async handleClose() {
    if (this.themeManager.hasUnsavedChanges()) {
      const result = await this.promptSave();
      if (result === 2) return; // Cancel - don't close
      if (result === 0) await this.handleSave(); // Save first
    }
    window.themeAPI.forceClose();
  }

  async promptSave() {
    return window.themeAPI.confirmSave('You have unsaved changes. What would you like to do?');
  }

  updateStatusBar() {
    const fileEl = document.getElementById('status-file');
    const modEl = document.getElementById('status-modified');

    fileEl.textContent = this.currentFilePath
      ? this.currentFilePath
      : 'New Theme (unsaved)';
    modEl.textContent = this.themeManager.hasUnsavedChanges() ? 'Modified' : '';
  }
}

// Boot
const app = new App();
app.init().catch((err) => {
  document.body.innerHTML = `<div style="padding:24px;color:#f44;font-family:monospace;">
    <h2>Failed to initialize application</h2>
    <pre>${err.message}\n${err.stack}</pre>
  </div>`;
});
