<template>
  <v-app>
    <h1 class="subheading pb-3 ml-4 text-center">Users</h1>
    <v-divider light> </v-divider>

    <v-container class="my-1">
      <v-btn color="teal lighten-1" class="white--text" @click="newUserDialog">
        <v-icon>mdi-plus</v-icon> New User</v-btn
      >
      <v-btn fab small dark color="teal lighten-1" class="mx-3" @click="fetchUsers">
        <v-icon >mdi-update</v-icon>
      </v-btn
      >
    </v-container>

    <v-divider light> </v-divider>

    <v-container v-if="getLoadingStatus">
      <v-dialog v-model="getLoadingStatus" hide-overlay persistent width="300">
        <v-card color="teal lighten-1" dark>
          <v-card-text>
            Loading data...
            <v-progress-linear indeterminate color="white" class="mb-0">
            </v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-container>

    <v-container v-else-if="getErrorMsg">
      <v-card
        flat
        class="pa-3 ma-2 text-center"
        v-for="user in allUsers"
        :key="user.id"
      >
        <h1>
          A error ocurred while fetching data, please check the console.
        </h1>
        <p>Error: {{ getErrorMsg }}</p>  
      </v-card>
    </v-container>

    <v-container v-else class="my-5">
      <v-card
        hover
        flat
        class="pa-3 ma-2"
        v-for="user in allUsers"
        :key="user.id"
      >
        <v-layout @click="userDetailDialog(user)">
          <v-flex xs2 class="text-center">
            <v-avatar color="teal lighten-2">
              <v-icon dark>mdi-account-circle</v-icon>
            </v-avatar>
          </v-flex>
          <v-layout row wrap class="pl-1 ml-4">
            <v-flex xs12 md5>
              <div class="caption grey--text">User name</div>
              <div>{{ user.name }}</div>
            </v-flex>
            <v-flex xs12 sm6 md5>
              <div class="caption grey--text">e-mail</div>
              <div>{{ user.email }}</div>
            </v-flex>
            <v-flex xs12 sm6 md2>
              <div class="caption grey--text">Admin(?)</div>
              <div>{{ user.admin ? "Yes" : "No" }}</div>
            </v-flex>
          </v-layout>
        </v-layout>
      </v-card>
    </v-container>
    <NewUserDialog v-bind:showDiag="getNewuserDialogStatus" />
    <UpdateUser v-bind:showDiag="userUpdateDialog" />
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import NewUserDialog from "@/views/dialogs/NewUser";
import UpdateUser from "@/views/dialogs/UpdateUser";

export default {
  name: "Users",
  data() {
    return {};
  },
  components: {
    NewUserDialog,
    UpdateUser,
  },
  computed: {
    ...mapGetters([
      "allUsers",
      "getErrorMsg",
      "getLoadingStatus",
      "getNewuserDialogStatus",
      "userUpdateDialog",
    ]),
  },
  created() {
    this.fetchUsers();
    // axios.get('http://localhost:3060/users')
    // .then(res => this.users = res.data)
    // .catch(err => console.log(err))
  },
  // beforeUpdate(){
  //   axios.get('http://localhost:3060/users')
  //     .then(res => this.users = res.data)
  //     .catch(err => console.log(err))
  //},
  methods: {
    ...mapActions([
      "fetchUsers",
      "newUserDialog",
      "openConfirmationDiag",
      "userDetailDialog",
    ]),
  },
};
</script>

<style></style>
