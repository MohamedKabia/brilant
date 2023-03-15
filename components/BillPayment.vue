<template>
    <div>
        <v-dialog 
            v-model="dialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
            scrollable
             >
            <v-card>
                <v-toolbar
                    flat
                    dark
                    color="primary"
                    class="info--text"
                    light
                    >
                    <v-btn
                        class="ml-1"
                        icon 
                        @click="close"
                        >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Process Payment</v-toolbar-title>
                    
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn
                            dark
                            color="secondary"
                            text
                            @click="apply"
                        >
                        Process
                        </v-btn>
                    </v-toolbar-items>
                    
                </v-toolbar>
                    
                <v-card-text v-if="editedItem">
                    <v-row class="pt-5">
                        <v-col cols="12" sm="6">
                            <v-row>
                                <v-col cols="12">
                                    <v-avatar
                                        size="76px"
                                        >
                                        <img
                                            :alt="editedItem.student.firstName+' '+editedItem.student.LastName"
                                            :src='baseUrl+"/"+editedItem.student.pp'
                                        >
                                        
                                    </v-avatar>
                                </v-col>
                                <v-col cols="6">
                                    
                                    <ul class="u-list">
                                        <li>Bill Name/Type</li>
                                        <li>Student ID</li>
                                        <li>Student</li>
                                        <li>Amount</li>
                                        <li>Academic Year</li>
                                        <li>Due Date</li>
                                        <li>Balance</li>
                                    </ul>
                                </v-col>
                                <v-col cols="6">
                                    <ul class="u-list">
                                        <li>:{{ editedItem.fee.name }}</li>
                                        <li>:{{ editedItem.student.studentId }}</li>
                                        <li>:{{ editedItem.student.firstName }}
                                            <span v-if="editedItem.student.middleName">{{ editedItem.student.middleName }}</span>
                                            {{ editedItem.student.lastName }}
                                        </li>
                                        <li>:{{ editedItem.fee.amount }}</li>
                                        <li>:{{ editedItem.acYear }}</li>
                                        <li>:{{ editedItem.fee.dueDate | moment('DD-MM-YY') }}</li>
                                        <li>:{{ editedItem.balance }}</li>
                                    </ul>
                                </v-col>
                            </v-row>
                        </v-col>

                        <v-col cols="12" sm="6">
                            <v-text-field
                                v-model="amount"
                                outlined
                                dense
                                label="Amount Received"
                                type="number"
                            />
                            <h5 class="mt-3 primary--text">Payment History</h5>
                            <div v-if="editedItem.paymentHistory.length>=1">
                                <v-list-item three-line v-for="history in editedItem.paymentHistory" :key="history._id">
                                    <v-list-item-content>
                                        <v-list-item-title>Amount: {{ history.amp }}</v-list-item-title>
                                        <v-list-item-subtitle v-if="history.receivedBy">
                                            <nuxt-link :to='"/staff/"+history.receivedBy._id'>
                                                <v-avatar
                                                    size="36px"
                                                >
                                                    <img
                                                    :src='baseUrl+"/"+history.receivedBy.pp'
                                                    >
                                                    
                                                </v-avatar>
                                                <span class="ml-2" > Received By :{{history.receivedBy.firstName +" "+ history.receivedBy.lastName}}</span>
                                            </nuxt-link>
                                        </v-list-item-subtitle>
                                        <v-list-item-subtitle>
                                        {{history.createdAt | moment("DD-MM-YY")}}
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </div>
                            <div v-else>
                                There are no recorded payemt for this bill
                            </div>
                        </v-col>
                    </v-row>
                   
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
export default {
    props:['dialog','editedItem'],
    data(){
        return{
            errorMessage:null,
            amount:null,
        }
    },
    
    computed: {
       prep(){
        bill = Object.assign({}, this.editedItem)
        bill.paymentHistory.push({
        amp:this.amount,
      });
      let balance =bill.fee.amount;
      bill.paymentHistory.forEach(pay => {
        balance = balance - pay.amp;
        console.log(balance)
      });
      bill.balance=balance;
       },
        baseUrl(){
            return this.$store.getters['management/baseUrl'];
        },
    },
    methods: {
        close () {
          this.$emit('update:option', {dialog:false});
        },
        apply(){
            if(this.amount){
                this.$store.dispatch('accounting/acceptPayment',{_id:this.editedItem._id,amount:this.amount})
                console.log("amount",this.amount);
                this.$emit('update:option', {dialog:false});
            }
            else {
                this.errorMessage="Please enter a valid amout"
                this.$emit('update:option', {dialog:false});
            }
            
        }
    },
}
</script>