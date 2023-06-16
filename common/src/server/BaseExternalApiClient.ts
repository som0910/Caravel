import axios, { AxiosInstance } from 'axios'
import ILogger from '../ILogger'

export default class BaseExternalApiClient {
    api: AxiosInstance
    logger: ILogger

  constructor(logger: ILogger) {
    this.logger = logger
    this.api = axios.create()
    this.api.defaults.timeout = 90000
    this.api.interceptors.response.use(
      (response) => {
        return response
      },
      async (error) => {
        logger.logException(error)
        return Promise.reject(error)
      }
    )
  }

}