<template>
  <v-data-table
    :headers="headers"
    :items="subjects"
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
    <template v-slot:top>
      <v-toolbar
        flat
       >
        <v-toolbar-title>Subject</v-toolbar-title>
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
              Add New Subject
            </v-btn>
            <CreateSubject :dialog="createDialog" @update:option="closeDialog"/>
             <EditSubject :editedItem="editedItem" :dialog="editDialog" @update:option="closeDialog"/>
            </div>
         
       
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h6 warning--text">Are you sure you want to delete this subject? This may cause error if it has bben linked to staff, schools or students</v-card-title>
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
import CreateSubject from './subjectComponents/create.vue';
import EditSubject from './subjectComponents/edit.vue'
  export default {
    components:{CreateSubject,EditSubject},
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
          text: 'NO of Teachers',
          value: 'teachers',
        },
        {
          text: 'Date Started',
          value: 'startedDate',
        },
        { text: 'Actions', value: 'actions' },
      ],
      editedIndex: -1,
      editedItem: {
        name: '',
        teachers: [], 
        teachers: [],
        description:'',
        startedDate:[]
      },
      defaultItem: {
        name: '',
        hods: [],
        teachers: [],
        description:'',
        startedDate:[]
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
      subjects(){
        return this.$store.getters['management/getSubjects']
      },
    },
    
    methods: {
      closeDialog(){
        this.editDialog=false;
        this.createDialog=false;
      },
      
      editItem (item) {
        this.editedIndex = this.subjects.indexOf(item);
        this.editedItem = Object.assign({}, item);
        console.log(this.editedItem,"item ediy")
        this.editDialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.subjects.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.$store.dispatch('management/deleteSubject',this.editedItem)
        //this.subjects.splice(this.editedIndex, 1)
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