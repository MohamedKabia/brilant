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
                                    v-model="level"
                                    :items="levelOption"
                                    label="Level/Grade"
                                    dense
                                    outlined 
                                    :rules="required" 
                                    ></v-combobox>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-combobox
                                    v-model="formMaster"
                                    :items="staffOptions"
                                    label="Class Supervisor"
                                    dense
                                    outlined 
                                    :rules="required" 
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
            level:null,
            formMaster:null,
            required: [
            v => !!v || 'This field is required',
            ],
            selectedItems:null,
           
        }
    },
   
    computed: {
       
        levels(){
            return  this.$store.getters['settings/getlevels']
        },
        levelOption(){
            let data=[];
                if(this.levels){
                    this.levels.forEach(st=>{
                        data.push({ value:st._id, text:st.grade},)
                })
            }
            return data;
        },
        
        classes(){
           return this.$store.getters['management/classes'];
        },

    },
    methods: {
        validateName(){
            if(this.departments){
                let nameTaken =this.departments.some(dep=> dep.name == this.name);
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

        let formMaster;
        let level;
        
       
        if(this.formMaster){
            formMaster ={_id:this.formMaster.value}
        }
        if(this.level){
            level ={_id:this.level.value}
        }

        let data={
            name:this.editedItem.name,
            formMaster,level
        };
        this.$store.dispatch('management/updateClass',{data,_id:this.editedItem._id})
        this.close()
       },

       close () {
          this.level=null;
          this.formMaster=null;
          this.$emit('update:option', false);
        },
    },
    watch: {
        dialog(val){
            if(val && this.editedItem){
                if(this.editedItem.formMaster){
                    this.formMaster={value:this.editedItem.formMaster._id, text:this.editedItem.formMaster.staffId+' '+this.editedItem.formMaster.firstName+' '+this.editedItem.formMaster.lastName}
                }
                if(this.editedItem.level){
                    this.level={value:this.editedItem.level._id, text:this.editedItem.level.grade+'/'+this.editedItem.level.level+' '+this.editedItem.formMaster.lastName}
                }
            }
        }
    },
}
</script>