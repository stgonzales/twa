Ticket Web App (TWA)
---------------

This file will describe every component's rules and processes.

#### User component

User component must send the `GET` request to the api and get the user list. Vuex will handle every step and it's described down below.

##### Users component `GET` request process

###### **Users.vue**

1. Imported `{mapActions}` from `vuex` so computed propertie have access to all Vuex **getters**

    `import { mapGetters, mapActions } from "vuex";`

2. In *Methods:{}* instantiated the `...mapActions([])` and have access to all Vuex **actions**.

    ```
    methods: {
        ...mapActions([
        "fetchUsers",
        ]),
    }
    ```

> *Note the was used the `...` spread operator to make it possible instantiate others methods.*

3. Use `creadted()` lifecycle hook to to call the `fecthUsers` action when the component is created.(previous instantiated step 2)

    ```
    created() {
        this.fetchUsers();
    },
    ```
    
    ###### **Vuex store module (users.js)**

    - In the users.js store module, `actions`, is define the  async `fetchUsers` function that is responsible to request the user list to the backend api.

        ```
        async fetchUsers({commit}){
            commit('SET_LOADING_STATUS', true)
            await axios.get(<API-Rest-Address>)
                .then(res => {
                    commit('SET_LOADING_STATUS', false)
                    commit('SET_USERS', res.data)
                })
                .catch(err => {
                    commit('SET_ERROR', err)
                    console.log(err)
                })
        }
        ```

    - The response is stored in the `users` state variable by the mutation `SET_USERS`.

        `commit('SET_USERS', res.data)`
    
    - Use the mutation to set the state variable `getLoadingStatus` to true or false.

        `commit('SET_LOADING_STATUS', true || false)`
   
    - `allUsers` is defined in the `getters` making it possible to retrieve the users object list data in any component.

        `allUsers: state => {return state.users}`

###### **Users.vue**

4. In the computed propertie instantiated the `...mapGetters([])` and have access to all Vuex getters.
```
computed: {
        ...mapGetters([
        "allUsers",
    ]),
}
```

5. Used `v-for` condition to render every item in `allUsers` action computed propertie.

    `v-for="user in allUsers"`