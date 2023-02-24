import menu from './json/menuTree.json'
export default [{
  type: 'get',
  url: '/user/login',
  response: () => {
    return {}
  }
}, {
  type: 'get',
  url: '/user/menu',
  response: () => {
    return menu;
  }
}]