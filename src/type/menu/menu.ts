/** @format */

export interface menuItem {
  icon: "Calendar";
  index: String;
  title: String;
  permission: String;
  children: Array<menuItem>;
}
