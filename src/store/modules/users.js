import axios from 'axios'
import EventBus from '../../EventBus'

const state = {
        users: [],
        selectedUser: [],
        loadingStatus: false,
        error: null,
        newUserDialog: false,
        deactivateUserDialog: false,
        userUpdateDialog: false
    }

const getters = {
        allUsers: state => {return state.users},
        getErrorMsg: state => {return state.error},
        getLoadingStatus: state => {return state.loadingStatus},
        getNewuserDialogStatus: state => {return state.newUserDialog},
        getdeactiveuserDialogStatus: state => {return state.deactivateUserDialog},
        selectedUser: state => {return state.selectedUser},
        userUpdateDialog: state => {return state.userUpdateDialog}
    }
    
const actions = {
        async fetchUsers({commit}){
            commit('SET_LOADING_STATUS', true)
            await axios.get('http://localhost:3060/users')
                .then(res => {
                    commit('SET_LOADING_STATUS', false)
                    commit('SET_USERS', res.data)
                })
                .catch(err => {
                    commit('SET_ERROR', err)
                    console.log(err)
                })
        },

        async saveNewUser({commit, dispatch}, user){
            commit('SET_LOADING_STATUS', true)
            await axios.post('http://localhost:3060/new-user', user.data)
                .then((res) => {
                    if(res.data.message) {
                        commit('SET_LOADING_STATUS', false)
                        alert(res.data.message)
                        console.log([res, res.data.message])
                    }else{
                        alert(`User ${res.data.name} created!`)
                        dispatch('newUserDialog')
                        commit('SET_LOADING_STATUS', false)
                        commit('ADD_NEWUSER', res.data)
                        EventBus.$emit('cleanNewUserForm');
                    }
                    
                })
                .catch(err => console.log(err))
        },

        async deleteUser({commit, dispatch}, userId){
            axios.delete(`http://localhost:3060/delete-user/${userId}`)
            .then(() => {
                alert(`User deleted!`)
                dispatch('fetchUsers')
                dispatch('closeConfirmationDiag')
                commit('CLEAN_SELECTED_USER')
            })
            .catch(err => console.log(err))
        },

        async updateUser({commit, dispatch}, user){
            axios.put('http://localhost:3060/updt-user', user.data)
                .then(()=>{
                    alert(`User updated!`)
                    dispatch('fetchUsers')
                    dispatch('closeUserDetailDialog')
                    commit('CLEAN_SELECTED_USER')
                })
                .catch(err => {return console.log(err)})
        },

        newUserDialog({commit}){
            commit('SET_NEWUSER_DIALOG_STATUS')
        },

        openConfirmationDiag({commit}, user){
            commit('SET_DEACTIVATEUSER_DIALOG')
            commit('SET_SELECTED_USER', user)
        },

        closeConfirmationDiag({commit}){
            commit('SET_DEACTIVATEUSER_DIALOG')
        },

        userDetailDialog(context, user){
            context.commit('SHOW_USERDETAIL_DIALOG')
            context.commit('SET_SELECTED_USER', user)
        },

        closeUserDetailDialog({commit}){
            commit('SHOW_USERDETAIL_DIALOG')
        }
    }

const mutations = {
        SET_LOADING_STATUS: (state, status) => {
            state.loadingStatus = status
        },
        SET_USERS: (state, users) => {
            state.users = users
        },
        SET_ERROR: (state, erro) => {
            state.error = erro
        },
        SET_NEWUSER_DIALOG_STATUS: (state) => {
            state.newUserDialog = !state.newUserDialog
        },
        ADD_NEWUSER: (state, user) => {
            state.users.push(user)
        },
        SET_DEACTIVATEUSER_DIALOG: (state) => {
            state.deactivateUserDialog = !state.deactivateUserDialog
        },
        SET_SELECTED_USER: (state, user) => {
            state.selectedUser = user
        },
        CLEAN_SELECTED_USER: (state) => {
            state.selectedUser = []
        },
        SHOW_USERDETAIL_DIALOG: (state) => {
            state.userUpdateDialog = !state.userUpdateDialog
        }
    }


export default {
    state,
    getters,
    actions,
    mutations
  };