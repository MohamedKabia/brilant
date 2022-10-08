<template>
    <div>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="students"
        item-key="id"
        class="elevation-1"
        show-select
        :search="search"
      >
        <template v-slot:top>
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
        </template>

        <template v-slot:item.firstName="{item}">
            <div class="primary--text">
              <nuxt-link :to='"/students/"+item.id'>
                 <span v-if="item">{{item.firstName}}</span>
                </nuxt-link>
            </div>
        </template>

        <template v-slot:item.actions>
           <div>
            <v-btn icon>
            <v-icon color="primary">mdi-eye</v-icon>
           </v-btn>
           <v-btn icon color="info">
            <v-icon>mdi-delete</v-icon>
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
          students: [
            {
              id:'1',
              firstName:'Frozen Yogurt',
              class: 159,
              dob: 6.0,
              grade: 24,
              
            },
            {
              id:'2',
              firstName:'Ice  sandwich',
              class: 237,
              dob: 9.0,
              grade: 37,
              
            },
            {
              id:'3',
              firstName: 'Eclair',
              class: 262,
              dob: 16.0,
              grade: 23,
             
            },
            {
              id:'4',
              firstName: 'Cupcake',
              class: 305,
              dob: 3.7,
              grade: 67,
             
            },
            {
              id:'5',
              firstName: 'Gingerbread',
              class: 356,
              dob: 16.0,
              grade: 49,
              
            },
            {
              id:'6',
              firstName: 'Jelly bean',
              class: 375,
              dob: 0.0,
              grade: 94,
            },
            {
              id:'12',
              firstName: 'Lollipop',
              class: 392,
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
              value: 'id',
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