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
                                    v-model="hods"
                                    :items="staffOptions"
                                    label="HOD"
                                    dense
                                    outlined                                     
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
                                <v-col cols="12" md="6">
                                    <v-combobox
                                    v-model="subjects"
                                    :items="subjectOptions"
                                    label="Subject"
                                    dense
                                    outlined 
                                    multiple 
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
            subjects:[],
            teachers:[],
            hods:null,
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

       
        departments(){
           return this.$store.getters['management/getDepartments'];
        },
        subjectOptions(){
           let data=[];
           let subjects= this.$store.getters['management/getSubjects'];
           if(subjects.length>0){
             subjects.forEach(d=>{
                data.push({ value:d._id, text:d.name},)
             })
           }
          return data;
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

        let hods;
        let teachers;
        let subjects;
        if(this.teachers){
            teachers =refObject(this.teachers)
        }
        if(this.subjects){
            subjects =refObject(this.subjects)
        }
        if(this.hods){
            hods ={_id:this.hods.value}
        }

        let data={
            name:this.editedItem.name,
            hods,teachers,subjects
        };
        this.$store.dispatch('management/updateDepartment',{data,_id:this.editedItem._id})
        this.close()
       },

       close () {
        this.subjects=[],
        this.teachers=[];
        this.hods=null;
          this.$emit('update:option', false);
        },
    },
    watch: {
        dialog(val){
            console.log(val)
            if(val && this.editedItem){
                this.editedItem.teachers.forEach(st=>{
                    if(st){
                        this.teachers.push({value:st._id, text:st.staffId+' '+st.firstName+' '+st.lastName},)
                    }
                });
                if(this.editedItem.hods[0]){
                    this.hods={value:this.editedItem.hods[0]._id, text:this.editedItem.hods[0].staffId+' '+this.editedItem.hods[0].firstName+' '+this.editedItem.hods[0].lastName}
                }
            }
        }
    },
}
</script>