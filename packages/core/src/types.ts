/**
 * Represents a command that can be executed, undone, and redone.
 */
export interface Command {
  /**
   * Optional key to group related commands for coalescing.
   * Commands with the same key will be merged during undo when coalescing is enabled.
   */
  key?: string
  /**
   * Function to execute the command.
   */
  do: () => void
  /**
   * Function to undo the command.
   */
  undo: () => void
}

/**
 * Configuration options for the history manager.
 */
export interface HistoryOptions {
  /**
   * Maximum number of commands to keep in history.
   * @default 30
   */
  size?: number
  /**
   * Whether to merge consecutive commands with the same key during undo.
   * @default true
   */
  coalesce?: boolean
}
