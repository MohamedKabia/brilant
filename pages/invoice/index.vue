<template>
    <div>
        <v-container>
            <Titlebar title="Invoice"/>
            <Invoice/>
        </v-container>
    </div>
</template>
<script>
    import Invoice from '../../components/Invoice.vue'
    import Titlebar from "../../components/default/Titlebar.vue";
export default {
    name:'StudentList',
    components:{Invoice,Titlebar},
    data() {
        return {
            
        }
    },
}
</script>