const API_URL = process.env.NODE_ENV === 'production' ? 'http://119.23.247.77:3005' : 'http://127.0.0.1:3005'

export const actions = {
  nuxtServerInit(store, { req }) {
    // 设备检查类型
    const userAgent = process.server ? req.headers['user-agent'] : navigator.userAgent
    const isMobile = /(iPhone|iPod|Opera Mini|Android.*Mobile|NetFront|PSP|BlackBerry|Windows Phone)/gi.test(
      userAgent
    )
    store.commit('options/SET_MOBILE_LAYOUT', isMobile)
    store.commit('options/SET_USER_AGENT', userAgent)

    const initAppData = [
      store.dispatch('REQ_getLink')
    ]

    return Promise.all(initAppData)
  },

  // 获取文章列表
  async REQ_getArtList({commit, state}, params){
    commit('article/FETCH_ART')
    const res = await this.$axios.$get(`${API_URL}/article/list`, {params})
                          .catch(err => console.error(err))
    if (res.code === 1) {
      let list;
      if (params && params.page === 1 || !params.page) list = res.data.list
      else list = [...state.article.art.list, ...res.data.list]
      commit('article/SET_ART_SUCCESS', {
        list,
        pagination: res.data.pagination
      })
    } else commit('article/SET_ART_FAIL')
  },

  // 获取文章详情
  async REQ_getArtDetails({commit}, id){
    const res = await this.$axios.$get(`${API_URL}/article/details`,{
      params: {
        id
      }
    })
    commit('article/SET_DETAILS', res.data || {})
  },

  // 获取文章详情
  async REQ_likeArticle({commit}, id){
    const res = await this.$axios.$get(`${API_URL}/article/like`,{
      params: {
        id
      }
    })
    return res
  },

  // 获取友情链接
  async REQ_getLink({commit}) {
    const res = await this.$axios.$get(`${API_URL}/link`)
    if (res.code === 1) commit('link/SET_LINK_SUCCESS', res.data)
    else commit('link/SET_LINK_FILE')
  },

  // 增加评论
  async REQ_addCommit({commit, state}, data) {
    const res = await this.$axios.$post(`${API_URL}/comments/add`, data)
    if (res.code === 1){
      let addData = {
        data: [...state.comment.data.data, res.data],
        pagination: state.comment.data.pagination
      }
      commit('article/ADD_COMMENT')
      commit('comment/GET_LIST_SUCCESS', addData)
      alert('评论成功！！')
    }
    return res
  },
  // 获取评论列表
  async REQ_commits({commit, state}, params) {
    commit('comment/REQUEST_LIST', true)
    const res = await this.$axios.$get(`${API_URL}/comments`, { params })
    if (res.code === 1){
      if(params.page === 1) commit('comment/GET_LIST_SUCCESS', res.data)
      else{
        let data = {
          data: [...state.comment.data.data, ...res.data.data],
          pagination: res.data.pagination
        }
        commit('comment/GET_LIST_SUCCESS', data)
      }
    }
    else commit('comment/GET_LIST_FAILURE')
  },
  // 评论点赞
  async REQ_likeCommit({commit}, _id){
    const res = await this.$axios.$post('http://127.0.0.1:3005/comments/like', {
      _id
    })
    if (res.code === 1) commit('comment/LIKE_ITEM', res.data)
  },

  // 获取留言板列表
  async REQ_wallList({commit, state}, params){
    commit('heros/FETCH_HERO')
    const res = await this.$axios.$get(`${API_URL}/wall`, { params })
    if(res.code === 1){
      if(params.page === 1) commit('heros/SET_HERO_SUCCESS', res.data)
      else {
        let data = {
          list: [...state.heros.data.list, ...res.data.list],
          pagination: res.data.pagination
        }
        commit('heros/SET_HERO_SUCCESS', data)
      }
    } else commit('heros/SET_HERO_FILE')
  },
  // 增加留言
  async REQ_addWall({commit}, data) {
    const res = await this.$axios.post(`${API_URL}/wall/add`, data)
    return res
  }
}
