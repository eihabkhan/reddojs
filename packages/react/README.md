# @reddojs/react

React hook for undo/redo functionality powered by [@reddojs/core](https://github.com/YOUR_USERNAME/reddo).

## Installation

```bash
npm install @reddojs/react
```

Or use via CDN:

```js
import { useHistory } from 'https://cdn.jsdelivr.net/npm/@reddojs/react@latest/+esm'
```

## Usage

```tsx
import { useHistory } from '@reddojs/react'

function App() {
  const { execute, undo, redo, canUndo, canRedo, clear } = useHistory({
    size: 100 // optional: max history size
  })

  // Execute a command
  const handleExecute = () => {
    execute({
      do: () => {
        // do something
      },
      undo: () => {
        // undo it
      }
    })
  }

  return (
    <div>
      <button onClick={undo} disabled={!canUndo}>Undo</button>
      <button onClick={redo} disabled={!canRedo}>Redo</button>
      <button onClick={clear}>Clear History</button>
    </div>
  )
}
```

### Command Coalescing

Group related commands using a `key` to merge them during undo:

```tsx
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

- `canUndo` - Boolean indicating if undo is available
- `canRedo` - Boolean indicating if redo is available
- `execute(command)` - Execute a command and add it to history
- `undo()` - Undo the last command
- `redo()` - Redo the last undone command
- `clear()` - Clear the history

### Options

- `size?: number` - Maximum number of commands to keep in history (default: 30)
- `coalesce?: boolean` - Whether to merge consecutive commands with the same key during undo (default: true)

## License

MIT
