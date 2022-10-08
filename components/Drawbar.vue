<template>
    <div>
        <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      flat
    >
    <userAvatarVue/>
      <StudentNavList v-if="false"/>
      <AdminNavList/>
      <v-list v-if="false">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact 
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      flat
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" light/>
      
    </v-app-bar>
    </div>
</template>

<script>
  import userAvatarVue from './default/userAvatar.vue';
  import AdminNavList from './default/AdminNavList.vue';
  import StudentNavList from './default/StudentNavList.vue';
    export default {
      name: 'DefaultLayout',
      components:{userAvatarVue,AdminNavList,StudentNavList},
      data () {
        return {
          clipped: false,
          drawer: false,
          fixed: false,
          items: [
            {
              icon: 'mdi-apps',
              title: 'Welcome',
              to: '/'
            },
            {
              icon: 'mdi-chart-bubble',
              title: 'Inspire',
              to: '/inspire'
            }
          ],
          miniVariant: false,
          right: true,
          rightDrawer: false,
          title: 'Vuetify.js'
        }
      }
    }
    </script>
    