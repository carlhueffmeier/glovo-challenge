<template>
  <div
    class="container"
    @keydown="onKeydown($event)"
    role="combobox" 
    aria-expanded="false" 
    aria-haspopup="listbox" 
    aria-labelledby="autocomplete-0-label"
  >
    <label
      class="label"
      :for="`autocomplete-${autocompleteId}-input`"
      :id="`autocomplete-${autocompleteId}-label`"
    >
      <slot name="label" />
    </label>
    <div class="input-container" :class="{'input-container--has-selection': hasSelection}">
      <input
        class="text-input"
        :class="{'text-input--open': isOpen}"
        v-model="inputValue"
        @focus="toggleOpen(true)"
        ref="textInput"
        aria-autocomplete="list"
        :aria-labelledby="`autocomplete-${autocompleteId}-label`"
        autocomplete="off"
        :id="`autocomplete-${autocompleteId}-input`"
        :placeholder="placeholder"
      >
      <button
        v-if="hasSelection"
        class="controller-button"
        type="button"
        role="button"
        @click="clearSelection"
        aria-label="clear selection"
      >
        <XIcon />
      </button>
      <button
        v-else
        class="controller-button"
        type="button"
        role="button"
        @click="toggleOpen()"
        :aria-label="isOpen ? 'close menu' : 'open menu'"
        aria-haspopup="true"
      >
        <ArrowIcon :direction="isOpen ? 'up' : 'down'" />
      </button>
    </div>
    <div class="menu-container">
      <ul
        class="menu"
        v-if="isOpen"
        role="listbox"
        :aria-labelledby="`autocomplete-${autocompleteId}-label`"
        id="autocomplete-0-menu"
      >
        <li 
          class="menu-item"
          v-for="item in filteredItems"
          :key="itemToString(item)"
          @click="selectItem(item)"
          role="option"
        >
          {{itemToString(item)}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import shortid from 'shortid';
import ArrowIcon from './ArrowIcon';
import XIcon from './XIcon';

export default {
  name: 'Autocomplete',
  components: {
    ArrowIcon,
    XIcon
  },
  props: {
    itemToString: Function,
    items: Array,
    placeholder: {
      type: String,
      default: 'Search...'
    }
  },
  data() {
    return {
      inputValue: '',
      selectedItem: null,
      isOpen: false,
      autocompleteId: shortid.generate()
    }
  },
  computed: {
    hasSelection() {
      return this.selectedItem !== null;
    },
    filteredItems() {
      const searchFilter = new RegExp(this.inputValue, 'i');
      return this.items.filter(item => searchFilter.test(this.itemToString(item)))
    }
  },
  watch: {
    selectedItem(newItem) {
      this.$emit('on-select', newItem);
    },
    inputValue(newValue) {
      if (newValue === '') {
        this.selectedItem = null;
      }
    },
  },
  methods: {
    toggleOpen(on) {
      const newState = (typeof on !== 'undefined') ? on : !this.isOpen;
      if (this.isOpen === newState) {
        return;
      }
      this.isOpen = newState;
    },
    selectItem(item) {
      this.selectedItem = item;
      this.inputValue = this.itemToString(item);
      this.toggleOpen(false);
    },
    clearSelection() {
      this.selectedItem = null;
      this.inputValue = '';
      this.toggleOpen(true);
      this.$refs.textInput.focus();
    },
    onKeydown(event) {
      if (event.key === 'Escape') {
        this.toggleOpen(false);
      }
    },
    handleClick(event) {
      if (event.target !== this.$el && this.$el.contains(event.target) === false) {
        if (this.selectedItem) {
          this.inputValue = this.itemToString(this.selectedItem);
        }
        this.toggleOpen(false);
      }
    }
  },
  created() {
    this.handleClick = this.handleClick.bind(this);
    document.addEventListener('mousedown', this.handleClick);
  },
  destroyed() {
    document.removeEventListener('mousedown', this.handleClick);
  }
}
</script>

<style scoped>
.container {
  position: relative;
  width: 250px;
}

.label {
  font-weight: 700;
  display: block;
  margin-bottom: 10px;
  text-transform: uppercase;
}

.input-container {
  position: relative;
  width: 100%;
}

.text-input {
  width: 100%;
  font-size: 14px;
  word-wrap: break-word;
  line-height: 1em;
  outline: 0px;
  white-space: normal;
  min-height: 2em;
  background: #fff;
  display: inline-block;
  padding: 1em 2em 1em 1em;
  color: rgba(0, 0, 0, 0.87);
  box-shadow: none;
  border: 1px solid rgba(34, 36, 38, 0.15);
  border-radius: 0.3rem;
  transition: box-shadow 0.1s ease, width 0.1s ease;
}

.input-container--has-selection > .text-input {
  border-color: #009688;
}

.text-input:hover,
.text-input:focus {
  border-color: #96c8da;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
}

.text-input--open {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.text-input--open:hover,
.text-input--open:focus {
  box-shadow: none;
}

.controller-button {
  background-color: transparent;
  border: none;
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
  width: 47px;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;
}

.menu-container {
  position: relative;
  width: 100%;
}

.menu {
  padding: 0;
  margin-top: 0;
  position: absolute;
  background-color: white;
  width: 100%;
  max-height: 20rem;
  overflow-y: auto;
  overflow-x: hidden;
  outline: 0;
  transition: opacity 0.1s ease;
  border-radius: 0 0 0.28571429rem 0.28571429rem;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
  border-color: #96c8da;
  border-top-width: 0;
  border-right-width: 1px;
  border-bottom-width: 1px;
  border-left-width: 1px;
  border-style: solid;
}

.menu-item {
  position: relative;
  cursor: pointer;
  display: block;
  border: none;
  height: auto;
  text-align: left;
  border-top: none;
  line-height: 1em;
  color: rgba(0, 0, 0, 0.87);
  font-size: 1rem;
  text-transform: none;
  font-weight: 400;
  box-shadow: none;
  padding: 0.8rem 1.1rem;
  white-space: normal;
  word-wrap: normal;
}

.menu-item:hover {
  color: rgba(0, 0, 0, 0.95);
  background: rgba(0, 0, 0, 0.03);
}

.menu-item--selected {
  color: rgba(0, 0, 0, 0.95);
  font-weight: 700;
}
</style>
