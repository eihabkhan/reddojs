import type { Command, HistoryOptions } from '@reddojs/core'
import { createHistory } from '@reddojs/core'
import { onUnmounted, ref } from 'vue'

export function useHistory(options?: HistoryOptions) {
  const history = createHistory(options ?? {})
  const canUndo = ref(false)
  const canRedo = ref(false)

  const unsub = history.subscribe(() => {
    canUndo.value = history.canUndo
    canRedo.value = history.canRedo
  })

  onUnmounted(() => unsub())

  return {
    history,
    canUndo,
    canRedo,
    execute: (cmd: Command) => history.execute(cmd),
    undo: () => history.undo(),
    redo: () => history.redo(),
    clear: () => history.clear(),
  }
}
