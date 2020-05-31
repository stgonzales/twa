<template>
  <v-app>
    <h1 class="subheading pb-3 ml-4 text-center">Users</h1>
    <v-divider light> </v-divider>

    <v-container class="my-0">
      <v-btn small dark color="teal lighten-1" class="white--text" @click="openNewUserWindow">
        <v-icon class="mr-2">mdi-plus</v-icon> New User</v-btn
      >
      <v-btn  small dark color="teal lighten-1" class="mx-3" @click="fetchAllUsers">
        <v-icon class="mr-2">mdi-update</v-icon> Update List
      </v-btn
      >
      <v-col>
        <v-text-field
          label="Search User"
          placeholder="ex. John Doe"
          outlined
          v-model="search"
        ></v-text-field>
      </v-col>
    </v-container>

    <v-divider light> </v-divider>

    <v-container v-if="LoadinStatus">
      <v-dialog v-model="LoadinStatus" hide-overlay persistent width="300">
        <v-card color="teal lighten-1" dark>
          <v-card-text>
            Loading data...
            <v-progress-linear indeterminate color="white" class="mb-0">
            </v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-container>

    <!-- <v-container v-else-if="getErrorMsg">
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
    </v-container> -->

    <v-container v-else class="my-5">
      <v-card
        hover
        flat
        class="pa-3 ma-2"
        v-for="user in filteredUserList"
        :key="user.id"
        :class="{'grey lighten-1': !user.active}"
      >
        <v-layout @click="editUser(user)">
          <v-flex xs2 class="text-center">
            <v-avatar color="teal lighten-2" :class="{'grey lighten-1': !user.active}">
              <v-icon dark>mdi-account-circle</v-icon>
            </v-avatar>
          </v-flex>
          <v-layout row wrap class="pl-1 ml-4">
            <v-flex xs12 md4>
              <div class="caption grey--text">User name</div>
              <div>{{ user.name }}</div>
            </v-flex>
            <v-flex xs12 sm4 md4>
              <div class="caption grey--text">e-mail</div>
              <div>{{ user.email }}</div>
            </v-flex>
            <v-flex xs12 sm4 md2>
              <div class="caption grey--text">Admin(?)</div>
              <div>{{ user.admin == 1 ? "Yes" : "No" }}</div>
            </v-flex>
            <v-flex xs12 sm4 md2>
              <div class="caption grey--text">Active(?)</div>
              <div>{{ user.active == 1 ? "Yes" : "No" }}</div>
            </v-flex>
          </v-layout>
        </v-layout>
      </v-card>
    </v-container>
    <NewUserDialog />
    <UpdateUser />
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import NewUserDialog from "@/views/dialogs/NewUser";
import UpdateUser from "@/views/dialogs/UpdateUser";

import EventBus from '../EventBus'

export default {
  name: "Users",
  data() {
    return {
      search: ''
    }
  },
  components: {
    NewUserDialog,
    UpdateUser,
  },
  computed: {
    ...mapGetters([
      "AllUsers",
      "LoadinStatus"
    ]),
    filteredUserList() {
      return this.AllUsers.filter(user => user.name.toLowerCase().includes(this.search.toLowerCase()))
    }
  },
  created() {
    this.fetchAllUsers();
  },
  methods: {
    ...mapActions([
      "fetchAllUsers",
      "editUser"
    ]),
    openNewUserWindow: ()=>{
      EventBus.$emit('NewUserFormWindow')
    },
  },
};
</script>

<style></style>
