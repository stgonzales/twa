<template>
  <v-app>
    <h1 class="subheading pb-3 ml-4 text-center">Customers</h1>
    <v-divider light> </v-divider>

    <v-container class="my-0">
      <v-btn small dark color="teal lighten-1" class="white--text">
        <v-icon class="mr-2">mdi-plus</v-icon> New Customer</v-btn
      >
      <v-btn small dark color="teal lighten-1" class="mx-3">
        <v-icon class="mr-2">mdi-update</v-icon> Update List
      </v-btn>
      <v-col>
        <v-text-field
          label="Search Customer"
          placeholder="ex. Amazon"
          outlined
          v-model="search"
          class="font-weight-light"
        ></v-text-field>
      </v-col>
    </v-container>

    <v-divider light> </v-divider>
  </v-app>
</template>

<script>
export default {
  data(){
    return {
      search: ''
    }
  }
};
</script>

<style></style>
