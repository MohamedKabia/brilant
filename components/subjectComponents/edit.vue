<template>
    <div>
        <v-dialog 
            v-model="dialog"
            width="500"
            persistent
             >
            <v-card>
                <v-card-text class="pt-5 pb-5">
                    <v-form>
                        <v-alert v-if="errMessage" color="warning">
                            {{ errMessage }}
                        </v-alert>
                        <v-row>
                            <v-col cols="12" md="6">
                                    <v-text-field
                                        class="text-uppercase"
                                        v-model="editedItem.name"
                                        :rules="required"
                                        label="Name"
                                        outlined
                                        required
                                        dense
                                        @keyup="validateName"
                                    ></v-text-field>
                                </v-col>
                                
                               
                                <v-col cols="12" md="6">
                                    <v-combobox
                                    v-model="teachers"
                                    :items="staffOptions"
                                    label="Teachers"
                                    dense
                                    outlined 
                                    multiple 
                                    ></v-combobox>
                                </v-col>
                                
                        </v-row>
                        <v-card-actions>
                            <v-btn color="primary" @click="save">Update <v-icon>mdi-kite</v-icon></v-btn> 
                            <v-btn outlined color="secondary" @click="close" class="ml-5">Close</v-btn>
                        </v-card-actions>
                   </v-form>
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
            errMessage:null,
            teachers:[],
            required: [
            v => !!v || 'This field is required',
            ],
            selectedItems:null,
           
        }
    },
   
    computed: {
        staffOptions(){
            let staff= this.$store.getters['management/getStaff']
            let data=[];
            if(staff){
                staff.forEach(st=>{
                    data.push({ value:st._id, text:st.staffId+' '+st.firstName+' '+st.lastName},)
             })
           }
          return data;
        },       

    },
    methods: {
        validateName(){
            if(this.departments){
                let nameTaken =this.departments.some(dep=> dep.name == this.editedItem.name);
                if(nameTaken) {this.errMessage="This department already exist"}
                else {this.errMessage=null}
            }else{
                this.errMessage =null
            }
        },
       save(){
        function refObject(dataArr){
            let objectId=[]
            dataArr.forEach(d=>{
                objectId.push({ _id:d.value},)
            })
            return objectId
        }

        let teachers;
        if(this.teachers){
            teachers =refObject(this.teachers)
        }
       

        let data={
            name:this.editedItem.name,
            teachers,
        };
        this.$store.dispatch('management/updateSubject',{data,_id:this.editedItem._id})
        this.close()
       },

       close () {
        this.teachers=[];
          this.$emit('update:option', false);
        },
    },
    watch: {
        dialog(val){
            if(val && this.editedItem){
                this.editedItem.teachers.forEach(st=>{
                    if(st){
                        this.teachers.push({value:st._id, text:st.staffId+' '+st.firstName+' '+st.lastName},)
                    }
                });
            }
        }
    },
}
</script>