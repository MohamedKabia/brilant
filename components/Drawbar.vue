<template>
    <div>
        <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      flat
      v-if="user"
    >
    <userAvatarVue/>
      <StudentNavList v-if="user.role=='Student'"/>
      <AdminNavList  v-if="user.role=='Admin'"/>
      <staffNavListVue v-if="user.role=='Staff'" />
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
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" color="primary"/>
      <v-spacer></v-spacer>

      <v-btn icon><v-icon color="primary">mdi-bell</v-icon></v-btn>
      <v-btn icon to="profile"><v-icon color="secondary">mdi-account</v-icon></v-btn>
    </v-app-bar>
    <LoaderVue/>
    </div>
</template>

<script>
  import userAvatarVue from './default/userAvatar.vue';
  import AdminNavList from './default/AdminNavList.vue';
  import StudentNavList from './default/StudentNavList.vue';
  import staffNavListVue from './default/staffNavList.vue';
  import LoaderVue from './default/Loader.vue';
    export default {
      name: 'DefaultLayout',
      components:{userAvatarVue,AdminNavList,StudentNavList,staffNavListVue,LoaderVue},
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
      },

      computed: {
        user(){
            return this.$store.getters['account/getUser']
        },
        roles(){
          /*let  userRoles=[];
          if(this.user){
              let roles =this.user.roles;
              roles.forEach(role => {
                userRoles.push(role.role)
              });
              return userRoles
          }*/
          return []
        }
	    },
      mounted() {
       
            let authToken = window.localStorage.getItem("authToken");
            if(authToken){
              let data =JSON.parse(authToken)
              this.$store.dispatch('account/verifyToken',data);
            }else this.$router.push('/login')      
      },
      
      watch: {
        user(val){
          if(val == null || val == undefined){
            this.$router.push('/login') 
          }
          
        }
	    },
    }
    </script>
    