import { ThemeSchema } from './ThemeSchema.js';

export class ThemePreview {
  constructor(container, onSelect) {
    this.container = container;
    this.onSelect = onSelect;
    this.previewFrame = null;
    this.selectedGroup = null;
  }

  render() {
    this.previewFrame = document.createElement('div');
    this.previewFrame.className = 'preview-frame';
    this.previewFrame.innerHTML = this._buildPreviewHTML();
    this.container.innerHTML = '';
    this.container.appendChild(this.previewFrame);

    // Wire up click-to-select
    this.previewFrame.addEventListener('click', (e) => {
      const target = e.target.closest('[data-theme-group]');
      if (!target) return;

      const groupName = target.dataset.themeGroup;

      // Remove previous selection
      const prev = this.previewFrame.querySelector('.selected');
      if (prev) prev.classList.remove('selected');

      // Select new
      target.classList.add('selected');
      this.selectedGroup = groupName;

      if (this.onSelect) this.onSelect(groupName);
    });
  }

  applyTheme(theme) {
    if (!this.previewFrame || !theme) return;

    for (const [key, value] of Object.entries(theme)) {
      if (key === 'name' || key === 'invertSettingsIcon') continue;
      this.previewFrame.style.setProperty(`--${key}`, value);
    }

    // Handle invertSettingsIcon
    this.previewFrame.classList.toggle('theme-inverted', !!theme.invertSettingsIcon);

    // Update theme name display
    const nameEl = this.previewFrame.querySelector('#preview-theme-name');
    if (nameEl) nameEl.textContent = theme.name || 'Unnamed';
  }

  _buildPreviewHTML() {
    return `
      <div class="cn-app" style="background: var(--appBack); padding: 5px; display: flex; gap: 0; font: 13px/1.5 'Helvetica Neue', Helvetica, Arial, sans-serif; height: 460px; width: 720px; border-radius: 6px; overflow: hidden;">

        <!-- Sidebar -->
        <div style="width: 230px; min-width: 180px; display: flex; flex-direction: column;">

          <!-- Calendar Header -->
          <div data-theme-group="calendarHeader" style="background: var(--calHeaderBack); color: var(--calHeaderText); height: 34px; display: flex; align-items: stretch; border-top-left-radius: 5px; border-top-right-radius: 5px; border-bottom: 2px solid var(--calHeaderBorder); font-weight: bold; text-transform: uppercase; cursor: pointer;">
            <span style="width: 24px; display: flex; align-items: center; justify-content: center; border-right: 1px solid var(--calHeaderDivider);">&lt;</span>
            <span style="flex: 1; display: flex; align-items: center; justify-content: center; letter-spacing: 1px;">March 2026</span>
            <span style="width: 24px; display: flex; align-items: center; justify-content: center; border-left: 1px solid var(--calHeaderDivider); background: var(--calHeaderHoverBack); color: var(--calHeaderHoverText);">&gt;</span>
            <span style="width: 24px; display: flex; align-items: center; justify-content: center; border-left: 1px solid var(--calHeaderDivider);">&gt;&gt;</span>
          </div>

          <!-- Calendar DOW -->
          <div data-theme-group="calendarDOW" style="display: grid; grid-template-columns: repeat(7, 1fr); background: var(--calDOWBack); border-left: 1px solid var(--calDOWBorder); border-top: none; cursor: pointer;">
            ${['sun','mon','tue','wed','thu','fri','sat'].map(d =>
              `<span style="height: 26px; line-height: 26px; text-align: center; font-size: 90%; color: var(--calDOWText); border-right: 1px solid var(--calDOWBorder); border-bottom: 1px solid var(--calDOWBorder);">${d}</span>`
            ).join('')}
          </div>

          <!-- Calendar Days -->
          <div data-theme-group="calendarDays" style="display: grid; grid-template-columns: repeat(7, 1fr); background: var(--calDaysBack); border-left: 1px solid var(--calDaysBorder); border-top: none; border-bottom: 3px solid var(--calDaysBorder); box-shadow: 0 2px 4px rgba(0,0,0,0.3); cursor: pointer;">
            ${this._buildCalendarDays()}
          </div>

          <!-- Panel Tabs -->
          <div data-theme-group="tabs" style="display: flex; padding-top: 5px; cursor: pointer;">
            <span style="background: var(--tabSelectedBack); color: var(--tabSelectedText); padding: 5px; border-top-left-radius: 5px; border-top-right-radius: 5px; text-align: center; font-weight: bold; min-width: 50px; font-size: 11px;">TASKS</span>
            <span style="margin-left: 1px; background: var(--tabBack); color: var(--tabText); border: var(--buttonsBorderSize) var(--buttonsBorderStyle) var(--tabBorder); border-bottom: none; padding: 5px; border-top-left-radius: 5px; border-top-right-radius: 5px; text-align: center; font-weight: bold; min-width: 50px; font-size: 11px;">DOCS</span>
            <span style="margin-left: 1px; background: var(--tabBack); color: var(--tabText); border: var(--buttonsBorderSize) var(--buttonsBorderStyle) var(--tabBorder); border-bottom: none; padding: 5px; border-top-left-radius: 5px; border-top-right-radius: 5px; text-align: center; font-weight: bold; min-width: 50px; font-size: 11px;">SEARCH</span>
            <span style="flex: 1;"></span>
          </div>
          <div style="background: var(--tabDivider); min-height: 3px;"></div>

          <!-- Tasks Panel -->
          <div data-theme-group="tasks" style="flex: 1; display: flex; flex-direction: column; overflow: hidden; cursor: pointer;">
            <div style="flex: 1; background: var(--tasksBack); color: var(--tasksText); border: 1px solid var(--tasksBorder); padding: 3px; font-size: 12px; overflow: hidden;">
              <div>&#9744; Review theme changes</div>
              <div>&#9745; Create new theme file</div>
              <div>&#9744; Test dark mode</div>
              <div style="background: var(--tasksSelectedBack); color: #fff; /* color: var(--tasksSelectedText); // Not currently used by CalendarNotes - browser default is white */">&#9744; Update colors</div>
            </div>
          </div>
        </div>

        <!-- Splitter -->
        <div style="min-width: 5px; background: var(--appBack); cursor: ew-resize;"></div>

        <!-- Main Content -->
        <div style="flex: 1; display: flex; flex-direction: column; min-width: 0;">

          <!-- Notes Header -->
          <div data-theme-group="notesHeader" style="display: flex; align-items: center; background: var(--notesHeaderBack); color: var(--notesHeaderText); text-align: center; font-weight: bold; padding: 0 5px; min-height: 23px; border-bottom: 2px solid var(--notesHeaderBorder); cursor: pointer;">
            <span style="flex: 1; text-align: center;">March 30, 2026</span>
          </div>

          <!-- Notes Editor -->
          <div data-theme-group="notesEditor" style="flex: 1; display: flex; flex-direction: column; background: var(--notesBack); border: 1px solid var(--notesBorder); overflow: hidden; cursor: pointer;">
            <div style="flex: 1; padding: 8px; color: var(--notesText); font-size: 13px;">
              <div style="font-weight: bold; margin-bottom: 4px;">Meeting Notes</div>
              <div>Discussed the new theme editor application.</div>
              <div style="margin-top: 8px;">Key points:</div>
              <div style="color: var(--notesHighlightText); margin-left: 8px;">&#8226; Color picker integration</div>
              <div style="color: var(--notesHighlightText); margin-left: 8px;">&#8226; Live preview updates</div>
              <div style="margin-top: 8px;"><span style="background: var(--notesSelectedBack); color: #fff; /* color: var(--notesSelectedText); // Not currently used by CalendarNotes - browser default is white */">selected text</span></div>
            </div>
          </div>

          <!-- Buttons Row -->
          <div data-theme-group="buttons" style="display: flex; gap: 5px; padding: 5px 0; cursor: pointer;">
            <span style="background: var(--buttonsBack); color: var(--buttonsText); padding: 5px 10px; border-radius: 5px; font-weight: bold; border: var(--buttonsBorderSize) var(--buttonsBorderStyle) var(--buttonsBorder); font-size: 12px;">EDIT</span>
            <span style="background: var(--buttonsHoverBack); color: var(--buttonsHoverText); padding: 5px 10px; border-radius: 5px; font-weight: bold; border: var(--buttonsBorderSize) var(--buttonsBorderStyle) var(--buttonsBorder); font-size: 12px;">SAVE</span>
            <span style="background: var(--buttonsSelectedBack); color: var(--buttonsSelectedText); padding: 5px 10px; border-radius: 5px; font-weight: bold; border: var(--buttonsBorderSize) var(--buttonsBorderStyle) var(--buttonsBorder); font-size: 12px;">VIEW</span>
          </div>
        </div>

        <!-- Splitter -->
        <div style="min-width: 5px; background: var(--appBack); cursor: ew-resize;"></div>

        <!-- Pages Sidebar -->
        <div data-theme-group="pages" style="width: 120px; display: flex; flex-direction: column; background: var(--pagesBack); border: 1px solid var(--pagesBorder); cursor: pointer;">
          <div style="padding: 5px;">
            <span style="background: var(--buttonsBack); color: var(--buttonsText); border: 1px solid var(--buttonsBorder); padding: 3px 8px; border-radius: 5px; font-weight: bold; font-size: 11px; display: block; text-align: center;">+ ADD PAGE</span>
          </div>
          <div style="flex: 1; overflow: hidden; padding: 0 5px;">
            <div style="background: var(--pageSelectedBack); color: #fff; /* color: var(--pageSelectedText); // Not currently used by CalendarNotes - browser default is white */ padding: 4px 8px; margin: 2px 0; border-radius: 5px; border: 1px solid var(--pageSelectedBorder); font-weight: bold; font-size: 12px;">Page 1</div>
            <div style="background: var(--pageHoverBack); color: var(--pageHoverText); padding: 4px 8px; margin: 2px 0; border-radius: 5px; border: 1px solid var(--pageBorder); font-weight: bold; font-size: 12px;">Page 2</div>
            <div style="background: var(--pageBack); color: var(--pageText); padding: 4px 8px; margin: 2px 0; border-radius: 5px; border: 1px solid var(--pageBorder); font-weight: bold; font-size: 12px;">Page 3</div>
          </div>
        </div>
      </div>

      <!-- Additional Preview Sections (below main preview) -->
      <div style="display: flex; gap: 12px; margin-top: 12px; width: 720px;">

        <!-- Documents Tree -->
        <div data-theme-group="treeView" style="flex: 1; border: 1px solid var(--docBorder); background: var(--docBack); border-radius: 5px; overflow: hidden; cursor: pointer;">
          <div style="font-size: 11px; font-weight: bold; padding: 4px 8px; background: var(--tabBack); color: var(--tabText); border-bottom: 1px solid var(--tabBorder);">Documents Tree</div>
          <div style="padding: 4px;">
            <div style="background: var(--tvSelectedBack); color: var(--tvSelectedText); padding: 3px 8px; border-radius: 3px; font-size: 12px; margin: 1px 0;">&#9654; Work Notes</div>
            <div style="background: var(--tvBack); color: var(--tvText); padding: 3px 8px 3px 24px; border: 1px solid var(--tvBorder); border-radius: 3px; font-size: 12px; margin: 1px 0;">Meeting Notes</div>
            <div style="background: var(--tvBack); color: var(--tvText); padding: 3px 8px 3px 24px; border: 1px solid var(--tvBorder); border-radius: 3px; font-size: 12px; margin: 1px 0;">Project Plan</div>
            <div style="background: var(--tvBack); color: var(--tvText); padding: 3px 8px; border: 1px solid var(--tvBorder); border-radius: 3px; font-size: 12px; margin: 1px 0;">&#9654; Personal</div>
          </div>
        </div>

        <!-- Search Panel -->
        <div data-theme-group="search" style="flex: 1; border: 1px solid var(--listBorder); background: var(--listBack); border-radius: 5px; overflow: hidden; cursor: pointer;">
          <div style="padding: 5px; display: flex; gap: 5px;">
            <input type="text" value="theme" readonly style="flex: 1; background: var(--searchBack); color: var(--searchText); border: 1px solid var(--searchBorder); border-radius: 5px; padding: 4px 8px; font-size: 12px;">
            <span style="background: var(--buttonsBack); color: var(--buttonsText); border: 1px solid var(--buttonsBorder); padding: 4px 8px; border-radius: 5px; font-weight: bold; font-size: 11px;">GO</span>
          </div>
          <div style="padding: 0 5px 5px;">
            <div style="background: var(--foundBack); color: var(--foundText); padding: 4px 8px; border: 1px solid var(--foundBorder); border-radius: 5px; font-weight: bold; font-size: 12px; margin: 2px 0;">Mar 28 - Theme design</div>
            <div style="background: var(--foundHoverBack); color: var(--foundHoverText); padding: 4px 8px; border: 1px solid var(--foundBorder); border-radius: 5px; font-weight: bold; font-size: 12px; margin: 2px 0;">Mar 25 - Theme colors</div>
            <div style="background: var(--foundBack); color: var(--foundText); padding: 4px 8px; border: 1px solid var(--foundBorder); border-radius: 5px; font-weight: bold; font-size: 12px; margin: 2px 0;">Mar 20 - Theme review</div>
          </div>
        </div>

        <!-- Settings & List -->
        <div style="flex: 1; display: flex; flex-direction: column; gap: 8px;">
          <div data-theme-group="settings" style="background: var(--settingsBack); color: var(--settingsText); border-radius: 5px; padding: 8px; cursor: pointer;">
            <div style="font-weight: bold; font-size: 12px; margin-bottom: 4px;">Settings Dialog</div>
            <div style="font-size: 11px;">Theme: Default</div>
            <div style="font-size: 11px;">Font Size: 13px</div>
          </div>
          <div data-theme-group="list" style="background: var(--listBack); border: 1px solid var(--listBorder); border-radius: 5px; padding: 8px; cursor: pointer; flex: 1;">
            <div style="font-size: 12px; font-weight: bold; margin-bottom: 4px; color: var(--notesText);">List View</div>
            <div style="font-size: 11px; color: var(--notesText);">Item 1</div>
            <div style="font-size: 11px; color: var(--notesText);">Item 2</div>
          </div>
          <div data-theme-group="application" style="background: var(--docBack); border: 1px solid var(--docBorder); border-radius: 5px; padding: 8px; cursor: pointer;">
            <div style="font-size: 12px; font-weight: bold; margin-bottom: 2px; color: var(--notesText);">App Background</div>
            <div style="font-size: 11px; color: var(--notesText);">appBack / docBack</div>
          </div>
        </div>
      </div>

      <!-- Meta row -->
      <div data-theme-group="meta" style="margin-top: 8px; width: 720px; padding: 6px 12px; background: #2a2a2a; border-radius: 5px; cursor: pointer;">
        <span style="color: #888; font-size: 12px;">Theme Name: </span>
        <span style="color: #ddd; font-size: 12px; font-weight: bold;" id="preview-theme-name">Default</span>
      </div>
    `;
  }

  _buildCalendarDays() {
    // March 2026 starts on Sunday
    const days = [];
    // Previous month trailing days (Feb ends on Sat, so no trailing)
    for (let i = 1; i <= 31; i++) {
      let style = `text-align: center; font-size: 12px; padding: 2px; border-right: 1px solid var(--calDaysBorder); border-bottom: 1px solid var(--calDaysBorder);`;
      let extraStyle = '';

      if (i === 15) {
        // Selected day
        extraStyle = `background: var(--calDaysSelectedBack); color: var(--calDaysSelectedText);`;
      } else if (i === 10 || i === 20 || i === 25) {
        // Days with notes (highlighted)
        extraStyle = `background: var(--calDaysHighlightedBack); color: var(--calDaysHighlightedText);`;
      } else if (i === 12) {
        // Hovered day
        extraStyle = `background: var(--calDaysHoverBack); color: var(--calDaysHoverText);`;
      } else {
        extraStyle = `background: var(--calDaysBack); color: var(--calDaysText);`;
      }
      days.push(`<span style="${style} ${extraStyle}">${i}</span>`);
    }
    // Trailing empty cells to fill 5 rows
    for (let i = 0; i < 4; i++) {
      days.push(`<span style="text-align: center; font-size: 12px; padding: 2px; color: #ccc; border-right: 1px solid var(--calDaysBorder); border-bottom: 1px solid var(--calDaysBorder);"></span>`);
    }
    return days.join('');
  }
}
