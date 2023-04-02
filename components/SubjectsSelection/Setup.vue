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
                    
                <v-card-text >
                    <v-row class="pt-5">
                        
                        <div v-drag-and-drop:options="options" class="drag-n-drop">
                        <ul>
                            <li>Item 1</li>
                            <li>Item 2</li>
                            <li>Item 3</li>
                        </ul>
                        <ul>
                            <li>Item 4</li>
                            <li>Item 5</li>
                            <li>Item 6</li>
                        </ul>
                        </div>
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
            options:{
                dropzoneSelector: 'ul',
                draggableSelector: 'li',
                reactivityEnabled: true,
                multipleDropzonesItemsDraggingEnabled: true,
                showDropzoneAreas: true,
                
            }
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