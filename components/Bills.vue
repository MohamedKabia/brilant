<template>
  <div>
    <div v-if="bills">
        
        <v-data-table
            v-model="selected"
            :headers="headers"
            :items="bills"
            item-key="_id"
            class="elevation-1"
            show-select
            :search="search"
        >
        <template v-slot:top>
          <div>
            <v-text-field
            v-model="search"
            label="Search...."
            class="mx-4"
            outlined
            dense
            append-icon="mdi-magnify"
          ></v-text-field>
          </div>
        </template>
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
          <v-chip :class="{
            
            'warning':!due(item) && item.status=='Un Paid',
            'teal':item.status=='Deposit',
            'success':item.status=='Paid',
            'error': due(item) && item.status=='Un Paid'}">
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
            :class="{'error':due(item)}"
            outlined
            >
            {{item.fee.dueDate | moment("DD-MM-YY")}}
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
             return this.$store.getters['accounting/allStudentBills'];
      },
      baseUrl(){
          return this.$store.getters['management/baseUrl'];
      },
     
      baseUrl(){
          return this.$store.getters['management/baseUrl']
      },

  },
  methods: {
     due(bill){
        let today = new Date();
        let date= new Date(bill.fee.dueDate).toISOString().substring(0,10);//toDateString()
        return date <= today.toISOString().substring(0,10);//toDateString();
        
     }
  },
}
</script>