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
              <nuxt-link :to='"/departments/"+item.id'>
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
              hod: 6.0,
              
            },
            {
              id:'2',
              firstName:'Ice  sandwich',
              class: 237,
              hod: 9.0,
              
            },
            
            {
              id:'5',
              firstName: 'Gingerbread',
              hod: 16.0,
              grade: 49,
              
            },
            {
              id:'6',
              firstName: 'Jelly bean',
              hod: 0.0,
            },
            {
              id:'12',
              firstName: 'Lollipop',
              hod: 0.2,
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
              text: 'Name',
              align: 'start',
              sortable: false,
              value: 'firstName',
            },
           
            { text: 'HOD', value: 'hod' },
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