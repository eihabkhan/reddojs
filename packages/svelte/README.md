# @reddojs/svelte

Svelte store for undo/redo functionality powered by [@reddojs/core](https://github.com/YOUR_USERNAME/reddo).

## Installation

```bash
npm install @reddojs/core @reddojs/svelte
```

## Usage

```svelte
<script lang="ts">
import { useHistory } from '@reddojs/svelte'

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

<div>
  <button onclick={undo} disabled={!$canUndo}>Undo</button>
  <button onclick={redo} disabled={!$canRedo}>Redo</button>
  <button onclick={clear}>Clear History</button>
</div>
```

## API

### `useHistory(options?)`

Returns an object with the following properties:

- `canUndo` - Readable store indicating if undo is available
- `canRedo` - Readable store indicating if redo is available
- `execute(command)` - Execute a command and add it to history
- `undo()` - Undo the last command
- `redo()` - Redo the last undone command
- `clear()` - Clear the history

### Options

- `size?: number` - Maximum number of commands to keep in history (default: 30)
- `coalesce?: boolean` - Whether to merge consecutive commands with the same key during undo (default: true)

## License

MIT
