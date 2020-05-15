Ticket Web App (TWA)
---------------

This file will describe every component's rules and processes.

#### User component

User component must send the `GET` request to the api and get the user list. Vuex will handle every process and its described down below.

##### Users component `GET` request process

###### **Users.vue**

1. Mapped `{mapActions}` so computed propertie have access to all vuex **getters**

2. In *Methods:{}* instantiated the `...mapActions([])` and have access to all Vuex actions. 
*Note the was used the `...` spread operator to make it possible instantiate others methods.*

3. Use `creadted()` lifecycle hook to to call the `fecthUsers` action when the component is created.(previous instantiated step 2)
    
    ###### **Vuex store module (users.js)**

    - In the users.js store module, `actions`, is define the  async `fetchUsers` function that is responsible to request the user list to the backend api. The response is stored in the `users` state variable.
   
    - `allUsers` is defined in the `getters` making it possible to retrieve the users object list data in any component.

4. In the computed propertie instantiated the `...mapGetters([])` and have access to all Vuex getters.

5. Used `v-for` condition to render every item in `allUsers` action computed propertie.