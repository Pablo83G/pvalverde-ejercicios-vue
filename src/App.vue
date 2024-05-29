<template>
  <v-app id="inspire" style="background-color: rgb(199, 199, 230);">
    <v-navigation-drawer style="background-color: teal;" v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6 texto-blanco">
            Ejercicios Vue.js y vuex
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
          <v-list-item-icon>
            <v-icon style="color: rgb(255, 255, 255);">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="texto-blanco">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app style="background-color: teal">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title style="color: rgb(255, 255, 255);">EJERCICIOS VUE.JS</v-toolbar-title>
    </v-app-bar>

    <v-main style="background-color: rgb(199, 199, 230);">
      <router-view />
    </v-main>

  </v-app>
</template>

<script>
export default {
  name: 'App',

    data: () => ({
      drawer: null,
      items: [
        { title: 'Home', icon: 'mdi-home', to: '/' },
        { title: 'Artistas', icon: 'mdi-account-multiple', to: '/artistas' },
        { title: 'Discos', icon: 'mdi-folder', to: '/discos' },
        { title: 'Ejercicio 2', icon: 'mdi-account-multiple-plus', to: '/d&d' },
      ],
    }),
  }
</script>
