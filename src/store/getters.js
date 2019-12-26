const getters = {
  device: state => state.app.device,
  theme: state => state.app.theme,
  color: state => state.app.color,
  token: state => state.user.token,
  userId: state => state.user.userId,
  avatar: state => state.user.avatar,
  nickname: state => state.user.name,
  welcome: state => state.user.welcome,
  siteId: state => state.user.siteId,
  roles: state => state.user.roles,
  userInfo: state => state.user.info,
  addRouters: state => state.permission.addRouters,
  initPermission: state => state.permission.initPermission,
  multiTab: state => state.app.multiTab,
  // 24ud 组织架构
  siteTree: state => state.organizations.siteTree,
  siteListTree: state => state.organizations.siteListTree,
  siteListTreeAll: state => state.organizations.siteListTreeAll,
  siteList: state => state.organizations.siteList,
  topStruct: state => state.organizations.topStruct,
  id2Label: state => state.organizations.id2Label,
  areaList: state => state.organizations.areaList,
  // 消息通知
  isNewMessage: state => state.message.isNewMessage,
  isClickMessage: state => state.message.isClickMessage,
}

export default getters
