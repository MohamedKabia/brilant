<template>
    <div>           
        <div class="pa-5">
            <v-toolbar flat>
                <v-toolbar-items>
                    <v-combobox
                    v-model="school"
                    :items="schoolOpptions"
                    label="School"
                    dense
                    outlined  
                ></v-combobox>
                <v-combobox
                    v-model="level"
                    :items="levelOpptions"
                    label="level"
                    dense
                    outlined  
                ></v-combobox>
                <v-combobox
                    v-model="group"
                    :items="classOpptions"
                    label="Class/Form/Group"
                    dense
                    outlined  
                ></v-combobox>
                <div>
                    <v-btn  color="info" @click="filter">Filter</v-btn>
                </div>
                <div>
                    <v-btn v-if="clearFilter"  outlined color="error" @click="clear">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </div>
                </v-toolbar-items>
            </v-toolbar>
        </div>     
    </div>
</template>
<script>
export default {
    data(){
        return{
            clearFilter:false,
            yearStarted:"",
            group:null,
            level:null,
            selected: [],
            search: '',
            errorMessage:null,
            editedItem:null,
            highletedItem:null,
            selectedItems:null,
            school:null,
        }
    },
    computed: {
        students(){
               return this.$store.getters['management/filteredStudents'];
        },
        
        classes(){
          return this.$store.getters['management/clases']
        },
        classOpptions(){
           let data=[];
           if(this.classes){
             this.classes.forEach(clas=>{
                data.push({ value:clas._id, text:clas.name},)
             })
           }
          return data;
        },
        schools(){
            return  this.$store.getters['school/schools']
        },
        schoolOpptions(){
           let data=[];
           if(this.schools){
             this.schools.forEach(sch=>{
                data.push({ value:sch._id, text:sch.name},)
             })
           }
          return data;
        },
        levels(){
            return  this.$store.getters['settings/getlevels']
        },
        levelOpptions(){
           let data=[];
           if(this.levels){
             this.levels.forEach(level=>{
                data.push({ value:level._id, text:level.grade},)
             })
           }
          return data;
        },
    },
    methods: {
        filter(){
            let payload=[];
                
            if(this.school){
                payload.push({school:this.school.value})
            }
            if(this.level){
                payload.push({level:this.level.value})
            }
            if(this.group){
                payload.push({classRoom:this.group.value})
            }
            if(payload.length>=1){
                this.$store.dispatch('management/filterstaff',payload);
                this.clearFilter=true;//display clear
            }
            
        },
        clear(){
            this.school=null;
            this.level=null;
            this.group=null;
            this.$store.dispatch('management/resetStaffFilter')
            this.clearFilter=false;

        },
       
    },
}
</script>