import axios from 'axios';
import { useRouter } from 'vue-router';

// 创建axois实例
const imageRequest = axios.create({
  baseURL: '/imageapi',
  timeout: 30000,
});
// 请求拦截
imageRequest.interceptors.request.use((config) => {
  const token: string = sessionStorage.getItem('token') || '';
  if (token) {
    config.headers.token = token;
  } else {
    config.headers.token = '';
  }
  return config;
});
// 响应拦截
imageRequest.interceptors.response.use(
  (res) => {
    // const code: number = res.data.code;
    // if (code != 200) {
    //   if (code == 506) {
    //     const router = useRouter();
    //     router.push('/Login');
    //   }
    //   return Promise.reject(res.data);
    // }
    return res;
  },
  (err) => {
    console.log(err);
  }
);
export default imageRequest;
