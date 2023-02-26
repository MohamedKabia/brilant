<template>
    <div v-if="classes">
        <v-data-table
        :headers="headers"
        :items="classes"
        sort-by="name"
        class="elevation-1"
        >
        <template v-slot:item.formMaster="{item}">
            <div class="primary--text" v-if="item.formMaster">
                <nuxt-link :to='"/staff/"+item.formMaster._id'>
                <v-avatar
                    size="36px"
                >
                    <img
                    alt="Avatar"
                    :src="baseUrl+'/'+item.formMaster.pp"
                    >
                    
                </v-avatar>
                <span v-if="item.formMaster">{{item.formMaster.firstName +" "+ item.formMaster.lastName}}</span>
                </nuxt-link>
            </div>
            </template>
            <template v-slot:item.level="{item}">
            <div class="primary--text" >
                {{ item.level.grade }} / {{ item.level.level }}
            </div>
            </template>
            
        <template v-slot:top>
            <v-toolbar
            flat
            >
            <v-toolbar-title>Classes</v-toolbar-title>
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
                    Add New Class
                </v-btn>
                <CreateClass :dialog="createDialog" @update:option="closeDialog"/>
                <EditClass :editedItem="editedItem" :dialog="editDialog" @update:option="closeDialog"/>
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
    </div>
  </template>
  <script>
  import CreateClass from './create.vue';
  import EditClass from './edit.vue'
    export default {
      components:{CreateClass,EditClass},
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
          
          
          { text: 'Class Supervisor', value:'formMaster'},
          {
            text: 'Level/Grade',
            value: 'level',
          },
          
          { text: 'Actions', value: 'actions' },
        ],
        editedIndex: -1,
        editedItem: {
          name: '',
          formMaster: [], 
          level: [],
          
        },
        defaultItem: {
          name: '',
          formMaster:[],
          level: [],
          
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
        classes(){
          return this.$store.getters['management/clases']
        },
        
       
      },
      
      methods: {
        closeDialog(){
          this.editDialog=false;
          this.createDialog=false;
        },
        
        editItem (item) {
          this.editedIndex = this.classes.indexOf(item);
          this.editedItem = Object.assign({}, item);
          console.log(this.editedItem,"item ediy")
          this.editDialog = true
        },
  
        deleteItem (item) {
          this.editedIndex = this.classes.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialogDelete = true
        },
  
        deleteItemConfirm () {
          this.$store.dispatch('management/deleteDepartment',this.editedItem)
          //this.classes.splice(this.editedIndex, 1)
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