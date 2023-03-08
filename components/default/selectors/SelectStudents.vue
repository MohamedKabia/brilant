<template>
    <div>
        <v-dialog 
            v-model="dialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
            scrollable
             >
            <v-card>
                <v-toolbar
                    flat
                    dark
                    color="primary"
                    class="info--text"
                    light
                    >
                    <v-btn
                        class="ml-1"
                        icon 
                        outlined
                        color="error"
                        @click="close"
                        >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Fee Assigning</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-text-field 
                        v-model="search"
                        dense
                        rounded
                        outlined
                        label="Search"
                        class="mt-5 pt-2"
                    />
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn
                            dark
                            color="secondary"
                            text
                            @click="close"
                        >
                        Apply
                        </v-btn>
                    </v-toolbar-items>
                    
                </v-toolbar>
                <div class="pa-5">
                        <v-toolbar flat>
                            <v-toolbar-items>
                                <v-combobox
                                v-model="yearStarted"
                                :items="acYears"
                                label="Year Started"
                                dense
                                outlined  
                                multiple
                            ></v-combobox>
                            <v-combobox
                                v-model="level"
                                :items="levelOpptions"
                                label="level"
                                dense
                                outlined  
                                multiple
                            ></v-combobox>
                            <v-combobox
                                v-model="group"
                                :items="classOpptions"
                                label="Class/Form/Group"
                                dense
                                outlined  
                            ></v-combobox>
                            <div><v-btn  color="info">Filter</v-btn></div>
                            </v-toolbar-items>
                        </v-toolbar>
                    </div>
                <v-card-text>
                    <v-data-table
                        v-model="selected"
                        :headers="headers"
                        :items="students"
                        item-key="_id"
                        class="elevation-1"
                        show-select
                        :search="search"
                        hide-default-footer
                    >
                    <template v-slot:item.firstName="{item}">
                        <div class="primary--text">
                        <nuxt-link :to='"/students/"+item._id'>
                            <v-avatar
                            size="36px"
                            >
                            <img
                                :alt="item.firstName+' '+item.LastName"
                                :src='baseUrl+"/"+item.pp'
                            >
                            
                            </v-avatar>
                            <span v-if="item" class="ml-3">{{item.firstName}} <span v-if="item.middletName">{{item.middleName}}</span> {{ item.lastName }}</span>
                            </nuxt-link>
                        </div>
                    </template>
                    <template v-slot:item.dob="{item}">
                        <v-chip
                        class="ma-2"
                        outlined
                        >
                        {{item.dob | moment("dddd, MMMM Do YYYY")}}
                        </v-chip>
                    </template>
                    <template v-slot:item.level="{item}">
                        <div class="secondary--text">
                        {{ item.level.grade }}/{{ item.level.level }}
                        </div>
                    </template>
                    </v-data-table>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import StaffTable from '../StaffTable.vue'
export default {
    props:['dialog'],
    components:{StaffTable},
    data(){
        return{
            yearStarted:"",
            group:"",
            level:"",
            selected: [],
            search: '',
            errorMessage:null,
            editedItem:null,
            highletedItem:null,
            selectedItems:null,
            acYears:['2020/2021','2022/2023'],
            
            headers:[
            {
                text: 'StudentID',
                align: 'start',
                sortable: true,
                value: 'studentId',
                },
                {
                text: 'First Name',
                align: 'start',
                sortable: false,
                value: 'firstName',
                },
                {
                text: 'Class',
                value: 'class',
                filter: value => {
                    if (!this.class) return true
    
                    return value < parseInt(this.class)
                },
                },
                { text: 'DOB', value: 'dob' },
                { text: 'Form/Grade', value: 'level' },
            ],
           
        }
    },
    computed: {
        students(){
               return this.$store.getters['management/getStudents'];
        },
        baseUrl(){
            return this.$store.getters['management/baseUrl'];
        },
        staff(){
            return  this.$store.getters['management/getStaff']
        },
        baseUrl(){
            return this.$store.getters['management/baseUrl']
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
        
        close (date) {
          this.$emit('update:option', {dialog:false,data:this.selectedItems});
        },
    },
}
</script>