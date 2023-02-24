/** @format */

export interface menuItem {
  menuid: string;
  menu_name: string;
  parentid: string;
  router_name: string;
  router_path: string;
  router_component: string;
  menu_type: string;
  icon: string;
  is_crumbs: boolean;
  flag: boolean;
  is_view: boolean;
  auth: string;
  children: Array<menuItem>;
}
