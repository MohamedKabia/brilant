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
                        <v-row class="align-center">
                            <v-col cols="12" md="4" sm="6">
                                <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                <v-img
                                    :src="preview"
                                    aspect-ratio="0.9"
                                    v-bind="attrs"
                                    v-on="on"
                                    >
                                    <v-file-input  
                                        class="d-none"
                                        v-model="image"
                                        id="fileUpload" 
                                        :rules="required"
                                        type="file" hidden 
                                        @change="preview_image" 
                                        
                                        accept='image/x-png,image/gif,image/jpeg'/>

                                        
                                    <v-btn icon color="primary" @click="chooseFiles">
                                        <v-icon>mdi-camera</v-icon>
                                    </v-btn>
                                </v-img>
                            </template>
                            <span>School Badg</span>
                            </v-tooltip>
                            </v-col>
                        </v-row>
                        <v-text-field
                            class="text-uppercase mt-3"
                            v-model="name"
                            label="School Name"
                            outlined
                            dense
                        ></v-text-field>
                        <v-text-field
                            class="text-uppercase"
                            v-model="displayName"
                            label="Display Name"
                            outlined
                            dense
                        ></v-text-field>
                        <v-text-field
                            class="text-uppercase"
                            v-model="location"
                            label="Location"
                            outlined
                            dense
                        ></v-text-field>

                        
                        <v-card-actions>
                            <v-btn color="primary">Create <v-icon>mdi-gear</v-icon></v-btn> 
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
            image:null,
            preview:'/placeholder.jpg',


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