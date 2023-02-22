import { useRouter } from "vue-router"
export interface routerItem{
  id: string,
  name: string,
  path: string,
  title: string,
  orderid: number,
  icon: string,
  permission: string,
  index: string,
  children: Array<routerItem>
}
const router = useRouter();
/** 获取动态路由 */
export function getDynamicRouter(routerList:Array<routerItem>){
  routerList.map(item =>{
      if(item.children){
        getDynamicRouter(item.children)
      }else{
        
      }
  });
}