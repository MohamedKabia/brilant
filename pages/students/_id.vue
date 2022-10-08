<template>
    <div>
        <v-container>
            <v-row>
                <v-col cols="12" sm="4">
                    <v-img
                    src="/pp.png"
                    aspect-ratio="0.9"
                    ></v-img>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-row>
                        <v-col cols="6">
                            <ul class="u-list">
                                <li>ID:</li>
                                <li>Name:</li>
                                <li>Email:</li>
                                <li>DOB:</li>
                                <li>Gender:</li>
                                <li>Gade/Form:</li>
                                <li>Departmetn:</li>
                            </ul>
                        </v-col>

                        <v-col cols="6">
                            <ul class="u-list">
                                <li>{{id}}</li>
                                <li>Medvik</li>
                                <li>kabiam@goldentsoftware.com</li>
                                <li>30/05/2002</li>
                                <li>Male</li>
                                <li>12</li>
                                <li>Pure Science</li>
                            </ul>
                        </v-col>
                    </v-row>

                   
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
export default {
    data() {
        return {
            
        }
    },
    computed: {
        id(){
            console.log(this.$route.params.id)
            return this.$route.params.id
        }
    },
}
</script>