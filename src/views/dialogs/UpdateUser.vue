<template>
  <v-row justify="center">
    <v-dialog v-model="isThisWindowActive" persistent max-width="600px">
      
      <v-card>
        <v-card-title>
          <span class="headline">Edit user {{currentUser.name}}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field 
                label="Name" 
                :placeholder="currentUser.name"
                v-model="user.name"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field 
                label="Email" 
                :placeholder="currentUser.email"
                v-model="user.email"></v-text-field>
              </v-col>
              
              <v-col cols="12" sm="6">
                <v-switch
                    label="Admin?"
                    v-model="user.admin"
                    required
                ></v-switch>
              </v-col>
              <v-col cols="12" sm="6">
                <v-switch
                    label="Active?"
                    v-model="user.active"
                    required
                ></v-switch>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeForm">Close</v-btn>
          <v-btn color="blue darken-1" text @click="updateUserForm(user)">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import {mapGetters} from 'vuex'
import EventBus from '../../EventBus'

  export default {
    data(){
        return{
            user:{
                id: 0,
                name: null,
                email: null,
                admin: null,
                active: null
            },
            isThisWindowActive: false,
        }
    },
    computed:{
      ...mapGetters([
        'currentUser'
      ])
    },
    mounted() {
      EventBus.$on('EditUserWindow', () =>{
        this.isThisWindowActive = !this.isThisWindowActive
        this.user.id = this.currentUser.id
        this.cleanData()
        this.user.admin = this.currentUser.admin
        this.user.active = this.currentUser.active
      })
    },
    methods:{
        closeForm: function(){
            this.$store.commit('CLEAN_SELECTED_USER')
            this.cleanData()
            this.isThisWindowActive = !this.isThisWindowActive
        },
        updateUserForm: function(user){
            if(!user.name){
                this.user.name = this.currentUser.name
            }
            if(!user.email){
                this.user.email = this.currentUser.email
            }
            
            this.$store.dispatch('updateUser', {data: this.user})
        },
        cleanData: function(){
          this.user.name = null
          this.user.email = null
        }
    }

  }
</script>