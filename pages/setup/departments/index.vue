<template>
    <div>
        <v-container>
            
           <Department/>
        </v-container>
    </div>
</template>
<script>
import Department from "../../../components/Departments"

export default {
    components:{Department},
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
