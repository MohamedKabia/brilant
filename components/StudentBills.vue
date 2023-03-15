<template>
  <div>
    <div v-if="studentBills">
        
        <v-data-table
            v-model="selected"
            :headers="headers"
            :items="studentBills"
            item-key="_id"
            class="elevation-1"
            :search="search"
        >
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
           <v-btn icon color="success" @click="process(item)">
            <v-icon>mdi-pencil</v-icon>
           </v-btn>
           </div>
        </template>
        </v-data-table>
    </div>
    <BillPaymentVue :dialog="paymentDialog" :editedItem="editedItem" @update:option="closePayment"/>
  </div>
</template>
<script>
import BillPaymentVue from './BillPayment.vue';
export default {
  props:['studentBills'],
  components:{BillPaymentVue},
  data(){
      return{
          paymentDialog:false,
          selected: [],
          search: '',
          editedItem:null,
          headers:[
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
  methods: {
    process(item){
          this.editedItem = Object.assign({}, item)
          this.paymentDialog=true;
    },
    closePayment(res){
      this.paymentDialog=res.diolog;
    },
     due(bill){
        let today = new Date();
        let date= new Date(bill.fee.dueDate).toISOString().substring(0,10);//toDateString()
        return date <= today.toISOString().substring(0,10);//toDateString();
        
     }
  },
}
</script>