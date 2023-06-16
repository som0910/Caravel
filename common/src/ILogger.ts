export default interface ILogger {
  logEvent: (eventName: string, customProperties?: any | undefined) => void
  logException: (
    error: Error | string | unknown,
    customProperties?: any | undefined
  ) => void
  logTrace: (traceMessage: string, customProperties?: any | undefined) => void
  logDbCall: (
    url: string,
    method: string,
    query: string,
    duration: number,
    success: boolean,
    customProperties?: any | undefined
  ) => void
  logHttpCall: (
    url: string,
    method: string,
    duration: number,
    success: boolean,
    resultCode: string | number,
    customProperties?: any | undefined
  ) => void
}
