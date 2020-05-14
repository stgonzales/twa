<template>
  <v-app>
   <h1 class="subheading pb-3 ml-4 text-center" >Users</h1>
    <v-divider
    light
    >
    </v-divider>
    
    <v-container class="my-1">
    <v-btn 
    color="teal lighten-1" 
    class="white--text"
    @click="newUserDialog">
      <v-icon>mdi-plus</v-icon> New User</v-btn>            
    <v-btn 
    color="teal lighten-1" 
    class="white--text"
    @click="fetchUsers">
      <v-icon>mdi-update</v-icon> Update List</v-btn>            
    </v-container>
    
    <v-divider
    light
    >
    </v-divider>
    
    <v-container v-if="getLoadingStatus">
      <h1>
        Loading data
      </h1>
    </v-container>

    <v-container v-else-if="getErrorMsg">
      <h1>
        A error ocurred while fetching data, please check the console.
      </h1>
      <p>Error: {{getErrorMsg}}</p>
    </v-container>

    <v-container v-else class="my-5">

      <v-card hover flat class="pa-3 ma-2" 
      v-for="user in allUsers" 
      :key="user.id">
        <v-layout>
          <v-flex xs2 class="text-center">
            <v-avatar color="teal lighten-2">
              <v-icon dark>mdi-account-circle</v-icon>
            </v-avatar>
          </v-flex>
          <v-layout row wrap class="pl-1 ml-4">
              <v-flex xs12 md5>
              <div class="caption grey--text">User name</div>
              <div>{{user.name}}</div>
            </v-flex>
            <v-flex xs12 sm6 md5>
              <div class="caption grey--text">e-mail</div>
              <div>{{user.email}}</div>
            </v-flex>
            <v-flex xs12 sm6 md2>
              <div class="caption grey--text">Admin(?)</div>
              <div>{{user.admin?"Yes":"No"}}</div>
            </v-flex>
          </v-layout>
          <v-flex>
            <v-icon @click="openConfirmationDiag(user)">mdi-close</v-icon>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
    <NewUserDialog v-bind:showDiag="getNewuserDialogStatus"  />
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import NewUserDialog from '@/views/dialogs/NewUser'

export default {
  name: 'Users',
  data(){
    return {
    }
  },
  components:{
    NewUserDialog
  },
  computed: {
    ...mapGetters([
      'allUsers', 
      'getErrorMsg',
      'getLoadingStatus',
      'getNewuserDialogStatus'
      ])
  },
  created(){
    this.fetchUsers()
    // axios.get('http://localhost:3060/users')
      // .then(res => this.users = res.data)
      // .catch(err => console.log(err))
  },
  // beforeUpdate(){
  //   axios.get('http://localhost:3060/users')
  //     .then(res => this.users = res.data)
  //     .catch(err => console.log(err))
  //},
  methods:{
    ...mapActions([
      'fetchUsers',
      'newUserDialog',
      'openConfirmationDiag'
    ])
  }
}
</script>

<style>

</style>