# @reddo/vue

Vue composable for undo/redo functionality powered by [@reddo/core](https://github.com/YOUR_USERNAME/reddo).

## Installation

```bash
npm install @reddo/vue @reddo/core
```

## Usage

```vue
<script setup lang="ts">
import { useHistory } from '@reddo/vue'

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

## API

### `useHistory(options?)`

Returns an object with the following properties:

- `history` - The underlying history instance from @reddo/core
- `canUndo` - Reactive ref indicating if undo is available
- `canRedo` - Reactive ref indicating if redo is available
- `execute(command)` - Execute a command and add it to history
- `undo()` - Undo the last command
- `redo()` - Redo the last undone command
- `clear()` - Clear the history

### Options

- `size?: number` - Maximum number of commands to keep in history (default: Infinity)
- `coalesce?: boolean` - Whether to merge consecutive commands with the same key during undo (default: true)

## License

MIT
