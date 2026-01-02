# @reddojs/svelte

Svelte store for undo/redo functionality powered by [@reddojs/core](https://github.com/eihabkhan/reddojs).

## Installation

```bash
npm install @reddojs/svelte
```

Or use via CDN:

```js
import { useHistory } from 'https://cdn.jsdelivr.net/npm/@reddojs/svelte@latest/+esm'
```

## Usage

```svelte
<script lang="ts">
import { useHistory } from '@reddojs/svelte'

const history = useHistory({
  size: 100 // optional: max history size
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
</script>

<div>
  <button onclick={history.undo} disabled={!history.canUndo}>Undo</button>
  <button onclick={history.redo} disabled={!history.canRedo}>Redo</button>
  <button onclick={history.clear}>Clear History</button>
</div>
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

### `useHistory(options?)`

Returns a reactive object with the following properties:

- `canUndo` - Reactive boolean indicating if undo is available
- `canRedo` - Reactive boolean indicating if redo is available
- `execute(command)` - Execute a command and add it to history
- `undo()` - Undo the last command
- `redo()` - Redo the last undone command
- `clear()` - Clear the history

> **Note:** Do not destructure the returned object as it will lose reactivity. Always access properties through the object reference (e.g., `history.canUndo`).

### Options

- `size?: number` - Maximum number of commands to keep in history (default: 30)
- `coalesce?: boolean` - Whether to merge consecutive commands with the same key during undo (default: true)

## License

MIT
