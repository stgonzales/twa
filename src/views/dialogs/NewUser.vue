<template>
  <v-dialog app v-model="showDiag" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="teal lighten-1">
          <v-btn icon dark @click="closeForm" >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>New User</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="saveUser">Save</v-btn>
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
              <v-col cols="12">
                <v-checkbox v-model="data.admin" label="Admin(?)"></v-checkbox>
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
import { mapActions } from 'vuex'
import EventBus from '../../EventBus'

export default {
  props:{
    showDiag: Boolean
  },
  data(){
    return{
      data:{
        name: null,
        email: null,
        admin: false,
        active: true
      }
    }
  },
  computed: {
    ...mapActions([
      'newUserDialog',
      'saveNewUser'
    ])
  },
  mounted() {
    EventBus.$on('cleanNewUserForm', () => {
      this.cleanForm()
    });
  },
  methods:{
    cleanForm: function(){
      this.data.name = null
      this.data.email = null
      this.data.admin = false
    },
    closeForm: function(){
      this.cleanForm()
      this.newUserDialog
    },
    saveUser: function(e){
      e.preventDefault()
      this.saveNewUser(this.data)
    },
  }
}
</script>

<style>

</style>