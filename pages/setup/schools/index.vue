<template>
    <div>
        <v-container>
            
            <v-row dense>
                <v-col cols="12" class="pb-5">
                    <div class="d-flex">
                        <div class="title">Schools</div>
                        <v-spacer></v-spacer>
                        <div>
                            <v-btn rounded outlined color="primary" @click="dialog=!dialog">
                                Create <v-icon>mdi-plus</v-icon>
                            </v-btn>
                        </div>
                    </div>
                </v-col>
                <v-col cols="6" v-for="item in schools" :key="item._id">
                    <v-card
                        :color="item.color"
                        dark
                    >
                        <div class="d-flex flex-no-wrap justify-space-between">
                        <div>
                            <v-card-title
                            class="text-h5"
                            v-text="item.name"
                            ></v-card-title>

                            <v-card-subtitle v-text="item.displayName"></v-card-subtitle>

                            <v-card-actions class="pt-5">
                                <v-btn outlined rounded small @click="editItem(item)">
                                    Edit <v-icon class="ml-1" color="info">mdi-pencil</v-icon>
                                </v-btn>
                                <v-btn small rounded outlined color="primary" @click="selectStaff(item)">
                                    Staff <v-icon class="ml-1" color="green">mdi-account-plus</v-icon>
                                </v-btn>
                                
                                <v-btn small rounded outlined color="secondary" @click="selectDep(item)">
                                    Dep <v-icon class="ml-1" color="green">mdi-house-plus</v-icon>
                                </v-btn>
                                <v-btn small rounded outlined color="secondary" @click="selectProg(item)">
                                    Prog <v-icon class="ml-1" color="green">mdi-house-plus</v-icon>
                                </v-btn>
                            </v-card-actions>
                        </div>

                        <v-avatar
                            class="ma-3"
                            size="120"
                            tile
                        >
                            <v-img v-if="item.badg" :src="baseUrl+'/'+item.badg"></v-img>
                            <v-img v-else src="/logo.jpeg"></v-img>
                        </v-avatar>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
            <SelectDepartment :dialog="depDiolog" @update:option="closeDepSelect"/>
            <SelectPrograms :dialog="progDialog" @update:option="closeProgSelection"/>
            <SelectStaffVue :dialog="staffDialog" @update:option="closeStaffSelect"/>
            <CreateSchool :editedIndex="editedIndex" :editedItem="editedItem" :defaultItem="defaultItem" :dialog="dialog" @update:option="closeDialog"/>
        </v-container>
    </div>
</template>
<script>
import CreateSchool from '../../../components/SchoolCompinent/create.vue';
import SelectStaffVue from '../../../components/default/selectors/selectStaff.vue';
import SelectDepartment from '../../../components/default/selectors/SelectDepartment.vue';
import SelectPrograms from '../../../components/default/selectors/SelectPrograms.vue';

export default {
    components:{CreateSchool,SelectStaffVue,SelectDepartment,SelectPrograms},
    data(){
        return{
            staffDialog:false,
            progDialog:false,
            dialog:false,
            depDiolog:false,
            selectedStaff:null,
            editedIndex: -1,
            editedItem: {
                name:"",
                displayName:"",
                location:"",
                badg:'/placeholder.jpg',
            },
            defaultItem: {
                name:"",
                displayName:"",
                location:"",
                badg:'/placeholder.jpg',
            },
        }
    },
    computed: {
        schools(){
            return this.$store.getters['school/schools']
        },
        baseUrl(){
            return this.$store.getters['management/baseUrl']
        }
    },
    methods: {
        editItem (item) {
            this.editedIndex = this.schools.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
      },
      selectStaff (item) {
            this.editedIndex = this.schools.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.staffDialog = true
      },
      selectDep (item) {
            this.editedIndex = this.schools.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.depDiolog = true
      },
      selectProg (item) {
            this.editedIndex = this.schools.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.progDialog = true
      },
      closeDialog(){
            this.dialog=false;
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
        },
        updateSchool(item){
            let update ={
                _id:this.editedItem._id,
                ...item
            };
            console.log(update)
            this.$store.dispatch('school/update',update);

            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
        },
        closeStaffSelect(val){
            this.staffDialog=val.dialog
            let staffArr=[]
            if(val.data){
                val.data.forEach(staff => {
                    staffArr.push({_id:staff.value},)
                });
            };
            this.updateSchool({payload:{staffs:staffArr}})
        },
        closeDepSelect(val){
            this.depDiolog=val.dialog
            let depArr=[]
            if(val.data){
                val.data.forEach(dep => {
                    depArr.push({_id:dep.value},)
                });
            }else console.log("nothing selected")
            this.updateSchool({payload:{departments:depArr}})
        },
        closeProgSelection(val){
            this.progDialog=val.dialog;
            let progArr=[]
            if(val.data){
                val.data.forEach(prog => {
                    progArr.push({_id:prog.value},)
                });
                this.updateSchool({payload:{programs:progArr}})
                console.log(progArr)
            }else console.log("nothing selected")
            
        }
    },
}
</script>
