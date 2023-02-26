<template>
    <div v-if="programs">
        <v-data-table
        :headers="headers"
        :items="programs"
        sort-by="name"
        class="elevation-1"
        >
       
        <template v-slot:item.levels="{item}">
          <v-chip class="primary--text" v-for="level in item.levels" :key="level._id">
              {{ level.grade }} / {{ level.level }}
          </v-chip>
        </template>
            
        <template v-slot:top>
            <v-toolbar
            flat
            >
            <v-toolbar-title>Programs</v-toolbar-title>
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
                    Add New Program
                </v-btn>
                <CreateProgram :dialog="createDialog" @update:option="closeDialog"/>
                <EditProgram :editedItem="editedItem" :dialog="editDialog" @update:option="closeDialog"/>
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
  import CreateProgram from './create.vue';
  import EditProgram from './edit.vue'
    export default {
      components:{CreateProgram,EditProgram},
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
          
          
          {
            text: 'Levels',
            value: 'levels',
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
        programs(){
          return this.$store.getters['settings/getPrograms']
        },
        
       
      },
      
      methods: {
        closeDialog(){
          this.editDialog=false;
          this.createDialog=false;
        },
        
        editItem (item) {
          this.editedIndex = this.programs.indexOf(item);
          this.editedItem = Object.assign({}, item);
          console.log(this.editedItem,"item ediy")
          this.editDialog = true;
        },
  
        deleteItem (item) {
          this.editedIndex = this.programs.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialogDelete = true
        },
  
        deleteItemConfirm () {
          this.$store.dispatch('management/deleteDepartment',this.editedItem)
          //this.programs.splice(this.editedIndex, 1)
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