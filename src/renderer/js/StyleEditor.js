import Pickr from '@simonwep/pickr';
import '@simonwep/pickr/dist/themes/nano.min.css';
import { ThemeSchema, PropType } from './ThemeSchema.js';

export class StyleEditor {
  constructor(contentEl, actionsEl, applyBtn, cancelBtn, onApply, onCancel) {
    this.contentEl = contentEl;
    this.actionsEl = actionsEl;
    this.applyBtn = applyBtn;
    this.cancelBtn = cancelBtn;
    this.onApply = onApply;
    this.onCancel = onCancel;

    this.currentGroupName = null;
    this.currentGroup = null;
    this.originalValues = {};
    this.editedValues = {};
    this.pickrInstances = [];
    this.pickrPropMap = new WeakMap();

    this.applyBtn.addEventListener('click', () => this._handleApply());
    this.cancelBtn.addEventListener('click', () => this._handleCancel());
  }

  showGroup(groupName, group, values) {
    // Destroy existing pickr instances
    this._destroyPickrs();

    this.currentGroupName = groupName;
    this.currentGroup = group;
    this.originalValues = { ...values };
    this.editedValues = { ...values };

    this.contentEl.innerHTML = '';

    // Group title
    const title = document.createElement('div');
    title.className = 'property-group-title';
    title.textContent = group.label;
    this.contentEl.appendChild(title);

    // Property rows
    for (const prop of group.properties) {
      const type = ThemeSchema.getPropertyType(prop);
      const value = values[prop];
      const row = this._createPropertyRow(prop, type, value);
      this.contentEl.appendChild(row);
    }

    this.actionsEl.style.display = 'flex';
  }

  clear() {
    this._destroyPickrs();
    this.contentEl.innerHTML = '<p class="editor-placeholder">Click on a component in the preview to edit its styles.</p>';
    this.actionsEl.style.display = 'none';
    this.currentGroupName = null;
    this.currentGroup = null;
    this.originalValues = {};
    this.editedValues = {};
  }

  _createPropertyRow(prop, type, value) {
    const row = document.createElement('div');
    row.className = 'property-row';

    const label = document.createElement('span');
    label.className = 'property-label';
    label.textContent = prop;
    label.title = prop;
    row.appendChild(label);

    switch (type) {
      case PropType.BOOLEAN:
        row.appendChild(this._createCheckbox(prop, value));
        break;
      case PropType.BORDER_STYLE:
        row.appendChild(this._createSelect(prop, value, ['none', 'solid', 'dashed', 'dotted']));
        break;
      case PropType.BORDER_SIZE:
        row.appendChild(this._createSelect(prop, value, ['0px', '1px', '2px', '3px']));
        break;
      case PropType.TEXT:
        row.appendChild(this._createTextInput(prop, value));
        break;
      case PropType.COLOR:
      default:
        row.appendChild(this._createColorInput(prop, value));
        row.appendChild(this._createColorSwatch(prop, value));
        break;
    }

    return row;
  }

  _createTextInput(prop, value) {
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'property-input';
    input.value = value ?? '';
    input.addEventListener('input', () => {
      this.editedValues[prop] = input.value;
    });
    return input;
  }

  _createColorInput(prop, value) {
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'property-input';
    input.value = value ?? '';
    input.dataset.prop = prop;
    input.addEventListener('input', () => {
      this.editedValues[prop] = input.value;
      // Update swatch color
      const swatch = this.contentEl.querySelector(`.color-swatch[data-prop="${prop}"]`);
      if (swatch) {
        swatch.style.backgroundColor = input.value;
      }
    });
    return input;
  }

  _createColorSwatch(prop, value) {
    const swatch = document.createElement('div');
    swatch.className = 'color-swatch';
    swatch.dataset.prop = prop;
    swatch.style.backgroundColor = value || '#000';

    swatch.addEventListener('click', () => {
      this._openColorPicker(swatch, prop);
    });

    return swatch;
  }

  _openColorPicker(anchorEl, prop) {
    // Destroy any existing picker for this prop
    const existing = this.pickrInstances.find(p => this.pickrPropMap.get(p) === prop);
    if (existing) {
      existing.destroyAndRemove();
      this.pickrInstances = this.pickrInstances.filter(p => p !== existing);
    }

    const pickr = Pickr.create({
      el: anchorEl,
      theme: 'nano',
      default: this.editedValues[prop] || '#000000',
      position: 'left-middle',
      components: {
        preview: true,
        opacity: false,
        hue: true,
        interaction: {
          hex: true,
          input: true,
          save: true
        }
      }
    });

    this.pickrPropMap.set(pickr, prop);
    this.pickrInstances.push(pickr);

    pickr.on('save', (color) => {
      if (!color) return;
      const hex = color.toHEXA().toString();
      this.editedValues[prop] = hex;

      // Update text input
      const input = this.contentEl.querySelector(`.property-input[data-prop="${prop}"]`);
      if (input) input.value = hex;

      // Update swatch
      anchorEl.style.backgroundColor = hex;

      pickr.hide();
    });

    pickr.show();
  }

  _createSelect(prop, value, options) {
    const select = document.createElement('select');
    select.className = 'property-select';
    for (const opt of options) {
      const option = document.createElement('option');
      option.value = opt;
      option.textContent = opt;
      if (opt === value) option.selected = true;
      select.appendChild(option);
    }
    select.addEventListener('change', () => {
      this.editedValues[prop] = select.value;
    });
    return select;
  }

  _createCheckbox(prop, value) {
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.className = 'property-checkbox';
    cb.checked = !!value;
    cb.addEventListener('change', () => {
      this.editedValues[prop] = cb.checked;
    });
    return cb;
  }

  _handleApply() {
    if (this.onApply) {
      this.onApply({ ...this.editedValues });
    }
    // After apply, update original to match edited (so cancel reverts to last apply)
    this.originalValues = { ...this.editedValues };
  }

  _handleCancel() {
    // Revert edited values to original
    this.editedValues = { ...this.originalValues };

    // Re-render the group with original values
    if (this.currentGroupName && this.currentGroup) {
      this.showGroup(this.currentGroupName, this.currentGroup, this.originalValues);
    }

    if (this.onCancel) this.onCancel();
  }

  _destroyPickrs() {
    for (const pickr of this.pickrInstances) {
      try {
        pickr.destroyAndRemove();
      } catch (e) {
        // Ignore cleanup errors
      }
    }
    this.pickrInstances = [];
  }
}
