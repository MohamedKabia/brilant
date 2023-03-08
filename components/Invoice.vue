<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="fees"
      sort-by="dueDate"
      class="elevation-1"
    >
    <template v-slot:item.dueDate="{item}">
        <v-chip
          class="ma-2"
          color="info"
          outlined
        >
        {{item.dueDate | moment("dddd, MMMM Do YYYY")}}
        </v-chip>
      </template>
      <template v-slot:item.name="{item}">
        <nuxt-link
          class="ma-2"
          color="info"
          :to='"/fees/"+item._id'
        >
        {{item.name}}
        </nuxt-link>
      </template>
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Invoice</v-toolbar-title>
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
                Add New Invoice
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
                    >
                      <v-text-field
                        v-model="editedItem.name"
                        label="Name"
                        dense
                        outlined 
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                    >
                      <v-text-field
                        v-model="editedItem.displayName"
                        label="Display Name"
                        dense
                        outlined 
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                    >
                      <DatePickerVue dateTitle="Due Date" :date="date" @update:option="getDueDate"/>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                    >
                      <v-text-field
                        v-model="editedItem.amount"
                        label="Amount"
                        type="number"
                        dense
                        outlined  
                        ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      
                    >
                     
                      <v-textarea
                        v-model="editedItem.description"
                        label="Description"
                        dense
                        outlined 
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
        
        <v-btn small icon color="info" outlined
        @click="selectStudents(item)">
         <v-icon>mdi-geer</v-icon>
        </v-btn>
        <v-btn
        icon
        small
        class="ml-2 mr-2"
        color="primary" outlined 
        @click="editItem(item)"
        >
           <v-icon>mdi-pencil</v-icon>
        </v-btn>

        <v-btn
        icon
        small
        color="error" outlined 
        @click="deleteItem(item)"
        >
        <v-icon>
          mdi-delete
        </v-icon>
      </v-btn>
      </template>
    </v-data-table>
    <SelectStudents :dialog="studentDialog" @update:option="closeStudentSelection"/>
  </div>  
  </template>
  <script>
  import DatePickerVue from './default/DatePicker.vue'
  import SelectStudents from './default/selectors/SelectStudents.vue'
    export default {
      components:{DatePickerVue,SelectStudents},
      data: () => ({
        studentDialog:false,
        dialog: false,
        dialogDelete: false,
        date:null,
        headers: [
        
          {
            text: 'Bill Name',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          {
            text: 'Display Name',
            align: 'start',
            sortable: false,
            value: 'displayName',
          },
          {
            text: 'Amount',
            align: 'start',
            sortable: false,
            value: 'amount',
          },
          
          { text: 'Due Date', value: 'dueDate' },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        editedIndex: -1,
        editedItem: {
          displayName: '',
          name: '',
          amount:0,
          dueDate: null,
          description:''
        },
        defaultItem: {
          name: '',
          displayName: '',
          amount:0,
          dueDate: null,
          description:''
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
        fees(){
          return this.$store.getters['accounting/Invoice']
        },
        feesTypes(){
          return this.$store.getters['accounting/feesTypes']
        }
      },
      methods: {
        closeStudentSelection(){
          this.studentDialog=false;
        },
        selectStudents(item){
          this.editedIndex = this.fees.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.studentDialog=true;
        },
        editItem (item) {
          this.editedIndex = this.fees.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.date=this.editedItem.dueDate;
          this.dialog = true
        },
  
        deleteItem (item) {
          this.editedIndex = this.fees.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialogDelete = true
        },
  
        deleteItemConfirm () {
          this.$store.dispatch('accounting/deleteFee',this.editedItem);
          this.closeDelete()
        },
  
        close () {
          this.date=null;
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
            this.editedIndex = -1
          })
        },
        getDueDate(value){
            this.editedItem.dueDate =value
        },
        save () {
          if (this.editedIndex > -1) {
            this.$store.dispatch('accounting/updateFee',this.editedItem)
          } else {
            this.$store.dispatch('accounting/addFees',this.editedItem)
          }
          this.close()
        },
      },
    }
  </script>