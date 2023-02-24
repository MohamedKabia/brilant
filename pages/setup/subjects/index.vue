<template>
    <div>
        <v-container>
            
           <Subject/>
        </v-container>
    </div>
</template>
<script>
import Subject from "../../../components/Subjects.vue"

export default {
    components:{Subject},
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
