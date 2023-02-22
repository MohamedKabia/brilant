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
                                :items="staffOptions"
                                label="Select staff"
                                dense
                                outlined  
                                multiple
                                @change="prepDisplayStaff"
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
                                    v-for="(staff, i) in selectedStaff"
                                    :key="i"
                                    >
                                    <v-list-item-avatar>
                                        <v-img :src="baseUrl+'/'+staff.pp"></v-img>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            <span>{{ staff.firstName }}</span>
                                            <span v-if="staff.middleName">{{ staff.middleName }}</span>
                                            <span>{{ staff.lastName }}</span>
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
           
            selectedStaff:[],

            departmentOption:null,
            selectedDepartment:null
           
        }
    },
    computed: {
        staff(){
            return  this.$store.getters['management/getStaff']
        },
        baseUrl(){
            return this.$store.getters['management/baseUrl']
        },
        staffOptions(){
            let data=[];
            if(this.staff){
                this.staff.forEach(st=>{
                data.push({ value:st._id, text:st.staffId+' '+st.firstName+' '+st.lastName},)
             })
           }
          return data;
        },

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
        prepDisplayStaff(){
            if(this.selectedItems){
                let selectedSTaff = this.staff.filter(st=> {
                    return this.selectedItems.some(sc=> sc.value== st._id)
                });
                this.selectedStaff =selectedSTaff
            }
        },
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
          this.$emit('update:option', {dialog:false,data:this.selectedItems});
        },
    },
}
</script>