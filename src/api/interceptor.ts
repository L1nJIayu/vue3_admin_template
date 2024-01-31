import type {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosError,
  AxiosResponse
} from 'axios'
import { ElMessage } from 'element-plus'
import type { messageType } from 'element-plus'
import router from '@/router'



import axios from 'axios'



// 注册拦截器
export const registerInterceptors = (axios: AxiosInstance) => {
  axios.interceptors.request.use(onFulfilled_request, onRejected_request)
  axios.interceptors.response.use(onFulfilled_response, onRejected_response)
}

// 请求拦截 - resolve
function onFulfilled_request(config: InternalAxiosRequestConfig) {

  // 添加接口凭证
  const Authorization = localStorage.getItem('Authorization')
  if (typeof Authorization === 'string' && Authorization !== '') {
    config.headers['Authorization'] = `Bearer ${Authorization}`
  }
  
  return config
}
// 请求拦截 - reject
function onRejected_request(error: AxiosError) {
  return Promise.reject(error)
}

// 响应拦截 - resolve
function onFulfilled_response(res: AxiosResponse) {
  const { data, config: { url, method, signal} } = res


  // Blob处理
  if (data instanceof Blob) {
      
    // data类型如果为json，属于报错内容，需要将Blob转换成json后返回（与后端约定好的）
    if(data.type && data.type === 'application/json') {
      const reader  = new FileReader()
      reader.readAsText(data, 'utf-8')    // 读取文件,结果用字符串形式表示
      reader.onload = () => {             // 读取完成后,**获取reader.result**
        const result = JSON.parse(reader.result as string)
        const  { errorMsg, message } = result
        sendMessage('error', message || errorMsg || '文件获取失败')
        return Promise.reject(result)
      }
      return Promise.reject(new Error('文件获取失败'))
    } else {
      return res
    }
  } else if (data instanceof Object) {
    const { errorCode, code, message, errorMsg, error_msg } = data
    const resCode = code || errorCode
    const resMessage = message || errorMsg || error_msg || `接口【${url}】错误，请联系管理员`
    switch (resCode) {
      case 2000:
      case 20000:
        return data
      case 5000:
      case 50000:
        sendMessage('error', resMessage)
        console.error('接口响应错误信息：',res)
        return Promise.reject(res)
      default:
        sendMessage('error', resMessage)
        // console.error('接口响应错误信息：',res)
        return Promise.reject(res)
    }

  } else {
    return res
  }
}
// 响应拦截 - reject
export function onRejected_response(error: AxiosError) {
  
  if(!axios.isCancel(error)) {
  
    const statusCode = error?.request?.status

    switch (statusCode) {
      case 0:
        sendMessage('error', '网络故障，请检查网络连接。')
        break
      case 404:
        sendMessage('error', `接口【${error.config?.url}】不存在`)
        break
      case 401:
        sendMessage('warning', `登录超时，请重新登录`)
        router.replace({ name: 'Login' })
        break
      case 403:
        sendMessage('warning', `接口【${error.config?.url}】请求无权限`)
        break
      case 500:
        sendMessage('error', `接口【${error.config?.url}】错误，请联系管理员`)
        console.error('接口响应错误信息：',error)
        break
      case 502:
        sendMessage('error', '网关超时，服务无响应，请联系管理员')
        console.error('接口响应错误信息：',error)
        break
      default:
        sendMessage('error', error.message || `接口【${error.config?.url}】错误，请联系管理员`)
        console.error('接口响应错误信息：',error)
    }

  }

  return Promise.reject(error)
}

// 消息提示
let isShowMessage = false
function sendMessage(type: messageType, message: string) {
  if (!isShowMessage) {
    isShowMessage = true
    ElMessage({ type, message: message })
    setTimeout(() => {
      isShowMessage = false
    }, 2000)
  }
}
