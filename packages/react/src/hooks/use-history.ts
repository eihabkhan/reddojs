import type { Command, HistoryOptions } from '@reddojs/core'
import { createHistory } from '@reddojs/core'
import { useEffect, useState } from 'react'

export function useHistory(options?: HistoryOptions) {
  const [history] = useState(() => createHistory(options ?? {}))
  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)

  useEffect(() => {
    const unsub = history.subscribe(() => {
      setCanUndo(history.canUndo)
      setCanRedo(history.canRedo)
    })

    return () => { unsub() }
  }, [history])

  return {
    canUndo,
    canRedo,
    execute: (cmd: Command) => history.execute(cmd),
    undo: () => history.undo(),
    redo: () => history.redo(),
    clear: () => history.clear(),
  }
}
