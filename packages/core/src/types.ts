export interface Command {
  do: () => void
  undo: () => void
}

export interface HistoryOptions {
  size: number
}
