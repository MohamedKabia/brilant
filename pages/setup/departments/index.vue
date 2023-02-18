<template>
    <div>
        <v-containe>
            
           <Department/>
            <CreateSchool :dialog="dialog" @update:option="closeDialog"/>
        </v-containe>
    </div>
</template>
<script>
import CreateSchool from '../../../components/SchoolCompinent/create.vue';
import Department from "../../../components/Departments"

export default {
    components:{CreateSchool,Department},
    data(){
        return{
            dialog:false,
            schools:[
                {
                _id:'62',
                color: '#1F7087',
                src: 'logo.jpeg',
                title: 'Supermodel',
                artist: 'Foster the People',
                },
            ]
        }
    },
    computed: {
        
    },
    methods: {
        closeDialog(){
            this.dialog=false
        }
    },
}
</script>
