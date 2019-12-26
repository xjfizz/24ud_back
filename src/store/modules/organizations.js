/* eslint-disable space-before-function-paren */
import { axios } from '@/utils/request'
import { formatDataTree, flatTree, mapFormat, formatSiteDataTree, formatSiteDataTree5 } from '@/utils/site'
import { URL_SYSTEM_AUTH_STRUCTURE_ALL, URL_SYSTEM_AUTH_STRUCTURE } from '@/api/url'
import Storage from 'store2'

export default {
  state: {
    topStruct: {}, // 24UD
    siteTree: [],
    siteListTree: [],
    siteListTreeAll:[],
    siteList: [], // 分拨中心-站点-配送区域 tree
    areaList: [], // 分拨中心-站点 tree
    site2Areas: {}, // 站点id-区域[]的映射
    mapLabels: {},
    id2Label: {}
    // allAreas: {}, // 站点id-区域[]的映射
    // sites: {} // 站点id-区域[]的映射
  },
  mutations: {
    SET_SITE_TREE(state, tree) {
      state.siteTree = tree
    },
    SET_SITE_LIST_TREE(state, tree) { // 城市-区-站点
      const [data] = tree
        console.log('data',data)
        state.siteListTree = data || []
    },
    SET_SITE_LIST_ALL_TREE(state, tree) { // 城市-区-站点
          const [data] = tree
          state.siteListTreeAll = data || []
        console.log('data',data,  state.siteListTreeAll)
      },
    SET_AREA_LIST(state, areaList) {
      state.areaList = areaList
    },
    SET_SITE_LIST(state, siteList) {
      state.siteList = siteList
    },
    SET_TOP_STRUCT(state, topStruct) {
      state.topStruct = topStruct
    },
    SET_ID_Label(state, list) {
      const data = {}
      list.forEach(item => {
        const { id } = item
        data[id] = item
      })
      state.id2Label = data
    }
  },
  actions: {
    GetSite({ commit }) {
      let id = ''
      let userInfo = JSON.parse(localStorage.getItem("login_user"))
      let siteIds = userInfo.siteIds
      console.log(siteIds)
      for (let i = siteIds.length - 1; i >= 0; i--) {
        if (siteIds[i] !== null && siteIds[i] !== '' ) {
          id = siteIds[i]
          break
        }
      }
      // axios.get(URL_SYSTEM_AUTH_STRUCTURE_ALL + '?id=' + id).then(res => {
        axios.get(URL_SYSTEM_AUTH_STRUCTURE_ALL+ '?id=' + userInfo.orgId).then(res => {
            console.log('res', res)
            res = res.data
        const { data } = res
        const tree = formatDataTree(data)
        const siteFlatList = flatTree(tree)
        // const [t] = tree
        // const all = mapFormat(t.children)
        // console.log(siteFlatList)
        // console.log(tree)
        const [ud24] = tree
        // const siteList = all.siteList
          console.log('tree', tree)
        commit('SET_SITE_TREE', tree)
        console.log('store', formatSiteDataTree(tree));
        commit('SET_SITE_LIST_TREE', [formatSiteDataTree(tree)]) // 快递员管理站点list
        commit('SET_SITE_LIST_ALL_TREE', [formatSiteDataTree5(tree)]) // 快递员管理站点list-包括区域5级
        commit('SET_AREA_LIST', siteFlatList)
        commit('SET_SITE_LIST', siteFlatList)
        commit('SET_ID_Label', siteFlatList)
        commit('SET_TOP_STRUCT', {
          id: ud24.id,
          value: ud24.id,
          label: ud24.label
        })
      })
    },
    DeleteSite({ dispatch }, id) {
      return axios.delete(`${URL_SYSTEM_AUTH_STRUCTURE}/${id}`).then(res => {
        dispatch('GetSite')
        return res
      })
    }
  }
}
