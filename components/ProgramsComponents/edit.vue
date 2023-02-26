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
                                    multiple
                                    ></v-combobox>
                                </v-col>
                               
                                <v-col cols="12">
                                    <v-textarea
                                    v-model="editedItem.description"
                                    label="Description"
                                    dense
                                    outlined 
                                    ></v-textarea>
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
            level:[],
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

       
        programs(){
           return this.$store.getters['settings/getPrograms'];
        },
       

    },
    methods: {
        validateName(){
            if(this.programs){
                let nameTaken =this.programs.some(prog=> prog.name == this.editedItem.name);
                if(nameTaken) {this.errMessage="A Program with this name already exist"}
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

        
        let levels;
        if(this.level){
            levels =refObject(this.level)
        }
        

        let data={
            name:this.editedItem.name,
            description:this.editedItem.description,
            levels
        };
        this.$store.dispatch('settings/updateProgram',{data,_id:this.editedItem._id})
        this.close()
       },

       close () {
        this.level=[],
          this.$emit('update:option', false);
        },
    },
    watch: {
        dialog(val){
            if(val && this.editedItem){
                this.editedItem.levels.forEach(st=>{
                    if(st){
                        this.level.push({value:st._id, text:st.grade+'/'+st.level},)
                    }
                });
                
            }
        }
    },
}
</script>