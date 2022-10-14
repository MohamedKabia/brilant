<template>
    <div>
        <v-container>
            <Titlebar title="Subjects"/>
            <Subjects/>
        </v-container>
    </div>
</template>
<script>
    import Subjects from '../../components/Subjects.vue'
    import Titlebar from "../../components/default/Titlebar.vue";
export default {
    name:'StudentList',
    components:{Subjects,Titlebar},
    data() {
        return {
            
        }
    },
}
</script>