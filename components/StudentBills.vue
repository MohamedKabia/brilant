<template>
    <v-data-table
      :headers="headers"
      :items="bills"
      sort-by="dueDate"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar
          flat
         >
          <v-toolbar-title>Student Bills</v-toolbar-title>
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
                
              >
                Add New Bill
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
                     class="primary--text"
                    >
                     Bill: {{editedItem.name}}
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                     class="secondary--text"
                    >
                     Amount: {{editedItem.amount | currency}}
                    </v-col>

                    <v-col
                      cols="12"
                      sm="6"
                    >
                      <v-text-field
                        v-model="amount"
                        label="Received Amount"
                        @keyup="updateBalance"
                        outlined
                        dense
                        type="number"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                    Balance: {{balance}}
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
                  color="primary darken-1"
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
              <v-card-title class="text-h5">Are you sure you want to remove this bill?</v-card-title>
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
          @click="viewHistory(item)"
          >
            mdi-eye
          </v-icon>
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
      <template v-slot:no-data>
        <v-btn
          color="primary"
          @click="initialize"
        >
          Reset
        </v-btn>
      </template>
    </v-data-table>
  </template>
  <script>
    export default {
      data: () => ({
        dialog: false,
        balance:0,
        amount:0,
        dialogDelete: false,
        headers: [
        {
            text: 'ID',
            align: 'start',
            sortable: false,
            value: '_id',
          },
          {
            text: 'Name',
            align: 'start',
            sortable: false,
            value: 'name',
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
        bills: [],
        editedIndex: -1,
        editedItem: {
          name: '',
          startedDate: null,
          description:''
        },
        defaultItem: {
          name: '',
          startedDate: 0,
          description:''
        },
      }),
  
      computed: {
        formTitle () {
          return this.editedIndex === -1 ? 'PAYMENT HISTORY' : 'RECEIVE PAYMENT'
        },
      },
  
      watch: {
        dialog (val) {
          val || this.close()
        },
        dialogDelete (val) {
          val || this.closeDelete()
        },
      },
  
      created () {
        this.initialize()
      },
  
      methods: {
        initialize () {
          this.bills = [
            
            {
              id:"1",
              amount:2000,
              name: 'First Term Tution',
              dueDate: "11-11-2022",
              description: "awesome"
            },
            {
              id:"2",
              amount:4000,
              name: 'Computer Science',
              dueDate: "02-01-2023",
              description: "awesome descr"
             
            },
            {
              id:"3",
              amount:1000,
              name: 'Sporting',
              dueDate: "02-12-2022"
            },
          
          ]
        },
  
        editItem (item) {
          this.editedIndex = this.bills.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialog = true
        },
        viewHistory (item) {
           this.editedIndex = -1;
          let index = this.bills.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialog = true
        },
  
        deleteItem (item) {
          this.editedIndex = this.bills.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialogDelete = true
        },
  
        deleteItemConfirm () {
          this.bills.splice(this.editedIndex, 1)
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
            this.editedIndex = -1
          })
        },
        updateBalance(){
          this.balance= this.editedItem.amount - this.amount
        },
        save () {
          if (this.editedIndex > -1) {
            Object.assign(this.bills[this.editedIndex], this.editedItem)
          } else {
            this.bills.push(this.editedItem)
          }
          this.close()
        },
      },
    }
  </script>