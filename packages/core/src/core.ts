import type { Command, HistoryOptions } from '@core/types'

export function createHistory({ size = 30, coalesce = true }: HistoryOptions) {
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
    redo() {
      const cmd = redoStack.pop()

      if (cmd) {
        cmd.do()
        undoStack.push(cmd)

        notify()
      }
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
