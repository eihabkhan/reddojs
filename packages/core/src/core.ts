import type { Command, HistoryOptions } from '@core/types'

export function createHistory(options?: HistoryOptions) {
  const size = options?.size || 30
  const undoStack: Command[] = []
  const redoStack: Command[] = []
  const listeners = new Set<() => void>()

  function notify() {
    listeners.forEach(fn => fn())
  }

  return {
    size,
    get canUndo() { return undoStack.length > 0 },
    get canRedo() { return redoStack.length > 0 },
    execute(cmd: Command) {
      cmd.do()
      undoStack.push(cmd)

      if (undoStack.length > size) {
        undoStack.shift()
      }

      redoStack.length = 0

      notify()
    },
    undo() {
      const cmd = undoStack.pop()

      if (cmd) {
        cmd.undo()
        redoStack.push(cmd)
      }

      notify()
    },
    redo() {
      const cmd = redoStack.pop()

      if (cmd) {
        cmd.do()
        undoStack.push(cmd)
      }

      notify()
    },
    clear() {
      undoStack.length = redoStack.length = 0

      notify()
    },
    subscribe(fn: () => void) {
      listeners.add(fn)

      return () => listeners.delete(fn)
    },
  }
}
