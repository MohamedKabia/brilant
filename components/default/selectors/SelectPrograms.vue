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
                                :items="programOptions"
                                label="Select Program"
                                dense
                                outlined  
                                multiple
                                @change="prepProgramDisplay"
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
                                    v-for="(programs, i) in selectedPrograms"
                                    :key="i"
                                    >
                                   
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            <span>{{ programs.name }}</span>
                                           
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
            selectedPrograms:[],
            programOption:null,
        }
    },
    computed: {
        programs(){
            return  this.$store.getters['settings/getPrograms']
        },
        baseUrl(){
            return this.$store.getters['management/baseUrl']
        },
        programOptions(){
            let data=[];
            if(this.programs){
                this.programs.forEach(prog=>{
                data.push({ value:prog._id, text:prog.name},)
             })
           }
          return data;
        },
    },
    methods: {
        prepProgramDisplay(){
            if(this.selectedItems){
                let selectedDep = this.programs.filter(st=> {
                    return this.selectedItems.some(sc=> sc.value== st._id)
                });
                this.selectedPrograms =selectedDep;
            }
        },
        SelectProgram(val){
            this.editedItem=val;
            let data=[]
            if(val.programs){
                this.programOption= val.programs.forEach(prog=>{
                    data.push({ value:prog._id, text:prog.name},)
                })
            }else this.errorMessage="Unexpeted Error"
        },
        close (date) {
          this.$emit('update:option', {dialog:false,data:this.selectedItems});
        },
    },
}
</script>