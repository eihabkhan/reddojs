import type { Command, HistoryOptions } from '@core/types'

/**
 * Creates a history manager for undo/redo functionality.
 *
 * @param options - Configuration options for the history manager
 * @param options.size - Maximum number of commands to keep in history (default: 30)
 * @param options.coalesce - Whether to merge consecutive commands with the same key during undo (default: true)
 * @returns A history manager instance with methods for managing command history
 *
 * @example
 * ```ts
 * const history = createHistory({ size: 50, coalesce: true })
 *
 * history.execute({
 *   key: 'typing',
 *   do: () => setText('hello'),
 *   undo: () => setText('')
 * })
 *
 * if (history.canUndo) {
 *   history.undo()
 * }
 * ```
 */
export function createHistory({ size = 30, coalesce = true }: HistoryOptions) {
  const undoStack: Command[] = []
  const redoStack: Command[] = []
  const listeners = new Set<() => void>()

  function notify() {
    listeners.forEach(fn => fn())
  }

  return {
    /**
     * Maximum number of commands in the history.
     */
    size,
    /**
     * Whether there are commands available to undo.
     */
    get canUndo() { return undoStack.length > 0 },
    /**
     * Whether there are commands available to redo.
     */
    get canRedo() { return redoStack.length > 0 },
    /**
     * Executes a command and adds it to the history.
     * Clears the redo stack.
     *
     * @param cmd - The command to execute
     */
    execute(cmd: Command) {
      cmd.do()
      undoStack.push(cmd)

      if (undoStack.length > size) {
        undoStack.shift()
      }

      redoStack.length = 0

      notify()
    },
    /**
     * Undoes the most recent command.
     * If coalescing is enabled, consecutive commands with the same key are merged.
     */
    undo() {
      const cmd = undoStack.pop()

      if (!cmd)
        return

      if (coalesce && cmd.key) {
        const redoFn = cmd.do
        let undoFn = cmd.undo

        while (undoStack.length > 0 && undoStack.at(-1)?.key === cmd.key) {
          const prev = undoStack.pop()!
          undoFn = prev.undo
        }

        undoFn()
        redoStack.push({ key: cmd.key, do: redoFn, undo: undoFn })
      }
      else {
        cmd.undo()
        redoStack.push(cmd)
      }

      notify()
    },
    /**
     * Redoes the most recently undone command.
     */
    redo() {
      const cmd = redoStack.pop()

      if (cmd) {
        cmd.do()
        undoStack.push(cmd)

        notify()
      }
    },
    /**
     * Clears all undo and redo history.
     */
    clear() {
      undoStack.length = redoStack.length = 0

      notify()
    },
    /**
     * Subscribes to history changes.
     *
     * @param fn - Callback function to be called when history changes
     * @returns Unsubscribe function
     */
    subscribe(fn: () => void) {
      listeners.add(fn)

      return () => listeners.delete(fn)
    },
  }
}
