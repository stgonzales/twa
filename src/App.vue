<template>
  <v-app id="app">
    <Navbar :menuLinks="links"/>
    <v-content class="mt-4 blue-grey lighten-5">
      <router-view></router-view>
      <Newuser />
    </v-content>
    <!--<v-content class="mt-8">
      <Footer/>
    </v-content>-->
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'
import Newuser from '@/views/dialogs/NewUser'

export default {
  name: 'App',
  components: { Navbar, Newuser},
  data(){
    return{
      // eslint-disable-next-line vue/no-dupe-keys
      links:[
        {icon:'mdi-view-dashboard',text: 'Dashboard', route: '/'},
        {icon:'mdi-view-list',text: 'Costumers', route: '/costumers'},
        {icon:'mdi-account-circle',text: 'Users', route: '/users'},
        {icon: 'mdi-settings', text: 'Settings', route: '/settings'}
      ]

    }
  }
};
</script>