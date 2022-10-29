<template>
    <div>
      <v-list>

        <v-list-item to="/dashboard">
        <v-list-item-icon>
          <v-icon>mdi-view-dashboard</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Dashboard</v-list-item-title>
      </v-list-item>
     
      <div v-if="roles.includes('Teacher')">
        <v-list-item v-for="item in teacherItems" :key="item.to" :to="item.to">
        <v-list-item-icon>
          <v-icon>{{item.icon}}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{item.title}}</v-list-item-title>
      </v-list-item>
      </div>
      <div v-if="roles.includes('Bursear')">
        <v-list-item v-for="item in burserItems" :key="item.to" :to="item.to">
        <v-list-item-icon>
          <v-icon>{{item.icon}}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{item.title}}</v-list-item-title>
      </v-list-item>
      </div>

      <v-list-item v-for="item in staffItem" :key="item.to" :to="item.to">
        <v-list-item-icon>
          <v-icon>{{item.icon}}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{item.title}}</v-list-item-title>
      </v-list-item>

      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-table</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Time Table</v-list-item-title>
      </v-list-item>

      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-calendar-clock-outline</v-icon>
        </v-list-item-icon>
        
        <v-list-item-title>Event & Calender</v-list-item-title>
      </v-list-item>
     
    </v-list>
    </div>
</template>
<script>
  export default {
    data: () => ({
      staffItem:[
        {
          title: 'Attendance', to:'/staff/attendance',icon:'mdi-request'
        },
        {
          title: 'Leave Requests', to:'/staff/leave',icon:'mdi-time'
        },
        {
          title: 'Profile', to:'/staff/profile',icon:'mdi-person'
        }
      ],
      
      teacherItems:[
        {
          title: 'Grading', to:'/grading',icon:'mdi-grade'
        },
        {
          title: 'Classes', to:'/classes',icon:'mdi-time'
        },
        {
          title: 'Subjects & Modules', to:'/modules',icon:'mdi-person'
        }
      ],
      burserItems:[
        {
          title: 'Bills & Fees Collection', to:'/bills',icon:'mdi-money'
        },
        {
          title: 'Invoices', to:'/invoice',icon:'mdi-daller'
        },
        {
          title: 'Salary & Lone', to:'/salary',icon:'mdi-person'
        }
      ],
    }),
    computed: {
        user(){
            return this.$store.getters['account/getUser']
        },
        roles(){
          let  userRoles=[];
          let roles =this.user.roles;
          roles.forEach(role => {
            userRoles.push(role.role)
          });
          return userRoles
        }
	    },
  }
</script>
<style>
  .v-list-item__icon  .v-icon {
    color: #5299D3;
}  
</style>