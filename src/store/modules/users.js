import axios from 'axios'
import EventBus from '../../EventBus'

const state = {
        allusers: [],
        selectedUser: [],
        isLoading: false,
    }

const getters = {
        AllUsers: state => {return state.allusers},
        LoadinStatus: state => {return state.loadingStatus},
        currentUser: state => {return state.selectedUser},
    }
    
const actions = {
        async fetchAllUsers({commit}){

            commit('UPDATE_LOADING_STATUS', true)
            await axios.get('http://209.97.131.52:3000/users')
                .then(res => {
                    commit('UPDATE_LOADING_STATUS', false)
                    commit('ALL_USERS_RESPONSE', res.data)
                })
                .catch(err => {
                    {return console.log(err)}
                })
        },

        async saveNewUser({commit}, user){
            commit('UPDATE_LOADING_STATUS', true)
            await axios.post('http://209.97.131.52:3000/new-user', user.data)
                .then((res) => {
                    if(res.data.message) {
                        commit('UPDATE_LOADING_STATUS', false)
                        alert(res.data.message)
                        console.log([res, res.data.message])
                    }else{
                        alert(`User ${res.data.name} created!`)
                        commit('UPDATE_LOADING_STATUS', false)
                        commit('ADD_NEWUSER', res.data);
                        EventBus.$emit("NewUserFormWindow")
                        EventBus.$emit("cleanNewUserForm")

                    }
                    
                })
                .catch(err => {return console.log(err)})
        },

        async updateUser({commit, dispatch}, user){
            axios.put('http://209.97.131.52:3000/updt-user', user.data)
                .then(()=>{
                    alert(`User updated!`)
                    dispatch('fetchAllUsers')
                    EventBus.$emit('EditUserWindow')
                    commit('CLEAN_SELECTED_USER')
                })
                .catch(err => {return console.error(err)})
        },
        
        editUser(context, user){
            context.commit('SELECTED_USER', user)
        },
    }

const mutations = {
        UPDATE_LOADING_STATUS: (state, status) => {
            state.isLoading = status
        },
        ALL_USERS_RESPONSE: (state, users) => {
            state.allusers = users
        },
        ADD_NEWUSER: (state, user) => {
            state.allusers.push(user)
        },
        CLEAN_SELECTED_USER: (state) => {
            state.selectedUser = []
        },
        SELECTED_USER: (state, user) => {
            state.selectedUser = user
            EventBus.$emit('EditUserWindow')
        },
    }


export default {
    state,
    getters,
    actions,
    mutations
  };