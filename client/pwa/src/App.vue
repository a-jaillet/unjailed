<template>
  <v-app>
    <v-app-bar
        color="warn"
        dark
    >

      <div>Claude</div>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <template v-slot:extension>
        <v-tabs
        centered>
          <v-tab to="/home">Home</v-tab>
          <v-tab to="/documents">Documents</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',

  data: () => ({
    //
  }),
});
</script>

<style scoped>
  .app-bar-title {
    width: 500px;
  }
</style>
