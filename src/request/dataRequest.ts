import axios from 'axios'
import { useRouter } from 'vue-router';

// 创建axois实例
const request = axios.create({
  baseURL: import.meta.env.BASE_URL,
  timeout: 5000,
  headers:{
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
  }
})
// 请求拦截
request.interceptors.request.use((config) => {
  const token:string = sessionStorage.getItem('token')|| "";
  if(token){
    config.headers.token = token;
  }else{
    config.headers.token = "";
  }
  return config;
})
// 响应拦截
request.interceptors.response.use((res) => {
  const code:number = res.data.code;
  if(code != 200){
    if(code == 506){
      const router = useRouter();
      router.push("/Login");
    }
    return Promise.reject(res.data);
  }
  return res.data
},(err) =>{
  console.log(err);
})
export default request