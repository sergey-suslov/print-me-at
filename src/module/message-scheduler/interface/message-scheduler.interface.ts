export interface MessageScheduler {
  scheduleMessage(message: string, time: Date): Promise<void>
}
