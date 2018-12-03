export default function({ store, route }, next){
  store.commit('options/CHANGE_WEL_PAGE', route.name === 'index')
  next()
}