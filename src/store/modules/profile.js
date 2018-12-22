import apiCall from '../../api'
import Vue from 'vue'

const state = {mprofile: {}};

const getters = {
    getProfile: state => state.mprofile
};

const actions = {

    PROFILE_GET: ({ commit }) => {
        return new Promise((resolve, reject) => {
            apiCall({url: 'profile', method: 'get', token: localStorage.getItem('access_token'), data: ''})
                .then(resp => {
                    commit('PROFILE_SUCCESS', resp)
                });
            resolve()
        })
    },

};

const mutations = {

    PROFILE_SUCCESS: (state, resp) => {
        Vue.set(state, 'mprofile', resp.data)
    },

};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
