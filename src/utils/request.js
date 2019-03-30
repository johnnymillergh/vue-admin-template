import axios from 'axios'
import store from '../store'
import { TokenKey, getToken } from '@/utils/auth'
import { UniversalStatus } from '@/constants/universal-status'
import { MessageBox, Notification } from 'element-ui'

// Create an axios instance
const service = axios.create({
  // Base UTL of API
  baseURL: process.env.BASE_API,
  // Request timeout: 30s
  timeout: 30000
})

// Request interceptor's configuration
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      // Send request with JWT
      config.headers[TokenKey] = getToken()
    }
    return config
  },
  error => {
    // Do something with request error
    console.error(error) // for debug
    Notification({
      title: 'Request Error',
      message: 'Error message: ' + error,
      type: 'error',
      duration: 5 * 1000,
      showClose: true
    })
    Promise.reject(error)
  }
)

// Response interceptor's configuration
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== UniversalStatus.SUCCESS.code) {
      console.error('Server Responded an Error (%s). Response: ', res.timestamp, res)

      if (res.code === UniversalStatus.TOKEN_PARSE_ERROR.code ||
        res.code === UniversalStatus.TOKEN_OUT_OF_CONTROL.code ||
        res.code === UniversalStatus.TOKEN_EXPIRED.code) {
        MessageBox.confirm(
          'Your account has been logged out. Continue to stay or sign in again.',
          'Activity Warning',
          {
            confirmButtonText: 'Sign in again',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('FedLogOut').then(() => {
            // 为了重新实例化vue-router对象 避免bug
            location.reload()
          })
        })
      }
      const rejectedReason = `Server responded an error! ` +
        `Status: ${res.status} (${UniversalStatus.getStatusByCode(res.status).message}), message: ${res.message}`
      return Promise.reject(rejectedReason)
    } else {
      return response.data
    }
  },
  error => {
    console.error('Error occurred when getting request. ', error)
    Notification({
      title: 'Response-Handling Error',
      message: 'Error occurred when getting request. ' + error.message,
      type: 'error',
      duration: 5 * 1000,
      showClose: true
    })
    return Promise.reject(error)
  }
)

export default service
