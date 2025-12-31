# Reddo

<img width="148" height="132" alt="Reddojs" src="https://github.com/user-attachments/assets/5231621c-d738-498e-878c-e0c2ae8c4746" align="right" />

A tiny undo/redo utility package for JavaScript, React, Vue, and Svelte.

* **Tiny.** Less than 1kb (gzipped). No dependencies.
* **Zero dependencies** Core lib has no runtime deps
* **Dead simple** Just import hook, execute, undo, redo
* **Framework agnostic** Core works anywhere, with official React, Vue & Svelte adapters
* **TypeScript first** Fully typed.
* **Command coalescing** Automatically groups related commands (e.g., typing in a text field, changing a color in a color picker)

## Table of Content

* [Table of Contents](#table-of-contents)
* [Installation](#comparison-with-uuid)
  * [React](#comparison-with-uuid)
  * [Vue](#comparison-with-uuid)
  * [Svelte](#comparison-with-uuid)
  * [Vanilla](#comparison-with-uuid)
* [API Reference](#benchmark)
  * [Command](#blocking)
  * [HistoryOptions](#non-secure)
* [Usage](#usage)
  * [React](#react-native)
  * [Vue](#pouchdb-and-couchdb)
  * [Svelte](#cli)
  * [Vanilla](#react)

## Installation

### React

```bash
npm install @reddojs/react
```

### Vue

```bash
npm install @reddojs/vue
```

### Svelte

```bash
npm install @reddojs/svelte
```

### Vanilla

```bash
npm install @reddojs/core
```

## API Reference

### Command

A command object represents an action that can be executed and undone.

```typescript
interface Command {
  key?: string // Optional key to group related commands for coalescing
  do: () => void // Function to execute the command
  undo: () => void // Function to undo the command
}
```

| Property | Type | Description |
|----------|------|-------------|
| `key` | `string` (optional) | When set, consecutive commands with the same key are merged into a single undo operation. Useful for text input, color pickers, sliders, etc. |
| `do` | `() => void` | The function that performs the action |
| `undo` | `() => void` | The function that reverses the action |

### HistoryOptions

Configuration options for the history manager.

```typescript
interface HistoryOptions {
  size?: number // Max commands in history (default: 30)
  coalesce?: boolean // Merge consecutive commands with same key (default: true)
}
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `size` | `number` | `30` | Maximum number of commands to keep in history |
| `coalesce` | `boolean` | `true` | When enabled, consecutive commands with the same `key` are merged on undo |

### Return Values

All adapters (`useHistory`) return:

| Property | Type | Description |
|----------|------|-------------|
| `execute` | `(cmd: Command) => void` | Execute a command and add it to history |
| `undo` | `() => void` | Undo the last command |
| `redo` | `() => void` | Redo the last undone command |
| `clear` | `() => void` | Clear all undo/redo history |
| `canUndo` | `boolean` | Whether there are commands to undo |
| `canRedo` | `boolean` | Whether there are commands to redo |

## Usage

### React

```tsx
import { useHistory } from '@reddojs/react'
import { useState } from 'react'

function App() {
  const { execute, undo, redo, canUndo, canRedo } = useHistory({ size: 100 })
  const [count, setCount] = useState(0)
  const [color, setColor] = useState('#ffffff')

  function increment() {
    execute({
      do: () => setCount(prev => prev + 1),
      undo: () => setCount(prev => prev - 1),
    })
  }

  function changeColor(e: React.ChangeEvent<HTMLInputElement>) {
    const oldValue = color
    const newValue = e.target.value

    execute({
      key: 'color-change', // coalesces rapid color changes
      do: () => setColor(newValue),
      undo: () => setColor(oldValue),
    })
  }

  return (
    <div>
      <button onClick={undo} disabled={!canUndo}>Undo</button>
      <button onClick={redo} disabled={!canRedo}>Redo</button>
      <button onClick={increment}>
        Count:
        {count}
      </button>
      <input type="color" value={color} onChange={changeColor} />
    </div>
  )
}
```

### Vue

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useHistory } from '@reddojs/vue'

const { execute, undo, redo, canUndo, canRedo } = useHistory({ size: 100 })
const count = ref(0)
const color = ref('#ffffff')

function increment() {
  execute({
    do: () => count.value++,
    undo: () => count.value--,
  })
}

function changeColor(e: Event) {
  const oldValue = color.value
  const newValue = (e.target as HTMLInputElement).value

  execute({
    key: 'color-change',
    do: () => (color.value = newValue),
    undo: () => (color.value = oldValue),
  })
}
</script>

<template>
  <div>
    <button @click="undo" :disabled="!canUndo">Undo</button>
    <button @click="redo" :disabled="!canRedo">Redo</button>
    <button @click="increment">Count: {{ count }}</button>
    <input type="color" :value="color" @input="changeColor" />
  </div>
</template>
```

### Svelte

```svelte
<script lang="ts">
  import { useHistory } from '@reddojs/svelte'

  const { execute, undo, redo, canUndo, canRedo } = useHistory({ size: 100 })
  let count = $state(0)
  let color = $state('#ffffff')

  function increment() {
    execute({
      do: () => count++,
      undo: () => count--,
    })
  }

  function changeColor(e: Event) {
    const oldValue = color
    const newValue = (e.target as HTMLInputElement).value

    execute({
      key: 'color-change',
      do: () => (color = newValue),
      undo: () => (color = oldValue),
    })
  }
</script>

<div>
  <button onclick={undo} disabled={!canUndo}>Undo</button>
  <button onclick={redo} disabled={!canRedo}>Redo</button>
  <button onclick={increment}>Count: {count}</button>
  <input type="color" value={color} oninput={changeColor} />
</div>
```

### Vanilla

```js
import { createHistory } from '@reddojs/core'

const history = createHistory({ size: 100 })

let count = 0

function increment() {
  history.execute({
    do: () => {
      count++
      render()
    },
    undo: () => {
      count--
      render()
    },
  })
}

function render() {
  document.getElementById('count').textContent = count
  document.getElementById('undo').disabled = !history.canUndo
  document.getElementById('redo').disabled = !history.canRedo
}

// Subscribe to history changes
history.subscribe(render)

document.getElementById('increment').onclick = increment
document.getElementById('undo').onclick = () => history.undo()
document.getElementById('redo').onclick = () => history.redo()
```
