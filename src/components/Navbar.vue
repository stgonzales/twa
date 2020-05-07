<template>
    <nav>
      <v-app-bar 
        flat 
        app
        class="text-uppercase teal lighten-1">
        <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>
          <span class="font-weight-light">tickets</span>
          <span>app</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn v-if="isLoggedIn" text @click="logout">
          <span>{{currentUser}}</span>
          <v-divider vertical class="mx-2"></v-divider>
          Sign Out
        <v-icon>mdi-exit-to-app</v-icon>
        </v-btn>
      </v-app-bar>

      <v-navigation-drawer 
      app
      v-model="drawer"
      class="teal darken-1"
      clipped-left
      temporary
      v-if="isLoggedIn"
      >
      <v-list>
        <v-list-item-group color="primary">
          <v-list-item
            v-for="(link) in menuLinks" 
            :key="link.text"
            exact-active-class
            router :to="link.route"
          >
          <v-list-item-content class="ml-4 mt-3">
            <v-list-item-title class="white--text">
              <v-icon class="white--text">{{link.icon}}</v-icon>
                {{link.text}}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    </nav>
</template>

<script>

export default {
  name: 'Navbar',
  props:{
    menuLinks:{
      type: Array
    }
  },
  data(){
    return{
      drawer: false,
      disabled: false,
      isLoggedIn: true,
      currentUser: false
    }
  },
  methods:{
    logout: function(){
      //TODO
    }
  }
}
</script>

<style>

</style>