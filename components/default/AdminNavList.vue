<template>
    <div>
      <v-list>
        <v-list-item to="/dashboard">
        <v-list-item-icon>
          <v-icon>mdi-view-dashboard</v-icon>
        </v-list-item-icon>

        <v-list-item-title>Dashboard</v-list-item-title>
      </v-list-item>
      <v-list-group
        v-for="item in items"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.action"
        no-action
        class:prependIcon="primary"
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="child in item.items"
          :key="child.title"
          :to="child.to"
        >
          <v-list-item-content>
            <v-list-item-title v-text="child.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>

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
      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-cog-outline</v-icon>
        </v-list-item-icon>

        <v-list-item-title>Settings</v-list-item-title>
      </v-list-item>
    </v-list>
    </div>
</template>
<script>
  export default {
    data: () => ({
      items: [
        {
          action: 'mdi-account-school-outline',
          items: [
          { title: 'Student List', to:'/students' },
          { title: 'Admission', to:'/students/admitstudent' },
          ],
          title: 'Students',
        },
        {
          action: 'mdi-human-male-board',
          items: [
            { title: 'Staff List', to:'/staffs' },
            { title: 'Add Staff', to:'/staff/add' },
            { title: 'Teachers', to:'/teachers' },
          ],
          title: 'Staffs',
        },
        {
          action: 'mdi-shape-outline',
          items: [{ title: 'Departments List', to:'/departments' }],
          title: 'Departments',
        },
        {
          action: 'mdi-town-hall',
          items: [{ title: 'All Levels', to:'/subjects' }],
          title: 'School Levels',
        },
        {
          action: 'mdi-book',
          items: [{ title: 'Subjects', to:'/subjects' }],
          title: 'Subjects',
        },
       
        {
          action: 'mdi-account',
          items: [
            { title: 'Fees & Collection', to:'/accounting/fees' },
            { title: 'Invoice', to:'/accounting/invoice'},
            { title: 'Salary', to:'/accounting/salary'},
            { title: 'Expenses', to:'/accounting/expenses'}
          ],
          title: 'Accounting',
        },
        {
          action: 'mdi-bus',
          items: [
            { title: 'Vehicle List', to:'vehicles'},
            { title: 'Staff Transport', to:'staff-passangers'},
            { title: 'Student Transport', to:'student-passanger'}
        ],
          title: 'Transportation',
        },
      ],
    }),
  }
</script>
<style>
  .v-list-item__icon  .v-icon {
    color: #5299D3;
}  
</style>