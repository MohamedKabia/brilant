<template>
    <div>
        <v-dialog 
            v-model="dialog"
            width="500"
            persistent
             >
            <v-card>
                <v-card-text>
                    <v-row>
                        <v-col cols="12" md="8" class="offset-md-2">
                            <v-form>
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="staffId"
                                    label="Staf ID"
                                    outlined
                                    dense
                                ></v-text-field>
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="password"
                                    
                                    label="Password"
                                    outlined
                                    dense
                                ></v-text-field>

                                <v-btn color="primary" dense @click="login" rouded>
                                    Create <v-icon>mdi-tool</v-icon>
                                </v-btn>
                            </v-form>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="secondary" @click="close">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
export default {
    props:['dialog'],
    data(){
        return{
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