<template>
    <div>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="students"
        item-key="_id"
        class="elevation-1"
        show-select
        :search="search"
      >
        
        <template v-slot:top>
        <v-toolbar
          flat
         >
          <v-toolbar-title>Students</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <div class="pt-4">
            <v-text-field
            v-model="search"
            label="Search...."
            class="mx-4"
            outlined
            dense
            append-icon="mdi-magnify"
          ></v-text-field>
          </div>
              <v-btn
                color="primary"
                dark
                class="mb-2"
                to="/students/admitstudent"
                v-on="on"
              >
                Add New Student
              </v-btn>
            </v-toolbar>
          </template>

        <template v-slot:item.firstName="{item}">
            <div class="primary--text">
              <nuxt-link :to='"/students/"+item._id'>
                <v-avatar
                  size="36px"
                >
                  <img
                    alt="Avatar"
                    src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                  >
                  
                </v-avatar>
                <span v-if="item">{{item.firstName +" "+ item.lastName}}</span>
                </nuxt-link>
            </div>
        </template>

        <template v-slot:item.actions="{item}">
           <div>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="info"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  icon
                >
                <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(link, index) in links"
                  :key="index"
                  :to='"/"+link.to+"/"+ item._id'
                >
                  <v-list-item-title>{{ link.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
           <v-btn icon color="success" :to='"/students/edit/"+item._id'>
            <v-icon>mdi-pencil</v-icon>
           </v-btn>
           </div>
        </template>
        

      </v-data-table>
    </div>
  </template>
  <script>
    export default {
      data () {
        return {
        selected: [],
          search: '',
          links: [
        { title: 'Bills and Fees', to:'studentbill'},
        { title: 'Grades and Performance', to:'grade'},
        { title: 'attendance', to:'studentattendance'},
        { title: 'Click Me 2', to:''},
      ],
          students: [
            {
              _id:'1',
              firstName:'Mohamed',
              lastName: 'Kanu',
              class: 2,
              dob: 6.0,
              grade: 24,
              
            },
            {
              _id:'2',
              firstName:'Alice',
              lastName: 'Turay',
              class: 12,
              dob: 9.0,
              grade: 37,
              
            },
            
            {
              _id:'4',
              firstName: 'James',
              lastName: 'Kamara',
              class: 13,
              dob: 3.7,
              grade: 67,
             
            },
            {
              _id:'5',
              firstName: 'Glorus',
              lastName: 'Williams',
              class: 12,
              dob: 16.0,
              grade: 49,
              
            },
            {
              _id:'6',
              firstName: 'Joice',
              lastName: 'Jones',
              class: 8,
              dob: 0.0,
              grade: 94,
            },
            {
              _id:'12',
              firstName: 'Ladipo',
              lastName: 'Wilkison',
              class: 11,
              dob: 0.2,
              grade: 98,
            },
          ],
        }
      },
      computed: {
        headers () {
          return [
          {
              text: 'ID',
              align: 'start',
              sortable: true,
              value: '_id',
            },
            {
              text: 'First Name',
              align: 'start',
              sortable: false,
              value: 'firstName',
            },
            {
              text: 'Class',
              value: 'class',
              filter: value => {
                if (!this.class) return true
  
                return value < parseInt(this.class)
              },
            },
            { text: 'DOB', value: 'dob' },
            { text: 'Grade/Form', value: 'grade' },
            { text: 'Actions', value: 'actions' },
          ]
        },
      },
      methods: {
        view(val){
          console.log(val)
        }
      },
    }
  </script>