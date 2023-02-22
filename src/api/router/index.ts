import request from "@/request";
import qs from "qs"
const BASE_URL = import.meta.env.VITE_BASE_URL
// 获取跳过登录的白名单
export function  getWhileRouterlist(){
  return request({
    url: BASE_URL + "/common/getWhileRouterlist",
    method: "get"
  })
}
export function getMenu(data?:any){
  return request({
    url: "/user/menu",
    method: "get",
    data: qs.stringify(data)
  })
}