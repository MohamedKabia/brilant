<template>
    <v-data-table
      :headers="headers"
      :items="departments"
      sort-by="name"
      class="elevation-1"
    >
      <template v-slot:item.hods="{item}">
          <div class="primary--text" v-if="item.hods[0]">
            <nuxt-link :to='"/staff/"+item._id'>
              <v-avatar
                size="36px"
              >
                <img
                  alt="Avatar"
                  :src="baseUrl+'/'+item.hods[0].pp"
                >
                
            </v-avatar>
            <span v-if="item.hods[0]">{{item.hods[0].firstName +" "+ item.hods[0].lastName}}</span>
            </nuxt-link>
          </div>
        </template>
        <template v-slot:item.teachers="{item}">
          <div class="primary--text" >
            {{ item.teachers.length }}
          </div>
        </template>
         <template v-slot:item.subjects="{item}">
          <div class="primary--text" >
            {{ item.subjects.length }}
          </div>
        </template>
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
          
              <div>
                <v-btn
                color="primary"
                dark
                class="mb-2"
                @click="createDialog = !createDialog"
              >
                Add New Department
              </v-btn>
              <CreateDepartment :dialog="createDialog" @update:option="closeDialog"/>
               <EditDepartment :editedItem="editedItem" :dialog="editDialog" @update:option="closeDialog"/>
              </div>
           
         
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h6 warning--text">Are you sure you want to delete this department? This may cause error if it has bben linked to staff, schools or students</v-card-title>
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
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
          color="info"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
          color="error"
        >
          mdi-delete
        </v-icon>
      </template>
     
    </v-data-table>
  </template>
  <script>
  import CreateDepartment from './DepartmentComponents/create.vue';
  import EditDepartment from './DepartmentComponents/edit.vue'
    export default {
      components:{CreateDepartment,EditDepartment},
      data: () => ({
        editDialog:false,
        createDialog:false,
        dialog: false,
        dialogDelete: false,
        headers: [
          
          {
            text: 'Name',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          
          
          { text: 'HOD', value: 'hods' },
          {
            text: 'NO of Subjects',
            value: 'subjects',
          },
          {
            text: 'NO of Teachers',
            value: 'teachers',
          },
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
        baseUrl(){
          return this.$store.getters['management/baseUrl']
        }, 
        formTitle () {
          return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
        departments(){
          return this.$store.getters['management/getDepartments']
        },
        teachers(){
          let teachers =null//this.$store.getters['management/getTeachers']
          let data=[]
           if(teachers){
            teachers.forEach(teacher=>{
             data.push({ value: teacher._id, text:teacher.staffId + '/'+ teacher.firstName +" " +teacher.lastName},)
           })
           }
          
           return data
        },
        subjects(){
          let s = this.$store.getters['management/getSubjects']
          let data=[]
          if(s){
            s.forEach(subj=>{
             data.push({ value: subj._id, text:subj.name},)
           })
          }
          console.log(data)
           return data
        }
      },
      
      methods: {
        closeDialog(){
          this.editDialog=false;
          this.createDialog=false;
        },
        
        editItem (item) {
          this.editedIndex = this.departments.indexOf(item);
          this.editedItem = Object.assign({}, item);
          console.log(this.editedItem,"item ediy")
          this.editDialog = true
        },
  
        deleteItem (item) {
          this.editedIndex = this.departments.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialogDelete = true
        },
  
        deleteItemConfirm () {
          this.$store.dispatch('management/deleteDepartment',this.editedItem)
          //this.departments.splice(this.editedIndex, 1)
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
        
        
      },
    }
  </script>