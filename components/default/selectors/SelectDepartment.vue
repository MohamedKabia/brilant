<template>
    <div>
        <v-dialog 
            v-model="dialog"
            width="500"
            persistent
             >
            <v-card>
                <v-card-text class="pt-5 pb-5">
                    <v-row>
                        <v-col sm="6" cols="12">
                            <div class="mt-4">
                                <v-combobox
                                v-model="selectedItems"
                                :items="departmentOptions"
                                label="Select Departments"
                                dense
                                outlined  
                                multiple
                                @change="prepDepartmentDisplay"
                            ></v-combobox>
                            </div>
                        </v-col>

                        <v-col sm="6" cols="12" >
                            <div class="school-list">
                                <v-list dense>
                                <v-list-item-group
                                    v-model="highletedItem"
                                    color="primary"
                                >
                                    <v-list-item
                                    v-for="(departments, i) in selectedDepartments"
                                    :key="i"
                                    >
                                   
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            <span>{{ departments.name }}</span>
                                           
                                        </v-list-item-title>
                                    </v-list-item-content>
                                    </v-list-item>
                                </v-list-item-group>
                                </v-list>
                            </div>
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
           
            selectedDepartments:[],

            departmentOption:null,
            selectedDepartment:null
           
        }
    },
    computed: {
        departments(){
            return  this.$store.getters['management/getDepartments']
        },
        baseUrl(){
            return this.$store.getters['management/baseUrl']
        },
        departmentOptions(){
            let data=[];
            if(this.departments){
                this.departments.forEach(dep=>{
                data.push({ value:dep._id, text:dep.name},)
             })
           }
          return data;
        },
    },
    methods: {
        prepDepartmentDisplay(){
            if(this.selectedItems){
                let selectedDep = this.departments.filter(st=> {
                    return this.selectedItems.some(sc=> sc.value== st._id)
                });
                this.selectedDepartments =selectedDep
            }
        },
        selectDepartment(val){
            this.editedItem=val;
            let data=[]
            if(val.departments){
                this.departmentOption= val.departments.forEach(dep=>{
                    data.push({ value:dep._id, text:dep.name},)
                })
            }else this.errorMessage="Unexpeted Error"
        },
        close (date) {
          this.$emit('update:option', {dialog:false,data:this.selectedItems});
        },
    },
}
</script>