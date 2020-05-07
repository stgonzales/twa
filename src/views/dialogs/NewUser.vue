<template>
  <v-dialog app v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="teal lighten-1">
          <v-btn icon dark @click="closeForm" >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>New User</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="saveNewUser">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-content>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="data.name" label="Full Name*" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="data.email" label="Email*" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        </v-content>
      </v-card>
    </v-dialog>
</template>

<script>
import { eventBus } from '../../main'
import axios from 'axios'

export default {

  data(){
    return{
      dialog: false,
      data:{
        name: "",
        email: ""
      }
    }
  },
  created(){
    eventBus.$on('showDiagNewuser', ()=>{
      this.dialog = true      
    })
  },
  methods:{
    saveNewUser: function(){
      
      axios.post('http://localhost:3000/new-user', this.data)
            .then((res) => {
              console.log(res.data)
              this.closeForm()
            })
            .catch(err => console.log(err))
      
    },
    closeForm: function(){
      this.dialog = false
      this.data.name = null
      this.data.email = null
      eventBus.$emit('reRenderComponent')
    }
  }
}
</script>

<style>

</style>