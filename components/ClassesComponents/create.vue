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
                                        v-model="name"
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
                            <v-btn color="primary" @click="save">Save <v-icon>mdi-kite</v-icon></v-btn> 
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
    props:['dialog'],
    data(){
        return{
            errMessage:null,
            name:"",
            formMaster:null,
            level:null,
            required: [
            v => !!v || 'This field is required',
            ],
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

       
        classes(){
           return this.$store.getters['management/classes'];
        },
       

    },
    methods: {
        validateName(){
            if(this.classes){
                let nameTaken =this.classes.some(clas=> clas.name == this.name);
                if(nameTaken) {this.errMessage="A class with this name already exist"}
                
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
        let teachers;
        let level;
        if(this.teachers){
            teachers =refObject(this.teachers)
        }
       
        if(this.formMaster){
            formMaster ={_id:this.formMaster.value}
        }
        if(this.level){
            level ={_id:this.level.value}
        }

        let data={
            name:this.name,
            formMaster,teachers,level
        };
        this.$store.dispatch('management/addClass',data)
        this.close()
       },

       close () {
          this.level=null;
          this.formMaster=null;
          this.$emit('update:option', false);
        },
    },
}
</script>