<template>
    <div>
        <v-dialog 
            v-model="dialog"
            width="700"
            persistent
             >
            <v-card>
                <v-card-text class="pt-5 pb-5">
                    <v-row>
                        <v-col sm="6" cols="12" md="4">
                            <div class="school-list">
                                <v-list dense>
                                <v-subheader>Schools</v-subheader>
                                <v-list-item-group
                                    v-model="highletedItem"
                                    color="primary"
                                >
                                    <v-list-item
                                    v-for="(school, i) in selectedSchool"
                                    :key="i"
                                    @click="selectDepartment(school)"
                                    >
                                    <v-list-item-icon>
                                        <v-icon v-text="school.icon"></v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title v-text="school.name"></v-list-item-title>
                                    </v-list-item-content>
                                    </v-list-item>
                                </v-list-item-group>
                                </v-list>
                            </div>

                            <div class="mt-4">
                                <v-combobox
                                v-model="selectedItems"
                                :items="schoolOptions"
                                label="Assign to School"
                                dense
                                outlined  
                                multiple
                                @change="updateStaffSchool"
                            ></v-combobox>
                            </div>
                        </v-col>

                        <v-col sm="6" cols="12" md="4">
                            <div v-if="errorMessage">{{ errorMessage }}</div>
                            <div v-if="editedItem">
                                {{ editedItem.name }} /<small>{{ editedItem.displayName }}</small>
                                <v-divider class="mt-2 mb-4"></v-divider>

                                <v-combobox
                                v-model="selectedDepartment"
                                :items="departmentOption"
                                label="Assign to Department"
                                dense
                                outlined  
                                multiple
                                @change="updateStaffSchool"
                            ></v-combobox>
                            </div>
                        </v-col>
                        <v-col sm="6" cols="12" md="4" v-if="editedItem">
                            <v-combobox
                                v-model="role"
                                :items="roles"
                                label="User Roles"
                                dense
                                outlined  
                                multiple
                            ></v-combobox>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions class="pb-5">
                    <v-btn color="primary" @click="close" rounded >Save <v-icon class="ml-2" color="info">mdi-kite</v-icon></v-btn>
                    <v-btn color="secondary" @click="close" rounded outlined class="ml-3">Close</v-btn>
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
            errorMessage:null,
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
            role:'',
            roles:["Admin","Staff","Burser","Teacher","Principal"],
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
            return  this.$store.getters['school/schools']
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
        //
        selectDepartment(val){
            this.editedItem=val;
            let data=[]
            if(val.departments){
                this.departmentOption= val.departments.forEach(dep=>{
                    data.push({ value:dep._id, text:dep.name},)
                })
            }else this.errorMessage="The Selected school has not be given departments"
        },
        close (date) {
          this.$emit('update:option', false);
        },
    },
}
</script>