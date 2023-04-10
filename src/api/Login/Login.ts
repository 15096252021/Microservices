import request from "@/request/dataRequest";
import { LoginDataInt } from "@/type/Login/Login";
import qs from "qs"

export function signin (data:LoginDataInt) {
  return request({
    url: `${import.meta.env.VITE_BASE_URL}/signin_vue`,
    method: "POST",
    data: qs.stringify(data)
  })
}