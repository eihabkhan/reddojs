# @reddojs/core

Framework-agnostic undo/redo history management.

## Installation

```bash
npm install @reddojs/core
```

## Usage

```ts
import { createHistory } from '@reddojs/core'

const history = createHistory({
  size: 100, // optional: max history size
  coalesce: true // optional: merge consecutive commands with same key
})

// Execute a command
history.execute({
  do: () => {
    // do something
  },
  undo: () => {
    // undo it
  }
})

// Undo/redo
if (history.canUndo) {
  history.undo()
}

if (history.canRedo) {
  history.redo()
}

// Subscribe to changes
const unsubscribe = history.subscribe(() => {
  console.log('History changed')
})
```

### Command Coalescing

Group related commands using a `key` to merge them during undo:

```ts
// These commands will be merged into one undo action
history.execute({ key: 'typing', do: () => setText('h'), undo: () => setText('') })
history.execute({ key: 'typing', do: () => setText('he'), undo: () => setText('h') })
history.execute({ key: 'typing', do: () => setText('hel'), undo: () => setText('he') })

// Single undo reverts all three
history.undo() // setText('')
```

## API

### `createHistory(options?)`

Returns a history manager instance with the following properties and methods:

- `canUndo` - Whether undo is available
- `canRedo` - Whether redo is available
- `execute(command)` - Execute a command and add it to history
- `undo()` - Undo the last command (or group of coalesced commands)
- `redo()` - Redo the last undone command
- `clear()` - Clear the history
- `subscribe(fn)` - Subscribe to history changes, returns unsubscribe function

### Options

- `size?: number` - Maximum number of commands to keep in history (default: 30)
- `coalesce?: boolean` - Whether to merge consecutive commands with the same key during undo (default: true)

### Command

- `do: () => void` - Function to execute the command
- `undo: () => void` - Function to undo the command
- `key?: string` - Optional key for grouping commands during coalescing

## Framework Bindings

- [@reddojs/react](https://github.com/eihabkhan/reddojs/tree/main/packages/react) - React hook
- [@reddojs/vue](https://github.com/eihabkhan/reddojs/tree/main/packages/vue) - Vue composable
- [@reddojs/svelte](https://github.com/eihabkhan/reddojs/tree/main/packages/svelte) - Svelte store

## License

MIT
