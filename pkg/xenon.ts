
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'

export enum Role {
  Student = 'student',
  Secretary = 'secretary',
  Manager = 'manager',
  Admin = 'admin'
}

export interface UserCredentials {
  email: string
  rollno: number
  banned: boolean
  department: string
  role: Role
}

/** Response returned by the Xenon REST API in all cases.
 * You can use the `message` field to display warnings/sucess messages*/
export interface XenonResponse {
  message: string
}

class Xenon {
  _axios: AxiosInstance
  constructor(xenon_url: string, axios_config?: AxiosRequestConfig) {
    this._axios = axios.create({
      ...axios_config,
      baseURL: xenon_url,
      withCredentials: true
    })
  }

  async whoami() {
    return new Promise<UserCredentials>((resolve, reject) => {
      this._axios
        .get<UserCredentials>('/whoami')
        .then((resp) => {
          resolve(resp.data)
        })
        .catch((error: AxiosError<XenonResponse>) => {
          return reject({
            message: error.response?.data.message || 'An unknown error occured!'
          })
        })
    })
  }

  /**
   * Returns the sum of a and b
   * @param {string} username
   * @param {string} rollno
   * @param {AxiosRequestConfig} axios_config Optional Configuration to be added to axios request
   * @returns {Promise<XenonResponse>} `response` Optional R
   */
  async register(
    username: string,
    rollno: string,
    axios_config?: AxiosRequestConfig
  ): Promise<XenonResponse> {
    var data = new FormData()
    data.append('username', username)
    data.append('rollno', rollno)
    return new Promise<XenonResponse>((resolve, reject) => {
      this._axios
        .post<XenonResponse>('/register', data, axios_config)
        .then((resp) => {
          resolve(resp.data)
        })
        .catch((error: AxiosError<XenonResponse>) => {
          return reject({
            message: error.response?.data.message || 'An unknown error occured!'
          })
        })
    })
  }

  async recover(username: string, axios_config?: AxiosRequestConfig) {
    var data = new FormData()
    data.append('username', username)
    return new Promise<XenonResponse>((resolve, reject) => {
      this._axios
        .post<XenonResponse>('/recover', data, axios_config)
        .then((resp) => {
          resolve(resp.data)
        })
        .catch((error: AxiosError<XenonResponse>) => {
          return reject({
            message: error.response?.data.message || 'An unknown error occured!'
          })
        })
    })
  }
}
const xenon = new Xenon(`${process.env.NEXT_PUBLIC_XENON_BASE_URL}`)
export {xenon}