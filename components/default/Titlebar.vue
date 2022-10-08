<template>
    <div>
        <v-container class="titlebar">
            <h1 class="cap">{{routeName}}</h1>
        </v-container>
    </div>
</template>
<script>
export default {
    computed: {
        routeName() {
        return this.$route.name;
    }
}
}
</script>