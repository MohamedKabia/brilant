<template>
    <div>
      <v-data-table
        :headers="headers"
        :items="students"
      >
        
        <template v-slot:item.grade="props">
          <v-edit-dialog
            :return-value.sync="props.item.grade"
            large
            persistent
            @save="save"
            @cancel="cancel"
            @open="open"
            @close="close"
          >
            <div>{{ props.item.grade }}</div>
            <template v-slot:input>
              <div class="mt-4 text-h6">
                Update Grade
              </div>
              <v-text-field
                v-model="props.item.grade"
                :rules="[max25chars]"
                label="Edit"
                single-line
                counter
                autofocus
              ></v-text-field>
            </template>
          </v-edit-dialog>
        </template>
      </v-data-table>
  
      <v-snackbar
        v-model="snack"
        :timeout="3000"
        :color="snackColor"
      >
        {{ snackText }}
  
        <template v-slot:action="{ attrs }">
          <v-btn
            v-bind="attrs"
            text
            @click="snack = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </template>
  <script>
    export default {
      data () {
        return {
          snack: false,
          snackColor: '',
          snackText: '',
          max25chars: v => v.length <= 3 || 'Input too long!',
          pagination: {},
          headers: [
          {
              text: 'Student ID ',
              align: 'start',
              sortable: false,
              value: 'studentId',
            },
            {
              text: 'Name ',
              align: 'start',
              sortable: false,
              value: 'name',
            },
            { text: 'Grade (%)', value: 'grade' },
           
          ],
          students: [
            {
              studentId:'22',
              name: 'Frozen Yogurt',
              grade: 6.0,
              
            },
            {
              studentId:'12',
              name: 'Ice cream sandwich',
              
              grade: 9.0,
             
            },
            {
              studentId:'23',
              name: 'Eclair',
              grade: 16.0,
             
            },
            {
              studentId:'42',
              name: 'Cupcake',
              grade: 3.7,
             
            },
            {
              studentId:'62',
              name: 'Gingerbread',
              grade: 16.0,
              
            },
           
            {
              studentId:'24',
              name: 'Gingerbread',
              grade: 16.0,
            
            },
          ],
        }
      },
      methods: {
        save () {
          this.snack = true
          this.snackColor = 'success'
          this.snackText = 'Data saved'
        },
        cancel () {
          this.snack = true
          this.snackColor = 'error'
          this.snackText = 'Canceled'
        },
        open () {
          this.snack = false
          this.snackColor = 'info'
          this.snackText = 'Dialog opened'
        },
        close () {
          console.log('Dialog closed')
        },
      },
    }
  </script>