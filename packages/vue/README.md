# @reddojs/vue

Vue composable for undo/redo functionality powered by [@reddojs/core](https://github.com/YOUR_USERNAME/reddo).

## Installation

```bash
npm install @reddojs/core @reddojs/vue
```

## Usage

```vue
<script setup lang="ts">
import { useHistory } from '@reddojs/vue'

const { execute, undo, redo, canUndo, canRedo, clear } = useHistory({
  size: 100 // optional: max history size
})

// Execute a command
execute({
  do: () => {
    // do something
  },
  undo: () => {
    // undo it
  }
})
</script>

<template>
  <div>
    <button @click="undo" :disabled="!canUndo">Undo</button>
    <button @click="redo" :disabled="!canRedo">Redo</button>
    <button @click="clear">Clear History</button>
  </div>
</template>
```

### Command Coalescing

Group related commands using a `key` to merge them during undo:

```ts
// These commands will be merged into one undo action
execute({ key: 'typing', do: () => setText('h'), undo: () => setText('') })
execute({ key: 'typing', do: () => setText('he'), undo: () => setText('h') })
execute({ key: 'typing', do: () => setText('hel'), undo: () => setText('he') })

// Single undo reverts all three
undo() // setText('')
```

## API

### `useHistory(options?)`

Returns an object with the following properties:

- `canUndo` - Reactive ref indicating if undo is available
- `canRedo` - Reactive ref indicating if redo is available
- `execute(command)` - Execute a command and add it to history
- `undo()` - Undo the last command
- `redo()` - Redo the last undone command
- `clear()` - Clear the history

### Options

- `size?: number` - Maximum number of commands to keep in history (default: 30)
- `coalesce?: boolean` - Whether to merge consecutive commands with the same key during undo (default: true)

## License

MIT
