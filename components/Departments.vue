<template>
    <v-data-table
      :headers="headers"
      :items="departments"
      sort-by="hod"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar
          flat
         >
          <v-toolbar-title>Departments</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog
            v-model="dialog"
            max-width="600px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                Add New Subject
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
  
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.name"
                        label="Department name"
                        dense
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-combobox
                        v-model="editedItem.hods"
                        :items="teachers"
                        label="Hod"
                        dense
                        outlined  
                        ></v-combobox>
                    </v-col>

                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-combobox
                        v-model="editedItem.teachers"
                        :items="teachers"
                        label="Teachers"
                        dense
                        outlined  
                        multiple
                        ></v-combobox>
                    </v-col>

                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-combobox
                        v-model="editedItem.subjects"
                        :items="subjects"
                        label="Subjects"
                        dense
                        outlined  
                        multiple
                        ></v-combobox>
                    </v-col>
                    <v-col
                      cols="12"
                    >
                      <v-textarea
                        v-model="editedItem.description"
                        label="Description"
                      ></v-textarea>
                    </v-col>
                  
                  </v-row>
                 
                </v-container>
              </v-card-text>
  
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="secondary darken-1"
                  text
                  @click="close"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        
        <nuxt-link :to='"/departments/"+item.id'>
          <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
          >
            mdi-eye
          </v-icon>
        </nuxt-link>
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
     
    </v-data-table>
  </template>
  <script>
    export default {
      data: () => ({
        dialog: false,
        dialogDelete: false,
        headers: [
          {
            text: 'ID',
            align: 'start',
            sortable: true,
            value: '_id',
          },
          {
            text: 'Name',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          
          
          { text: 'HOD', value: 'hod[0].firstName' },
          { text: 'Actions', value: 'actions' },
        ],
        editedIndex: -1,
        editedItem: {
          name: '',
          hods: [],
          teachers: [],
          description:'',
          subjects:[]
        },
        defaultItem: {
          name: '',
          hods: [],
          teachers: [],
          description:'',
          subjects:[]
        },
      }),
  
    
  
      watch: {
        dialog (val) {
          val || this.close()
        },
        dialogDelete (val) {
          val || this.closeDelete()
        },
      },
  
     
      computed: {
        formTitle () {
          return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
        departments(){
          return this.$store.getters['management/getDepartments']
        },
        teachers(){
          let teachers =this.$store.getters['management/getTeachers']
          let data=[]
           teachers.forEach(teacher=>{
             data.push({ value: teacher._id, text:teacher.staffId + '/'+ teacher.firstName +" " +teacher.lastName},)
           })
           return data
        },
        subjects(){
          let s = this.$store.getters['management/getSubjects']
          console.log(s,'subjects cons')
          let data=[]
          if(s){
            s.forEach(subj=>{
             data.push({ value: subj._id, text:subj.name},)
           })
          }
           return data
        }
      },
      methods: {
   
        editItem (item) {
          this.editedIndex = this.departments.indexOf(item);
          this.editedItem = Object.assign({}, item)
          let h=[]
          if(this.editedItem.hods.length >0){
            this.editedItem.hods.forEach(hod=>{
              h.push(hod._id)
            })
          }
          this.editedItem.hods=h;
         
          this.dialog = true
        },
  
        deleteItem (item) {
          this.editedIndex = this.departments.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialogDelete = true
        },
  
        deleteItemConfirm () {
          this.departments.splice(this.editedIndex, 1)
          this.closeDelete()
        },
  
        close () {
          this.dialog = false
          this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
          })
        },
  
        closeDelete () {
          this.dialogDelete = false
          this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex =-1
          })
        },
        prepData(){
          let subject=[];
          let teacher=[];
          if(this.editedItem.subjects.length>0){
            this.editedItem.subjects.forEach(sub=>{
              subject.push({_id:sub.value})
            })
            this.editedItem.subjects=subject
           }
           if(this.editedItem.teachers.length>0){
            this.editedItem.teachers.forEach(te=>{
              teacher.push({_id:te.value})
            })
            this.editedItem.teachers=teacher
           }
           console.log(this.editedItem)
        },
        save () {
          this.prepData();
          if (this.editedIndex > -1) {
            this.editedItem.hods={_id: this.editedItem.hods.value}
            this.$store.dispatch('management/updateDepartment',this.editedItem)
          } else {
            this.editedItem.hods={_id: this.editedItem.hods.value}
            this.$store.dispatch('management/addDepartment',this.editedItem)
          }
          this.close()
        },
      },
    }
  </script>