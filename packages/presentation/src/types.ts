export interface ProgressStore {
  start(): void
  done(): void
  track<T>(delayed: Promise<T> | (() => Promise<T>)): Promise<T>
}
