import type { Command, HistoryOptions } from '@reddojs/core'
import { createHistory } from '@reddojs/core'
import { onDestroy } from 'svelte'

export function useHistory(options?: HistoryOptions) {
  const history = createHistory(options ?? {})

  let canUndo = $state(history.canUndo)
  let canRedo = $state(history.canRedo)

  const unsub = history.subscribe(() => {
    canUndo = history.canUndo
    canRedo = history.canRedo
  })

  onDestroy(() => unsub())

  return {
    get canUndo() {
      return canUndo
    },
    get canRedo() {
      return canRedo
    },
    execute: (cmd: Command) => history.execute(cmd),
    undo: () => history.undo(),
    redo: () => history.redo(),
    clear: () => history.clear(),
  }
}
