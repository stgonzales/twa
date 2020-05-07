<template>
  <v-app :key="componentKey">
   <h1 class="subheading pb-3 ml-4 text-center" >Users</h1>
    <v-divider
    light
    >
    </v-divider>
    
    <v-container class="my-1">
    <v-btn 
    color="teal lighten-1" 
    class="white--text" 
    @click="newUser">
      <v-icon>mdi-plus</v-icon>
      New User</v-btn>            
    </v-container>
    
    <v-divider
    light
    >
    </v-divider>

    <v-container class="my-5">

      <v-card hover flat class="pa-3 ma-2" 
      v-for="user in users" 
      :key="user.id">
        <v-layout>
          <v-flex xs2 class="text-center">
            <v-avatar color="teal lighten-2">
              <v-icon dark>mdi-account-circle</v-icon>
            </v-avatar>
          </v-flex>
          <v-layout row wrap class="pl-1 ml-4">
              <v-flex xs12 md6>
              <div class="caption grey--text">User name</div>
              <div>{{user.name}}</div>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <div class="caption grey--text">e-mail</div>
              <div>{{user.email}}</div>
            </v-flex>
            <v-flex xs12 sm6 md2>
              <div class="caption grey--text">Admin(?)</div>
              <div>{{user.admin?"Yes":"No"}}</div>
            </v-flex>
          </v-layout>
        </v-layout>
      </v-card>
    </v-container>  
  </v-app>
</template>

<script>
import { eventBus } from '../main'
const axios = require('axios')

export default {
  name: 'Users',
  data(){
    return{
      users: null,
      componentKey: 0
    }
  },
  beforeCreate(){
    axios.get('http://localhost:3000/users')
      .then(res => this.users = res.data)
      .catch(err => console.log(err))
  },
  beforeUpdate(){
    axios.get('http://localhost:3000/users')
      .then(res => this.users = res.data)
      .catch(err => console.log(err))
  },
  methods:{
    newUser: function(){
      eventBus.$emit('showDiagNewuser')
    },
    updateUser: function(){
      this.componentKey += 1
    }
  }
}
</script>

<style>

</style>