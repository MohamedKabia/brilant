<template>
    <v-data-table
      :headers="headers"
      :items="departments"
      sort-by="name"
      class="elevation-1"
    >
      <template v-slot:item.hods="{item}">
          <div class="primary--text">
            <nuxt-link :to='"/staff/"+item._id'>
              <v-avatar
                size="36px"
              >
                <img
                  alt="Avatar"
                  src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                >
                
            </v-avatar>
            <span v-if="item.hods[0]">{{item.hods[0].firstName +" "+ item.hods[0].lastName}}</span>
            </nuxt-link>
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
              </div>
           
         
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
  import CreateDepartment from './DepartmentComponents/create.vue'
    export default {
      components:{CreateDepartment},
      data: () => ({
        createDialog:false,
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
          
          
          { text: 'HOD', value: 'hods' },
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
          this.createDialog=false;
        },
        editItem (item) {
          this.editedIndex = this.departments.indexOf(item);
          this.editedItem = Object.assign({}, item)
          let ho=[]
          let su=[]
          let te=[]
          if(this.editedItem.hods.length >0){
              let hod=this.editedItem.hods
              //h.push(hod._id)
              ho.push(hod[0]._id)
          }
          this.editedItem.hods=ho;

          if(this.editedItem.subjects.length >0){
            this.editedItem.subjects.forEach(sub=>{
              su.push({text:sub.name, value:sub._id})
            })
          }
          this.editedItem.subjects=su;

          if(this.editedItem.teachers.length >0){
            this.editedItem.teachers.forEach(teacher=>{
              te.push({text:teacher.staffId +'/'+ teacher.firstName,  value:teacher._id})
            })
          }
          this.editedItem.teachers=te;
          
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
        },
        save () {
          this.prepData();
          if (this.editedIndex > -1) {
            this.editedItem.hods=[{_id: this.editedItem.hods.value}]
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