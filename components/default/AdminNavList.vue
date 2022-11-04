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
            { title: 'Staff List', to:'/staff/list' },
            { title: 'Add Staff', to:'/staff/add' },
            { title: 'Teachers', to:'/staff/teachers' },
          ],
          title: 'Staff',
        },
       
        {
          action: 'mdi-shape-outline',
          items: [
            { title: 'Departments List', to:'/departments/list' },
          ],
          title: 'Departments',
        },
       
        {
          action: 'mdi-town-hall',
          items: [
            { title: 'School Levels', to:'/setup/schools'},
            { title: 'Clases Group', to:'/setup/clases'},
            { title: 'Levels', to:'/setup/levels'}
        ],
          title: 'School Setup',
        },
        {
          action: 'mdi-book',
          items: [{ title: 'Subjects', to:'/subjects' }],
          title: 'Subjects',
        },
        {
          action: 'mdi-microsoft-windows-classic',
          items: [{ title: 'Grades', to:'/grading' }],
          title: 'Grading',
        },
        {
          action: 'mdi-account',
          items: [
            { title: 'Fees & Collection', to:'/accounting/fees' },
            { title: 'Invoice', to:'/accounting/invoice'},
            { title: 'Salary', to:'/accounting/salary'},
            { title: 'Expenses', to:'/accounting/expenses'},
            { title: 'Bills/Fees', to:'/bills'},
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