<template>
  <v-row justify="center">
    <v-dialog v-model="showDiag" persistent max-width="600px">
      
      <v-card>
        <v-card-title>
          <span class="headline">User {{selectedUser.name}} Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field 
                label="Name*" 
                :placeholder="selectedUser.name"
                v-model="data.name"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field 
                label="Email*" 
                :placeholder="selectedUser.email"
                v-model="data.email"></v-text-field>
              </v-col>
              
              <v-col cols="12" sm="6">
                <v-switch
                    label="Admin?"
                    required
                ></v-switch>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeForm">Close</v-btn>
          <v-btn color="blue darken-1" text @click="updateUserForm(data)">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

  export default {
    props:{
        showDiag: Boolean
    },
    data(){
        return{
            data:{
                id: 0,
                name: null,
                email: null
            }
        }
    },
    computed: {
        ...mapGetters([
            'selectedUser'
        ]),
    },
    methods:{
        ...mapActions([
            'closeUserDetailDialog',
            'updateUser'
        ]),
        closeForm: function(){
            this.closeUserDetailDialog()
        },
        updateUserForm: function(data){
            this.data.id = this.selectedUser.id

            if(!data.name){
                this.data.name = this.selectedUser.name
            }
            if(!data.email){
                this.data.email = this.selectedUser.email
            }
            
            this.updateUser(this.data)
        },
    }

  }
</script>