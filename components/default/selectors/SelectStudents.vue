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
                            @click="apply"
                        >
                        Apply
                        </v-btn>
                    </v-toolbar-items>
                    
                </v-toolbar>
                    
                <v-card-text>
                    <FilterCoomponent/>
                    <v-chip
                        color="warning"
                        class="ml-2 mb-3"
                    >
                        {{ selected.length }} student selected
                    </v-chip>
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
import FilterCoomponent from "./Filter.vue"
export default {
    props:['dialog'],
    components:{FilterCoomponent},
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
            school:null,
                        
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
               return this.$store.getters['management/filteredStudents'];
        },
        baseUrl(){
            return this.$store.getters['management/baseUrl'];
        },
       
        baseUrl(){
            return this.$store.getters['management/baseUrl']
        },

    },
    methods: {
        
        clear(){
            this.school=null;
            this.level=null;
            this.group=null;
            this.selected=[];
            this.$store.dispatch('management/resetStudentFilter')
        },
        close (date) {
          this.$emit('update:option', {dialog:false,data:null});
          this.clear();
        },
        apply(){
            let data= this.selected;
            this.$emit('update:option', {dialog:false,data});
            this.clear();
        }
    },
}
</script>