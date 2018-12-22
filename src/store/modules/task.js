import apiCall from '../../api'
import Vue from 'vue'

const state = {
    mtask: {},
    status: ''
};

const getters = {
    getTask: state => state.mtask,
    taskStatus: state => state.status
};

const actions = {

    TASK_GET: ({ commit }) => {
        return new Promise((resolve, reject) => {
            commit('TASK_INIT');
            apiCall({url: 'task', method: 'get', token: localStorage.getItem('access_token'), data: ''})
                .then(resp => {
                    if (resp === 'error')
                        commit('TASK_GET_ERROR', resp);
                    else commit('TASK_GET_SUCCESS', resp)
                });
            resolve()
        })
    },

    TASK_DELETE: ({ commit }, taskid) => {
        return new Promise((resolve, reject) => {
            apiCall({url: 'task/delete/'+taskid, method: 'delete', token: localStorage.getItem('access_token'), data: ''})
            resolve()
        })
    },

    TASK_CREATE: ({ commit }, datatask) => {
        return new Promise((resolve, reject) => {
            apiCall({url: 'task/create', method: 'post', token: localStorage.getItem('access_token'), data: datatask})
            resolve()
        })
    },

    TASK_UPDATE: ({ commit }, datatask) => {
        return new Promise((resolve, reject) => {
            apiCall({url: 'task/update/'+datatask.id, method: 'put', token: localStorage.getItem('access_token'), data: datatask})
            resolve()
        })
    }

};

const mutations = {

    TASK_INIT (state) {
        state.status = 'loading'
    },

    TASK_GET_ERROR: (state) => {
        state.status = 'error'
    },

    TASK_GET_SUCCESS: (state, resp) => {
        Vue.set(state, 'mtask', resp.data);
        state.status = 'success'
    },

};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
