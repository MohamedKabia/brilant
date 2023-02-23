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
                                    v-model="hods"
                                    :items="staffOptions"
                                    label="HOD"
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
            subjects:[],
            name:"",
            teachers:[],
            hods:null,
            required: [
            v => !!v || 'This field is required',
            ],

            //end create form data
            editedItem:null,
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
            console.log("hdhdhd---")
            if(this.departments){
                let nameTaken =this.departments.some(dep=> dep.name == this.name);
                if(nameTaken) {this.errMessage="This department already exist"}
                
                else {this.errMessage=null}
                console.log(nameTaken)
            }else{
                this.errMessage ="err"
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
            name:this.name,
            hods,teachers,subjects
        };
        this.$store.dispatch('management/addDepartment',data)
        this.close()
       },

       close () {
          this.$emit('update:option', false);
        },
    },
}
</script>