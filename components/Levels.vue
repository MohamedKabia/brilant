<template>
  <v-data-table
    :headers="headers"
    :items="levels"
    sort-by="level"
    class="elevation-1"
  >
   
    <template v-slot:top>
      <v-toolbar
        flat
       >
        <v-toolbar-title>Levels</v-toolbar-title>
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
              Add New Level
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
                        v-model="editedItem.grade"
                        label="Level Name"
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
                        v-model="editedItem.level"
                        label="Level"
                        dense
                        outlined 
                        type="number"
                      ></v-text-field>
                    </v-col>
                    
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.minSubjects"
                        label="Minimum Subjects"
                        dense
                        outlined 
                        type="number"
                      ></v-text-field>
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
                      sm="6"
                      md="4"
                    >
                     
                      <v-text-field
                        v-model="editedItem.passMark"
                        label="Min Grade"
                        dense
                        outlined 
                        type="number"
                      ></v-text-field>
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
      
      <nuxt-link :to='"/levels/"+item.id'>
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
          text: 'Level Name',
          align: 'start',
          sortable: false,
          value: 'grade',
        },
        {
          text: 'Pass Mark (%)',
          align: 'start',
          sortable: false,
          value: 'passMark',
        },
        {
          text: 'Minimum Subjects',
          align: 'start',
          sortable: false,
          value: 'minSubjects',
        },
        { text: 'Level', value: 'level' },
        { text: 'Actions', value: 'actions' },
      ],
      editedIndex: -1,
      editedItem: {
          grade: '',
          subjects:[],
          level: 0,
          passMark:'',
          minSubjects:1,
        },
      defaultItem: {
        grade: '',
        subjects:[],
        level: 0,
        passMark:'',
        minSubjects:1,
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
      levels(){
        let le = this.$store.getters['settings/getlevels']
        console.log(le);
        return le
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
 
      editItem (item) {
        this.editedIndex = this.levels.indexOf(item);
        this.editedItem = Object.assign({}, item)
        let su=[]
        

        if(this.editedItem.subjects.length >0){
          this.editedItem.subjects.forEach(sub=>{
            su.push({text:sub.name, value:sub._id})
          })
        }
        this.editedItem.subjects=su;
  
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.levels.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.levels.splice(this.editedIndex, 1)
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
        if(this.editedItem.subjects.length>0){
          this.editedItem.subjects.forEach(sub=>{
            subject.push({_id:sub.value})
          })
          this.editedItem.subjects=subject
         }
         
      },
      save () {
        this.prepData();
        if (this.editedIndex > -1) {
          this.$store.dispatch('settings/updateLevel',this.editedItem)
        } else {
          this.$store.dispatch('settings/addLevels',this.editedItem)
        }
        this.close()
        
      },
    },
  }
</script>