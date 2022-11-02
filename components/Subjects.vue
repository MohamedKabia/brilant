<template>
  <v-data-table
    :headers="headers"
    :items="subjects"
    sort-by="name"
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
          max-width="500px"
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
                      label="Subject name"
                      dense
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.startedDate"
                      label="Date"
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
      
      <nuxt-link :to='"/subjects/"+item.id'>
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
        
        
        { text: 'Started Date', value: 'startedDate' },
        { text: 'Actions', value: 'actions' },
      ],
      editedIndex: -1,
      editedItem: {
        name: '',
        teachers: [],
        description:'',
      },
      defaultItem: {
        name: '',
        teachers: [],
        description:'Basic Description',
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
        if( this.editedIndex === -1){
          this.editedItem.description='Basic Description';
        }
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      subjects(){
        return this.$store.getters['management/getSubjects']
      },
      teachers(){
        let teachers =this.$store.getters['management/getTeachers']
        let data=[]
         teachers.forEach(teacher=>{
           data.push({ value: teacher._id, text:teacher.staffId + '/'+ teacher.firstName +" " +teacher.lastName},)
         })
        
         return data
      },
     
    },
    methods: {
 
      editItem (item) {
        this.editedIndex = this.subjects.indexOf(item);
        this.editedItem = Object.assign({}, item);
        let te=[]
    
        if(this.editedItem.teachers.length >0){
          this.editedItem.teachers.forEach(teacher=>{
            te.push({text:teacher.staffId +'/'+ teacher.firstName,  value:teacher._id})
          })
        }
        this.editedItem.teachers=te;
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.subjects.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.subjects.splice(this.editedIndex, 1)
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
        let teacher=[];
       
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
          this.$store.dispatch('management/updateSubject',this.editedItem)
        } else {
          this.$store.dispatch('management/addSubject',this.editedItem)
        }
        this.close()
        
      },
    },
  }
</script>