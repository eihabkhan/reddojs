export interface Command {
  key?: string
  do: () => void
  undo: () => void
}

export interface HistoryOptions {
  size?: number
  coalesce?: boolean
}
