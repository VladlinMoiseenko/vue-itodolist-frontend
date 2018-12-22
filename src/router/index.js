import Vue from 'vue'
import Router from 'vue-router'
import Itodolist from '../components/itodolist'
import Authorize from '../components/authorize'
import Registration from '../components/registration'
import Profile from '../components/profile'
import store from '../store'

Vue.use(Router)

const ifAuthenticated = (to, from, next) => {
    if (!!store.state.auth.token) {
        next()
        return
    }
    next('/authorize')
}

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Itodolist',
            component: Itodolist,
        },
        {
            path: '/authorize',
            name: 'Authorize',
            component: Authorize,
        },
        {
            path: '/registration',
            name: 'Registration',
            component: Registration,
        },
        {
          path: '/profile',
          name: 'Profile',
          component: Profile,
          beforeEnter: ifAuthenticated,
        },
    ],
})
