<template>
    <div>
        <v-container>
            <Classes/>
        </v-container>
    </div>
</template>
<script>
import Classes from '../../../components/ClassesComponents/Classes.vue'
export default {
    components:{Classes},
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
      classes(){
        return this.$store.getters['settings/classes']
      }  
    },
    methods: {
        closeDialog(){
            this.dialog=false
        }
    },
}
</script>
