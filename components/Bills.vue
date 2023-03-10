<template>
  <div>
    <div v-if="bills">
        
        <v-data-table
            v-model="selected"
            :headers="headers"
            :items="bills"
            item-key="_id"
            class="elevation-1"
            :search="search"
        >
        <template v-slot:item.studentId="{item}">
          <div>
            {{ item.student.studentId }}
          </div>
        </template>
        <template v-slot:item.name="{item}">
          <div>
            {{ item.fee.name }}
          </div>
        </template>
        <template v-slot:item.amount="{item}">
          <div>
            {{ item.fee.amount }}
          </div>
        </template>
        <template v-slot:item.balance="{item}">
          <div>
            {{ item.balance }}
          </div>
        </template>
        
        <template v-slot:item.status="{item}">
          <v-chip color="warning">
            {{ item.status }}
          </v-chip>
        </template>
        <template v-slot:item.firstName="{item}">
            <div class="primary--text">
            <nuxt-link :to='"/studentbill/"+item.student._id'>
                <v-avatar
                size="36px"
                >
                <img
                    :alt="item.student.firstName+' '+item.student.LastName"
                    :src='baseUrl+"/"+item.student.pp'
                >
                
                </v-avatar>
                <span v-if="item" class="ml-3">{{item.student.firstName}} <span v-if="item.student.middletName">{{item.student.middleName}}</span> {{ item.student.lastName }}</span>
                </nuxt-link>
            </div>
        </template>
        <template v-slot:item.dueDate="{item}">
            <v-chip
            class="ma-2"
            outlined
            >
            {{item.fee.dueDate | moment("dddd, MMMM Do YYYY")}}
            </v-chip>
        </template>
        <template v-slot:item.actions="{item}">
           <div>
           <v-btn icon color="success">
            <v-icon>mdi-pencil</v-icon>
           </v-btn>
           </div>
        </template>
        </v-data-table>
    </div>
  </div>
</template>
<script>
export default {
  data(){
      return{
          selected: [],
          search: '',
          editedItem:null,
                      
          headers:[
          {
              text: 'StudentID',
              align: 'start',
              sortable: true,
              value: 'studentId',
              },
              {
              text: 'First Name',
              align: 'start',
              sortable: false,
              value: 'firstName',
              },
              {
              text: 'Fee Name/Type',
              align: 'start',
              sortable: false,
              value: 'name',
              },
              {
              text: 'Amount',
              align: 'start',
              sortable: true,
              value: 'amount',
              },
              {
              text: 'Due Date',
              align: 'start',
              sortable: true,
              value: 'dueDate',
              },
              {
              text: 'Status',
              align: 'start',
              sortable: true,
              value: 'status',
              },
              {
              text: 'Balance',
              align: 'start',
              sortable: true,
              value: 'balance',
              },
              {
              text: 'Actions',
              align: 'start',
              sortable: true,
              value: 'actions',
              },
            
          ],
         
      }
  },
  computed: {
      bills(){
             return this.$store.getters['accounting/studentBills'];
      },
      baseUrl(){
          return this.$store.getters['management/baseUrl'];
      },
     
      baseUrl(){
          return this.$store.getters['management/baseUrl']
      },

  },
  methods: {
     
  },
}
</script>