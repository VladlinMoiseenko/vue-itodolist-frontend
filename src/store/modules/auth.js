import apiCall from '../../api'

const state = {
    token: localStorage.getItem('access_token') || '',
    user: localStorage.getItem('username') || '',
    status: ''
};

const getters = {
    isAuthenticated: (state) => !!state.token,
    authStatus: state => state.status
};

const actions = {

    AUTH_AUTHORIZE: ({ commit }, userdata) => {
        return new Promise((resolve, reject) => {
            commit('AUTH_AUTHORIZE');
            apiCall({url: 'authorize', method: 'post', token: '', data: userdata})
                .then(resp => {
                    if (resp === 'error')
                        commit('AUTH_ERROR');
                    else {
                        localStorage.setItem('username', userdata.username);
                        apiCall({
                            url: 'accesstoken',
                            method: 'post',
                            token: '',
                            data: '{"authorization_code": "' + resp.data.authorization_code + '"}'
                        })
                        .then(respo => {
                            if (respo === 'error')
                                commit('AUTH_ERROR');
                            else {
                                localStorage.setItem('access_token', respo.data.access_token);
                                commit('AUTH_AUTHORIZE_SUCCESS', respo)
                            }
                        });
                    }
                });
            resolve()
        })
    },

    AUTH_REGISTRATION: ({ commit }, userdata) => {
        return new Promise((resolve, reject) => {
            commit('AUTH_AUTHORIZE');
            apiCall({url: 'register', method: 'post', token: '', data: userdata})
                .then(resp => {
                    if (resp === 'error')
                        commit('AUTH_ERROR');
                    else {
                        apiCall({url: 'authorize', method: 'post', token: '', data: userdata})
                            .then(resp => {
                                if (resp === 'error')
                                    commit('AUTH_ERROR');
                                else {
                                    localStorage.setItem('username', userdata.username);
                                    apiCall({
                                        url: 'accesstoken',
                                        method: 'post',
                                        token: '',
                                        data: '{"authorization_code": "' + resp.data.authorization_code + '"}'
                                    })
                                    .then(respo => {
                                        if (respo === 'error')
                                            commit('AUTH_ERROR');
                                        else {
                                            localStorage.setItem('access_token', respo.data.access_token);
                                            commit('AUTH_AUTHORIZE_SUCCESS', respo)
                                        }
                                    });
                                }
                            });
                    }
                });
            resolve()
        })
    },

    AUTH_LOGOUT: ({ commit }) => {
        return new Promise((resolve, reject) => {
            apiCall({url: 'logout', method: 'get', token: localStorage.getItem('access_token'), data: ''})
                .then(resp => {
                    localStorage.removeItem('authorization_code');
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('username');
                    commit('AUTH_LOGOUT');
                });
            resolve()
        })
    },

    AUTH_CLEAR: ({ commit }) => {
        commit('AUTH_CLEAR')
    },

};

const mutations = {

    AUTH_AUTHORIZE (state) {
        state.status = 'loading'
    },

    AUTH_AUTHORIZE_SUCCESS (state, respo) {
        state.user = localStorage.getItem('username');
        state.token = respo.data.access_token;
        state.status = 'success'
    },

    AUTH_LOGOUT (state) {
        state.token = '';
        state.user = '';
        state.status = ''
    },

    AUTH_ERROR (state) {
        state.token = '';
        state.user = '';
        state.status = 'error'
    },

    AUTH_CLEAR (state) {
        state.token = '';
        state.user = '';
        state.status = ''
    },

};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
