<template>
  <v-row justify="center">
    <v-dialog v-model="getdeactiveuserDialogStatus" persistent max-width="400">
      <v-card>
        <v-card-title class="headline">Are you really want to deactivate user {{selectedUser.name}}?</v-card-title>
        <v-card-text>By clicking 'Yes' the user will not be delete on the database but deactivated, so every past activities can be traceble.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="closeConfirmationDiag">Cancel</v-btn>
          <v-btn color="red darken-1" text @click="deleteUser(selectedUser.id)">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

  export default {
    data () {
      return {
      }
    },
    computed:{
        ...mapGetters([
            'getdeactiveuserDialogStatus',
            'selectedUser'
        ])
    },
    methods:{
        ...mapActions([
            'deleteUser',
            'closeConfirmationDiag'
        ])
    }
  }
</script>