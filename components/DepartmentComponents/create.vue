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
                                    ></v-text-field>
                                </v-col>
                                
                                <v-col cols="12" md="6">
                                    <v-combobox
                                    v-model="hod"
                                    :items="teachersOptions"
                                    label="HOD"
                                    dense
                                    outlined 
                                    :rules="required" 
                                    ></v-combobox>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-combobox
                                    v-model="teachers"
                                    :items="teachersOptions"
                                    label="Teachers"
                                    dense
                                    outlined 
                                    multiple 
                                    ></v-combobox>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-combobox
                                    v-model="subjects"
                                    :items="subjectsOptions"
                                    label="Subject"
                                    dense
                                    outlined 
                                    multiple 
                                    :rules="required"
                                    ></v-combobox>
                                </v-col>
                        </v-row>
                        <v-card-actions>
                            <v-btn color="primary">Save <v-icon>mdi-kite</v-icon></v-btn> 
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
            subjects:[],
            name:"",
            teachers:[],
            hod:'',
            teachersOptions: [
			{ value: "62e93e7c5d2aec1c44a7a64d", text: "Mr Kamara image" },
			{ value: "62e93e7c5d3aec1c44a7a64d", text: "Mr Kamara image2" },
			{ value: "62e93e7c5d2aecr1c44a7a64d", text: "Mr Kamara 3" },
			],

            subjectsOptions: [
			{ value: "62e93e7c5d2aec1c44a7a64d", text: "Mathematics" },
			{ value: "62e93e7c5d3aec1c44a7a64d", text: "Language Art" },
			{ value: "62e93e7c5d2aecr1c44a7a64d", text: "English 3" },
			],

            required: [
            v => !!v || 'This field is required',
            ],

            //end create form data
            editedItem:null,
            highletedItem:null,
            selectedItems:null,

            staffDepartment:[
                {
                    name:"Literature",_id:"73",
                    school:{name:"Aws SSS", _id:"32",icon: 'mdi-clock',departments:[
                        {name:"Literature",_id:"73"},{name:"Computer ITC",_id:"43"}
                    ]}
                }
            ],
            selectedSchool:[
            {name:"Aws SSS", _id:"32",icon: 'mdi-clock',departments:[
                    {name:"Literature",_id:"73"},{name:"Computer ITC",_id:"43"}
                ]}
            ],

            departmentOption:null,
            selectedDepartment:null
           
        }
    },
    computed: {
        schools(){
            //get from store
            return  [
                {name:"Aws JSS", _id:"12",icon: 'mdi-clock',departments:[
                    {name:"Mathematics",_id:"23"},{name:"Biology",_id:"33"}
                ]},
                {name:"Aws SSS", _id:"32",icon: 'mdi-clock',departments:[
                    {name:"Literature",_id:"73"},{name:"Computer ITC",_id:"43"}
                ]},
            ];
        },
        schoolOptions(){
            let data=[];
            if(this.schools){
                this.schools.forEach(school=>{
                data.push({ value:school._id, text:school.name},)
             })
           }
          return data;
        },

        /*selectedSchool:{
            //this.user.schools
            get(){
                return this.staffSchool
            },
            set(val){

            }

        },*/
        departmentOptions(){
           let data=[];
           let department= this.$store.getters['management/getDepartments'];
           if(department.length>0){
             department.forEach(d=>{
                data.push({ value:d._id, text:d.name},)
             })
           }
          return data;
        },

    },
    methods: {
        prepDisplaySchool(){
            if(this.selectedItems){
                let selectedSchools = this.schools.filter(school=> {
                    return this.selectedItems.some(sc=> sc.value== school._id)
                });
                console.log(selectedSchools)
                this.selectedSchool =selectedSchools
            }
        },
        updateStaffSchool(){
            this.prepDisplaySchool();
        },
        selectDepartment(val){
            this.editedItem=val;
            let data=[]
            this.departmentOption= this.val.departments.forEach(dep=>{
                data.push({ value:dep._id, text:dep.name},)
            })
        },
        close (date) {
          this.$emit('update:option', false);
        },
    },
}
</script>