<template>
    <div>
      <v-list>
        <v-list-item v-for="item in items" :key="item.title">
        <v-list-item-icon>
          <v-icon>{{item.icon}}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{item.title}}</v-list-item-title>
      </v-list-item>
       
    </v-list>
    </div>
</template>
<script>
  export default {
    data: () => ({
        items: [
          { title: 'Dashboard' , icon:'mdi-view-dashboard'},//time table assignments
          { title: 'Transcript' , icon:'mdi-file-account'},
          { title: 'Attendance', icon:'mdi-book-open-page-variant ' },
          { title: 'Profile', icon:'mdi-badge-account-horizontal-outline' },
          {title:'Events & Calendar', icon:'mdi-calendar-clock-outline'}
          ],
    }),
  }
</script>
<style>
  .v-list-item__icon  .v-icon {
    color: #5299D3;
}  
</style>