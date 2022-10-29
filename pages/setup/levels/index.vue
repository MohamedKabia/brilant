<template>
    <div>
        <v-container>
            <Titlebar title="Levels"/>
            <Levels/>
        </v-container>
    </div>
</template>
<script>
    import Levels from '../../../components/Levels.vue'
    import Titlebar from "../../../components/default/Titlebar.vue";
export default {
    name:'StudentList',
    components:{Levels,Titlebar},
    data() {
        return {
            
        }
    },
}
</script>