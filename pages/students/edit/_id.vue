<template>
    <div>
        <v-container>
            <Titlebar title="Edit Student"/>
            <editStudent/>
        </v-container>
    </div>
</template>
<script>
    import editStudent from "../../../components/editStudent.vue"
    import Titlebar from "../../../components/default/Titlebar.vue";
export default {
    name:'StudentList',
    components:{Titlebar,editStudent},
    data() {
        return {
            
        }
    },
}
</script>