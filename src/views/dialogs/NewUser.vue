<template>
<v-row justify="center">
    <v-dialog 
    v-model="isThisWindowActive" 
    persistent 
    max-width="600px">
      
      <v-card>
        <v-card-title>
          <span class="headline">New User</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field 
                label="Full Name" 
                placeholder="ex. John Doe"
                v-model="data.name"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field 
                label="Email" 
                placeholder="ex. john.doe@gmail.com"
                v-model="data.email"></v-text-field>
              </v-col>

              <!-- TODO PASSWORD -->
              
              <v-col cols="12" sm="6">
                <v-switch
                    label="Admin?"
                    v-model="data.admin"
                    required
                ></v-switch>
              </v-col>
              <v-col cols="12" sm="6">
                <v-switch
                    label="Active?"
                    v-model="data.active"
                    required
                ></v-switch>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeForm">Close</v-btn>
          <v-btn color="blue darken-1" text @click="saveUser">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import EventBus from "../../EventBus";

export default {
  data() {
    return {
      data: {
        name: null,
        email: null,
        admin: false,
        active: true,
      },
      isThisWindowActive: false,
    };
  },
  mounted() {
    EventBus.$on("cleanNewUserForm", () => {
      this.cleanForm();
    });
    EventBus.$on("NewUserFormWindow", () => {
      this.isThisWindowActive = !this.isThisWindowActive;
    });
  },
  methods: {
    cleanForm: function() {
      this.data.name = null;
      this.data.email = null;
      this.data.admin = false;
    },
    closeForm: function() {
      this.cleanForm();
      this.isThisWindowActive = !this.isThisWindowActive;
    },
    saveUser: function(e) {
      e.preventDefault();
      this.$store.dispatch('saveNewUser', {data: this.data})
    },
  },
};
</script>

<style></style>
