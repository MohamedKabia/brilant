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
                        <v-col cols="12" class="primary mt-3">
                            <v-card>
                                <v-card-text>
                                    <v-row justify-center align-center>
                                        <v-col cols="6">
                                            <div class="align-center d-flex h-100">
                                                <span class="primary--text"> 
                                                    {{ today | moment("dddd, MMMM Do YYYY") }}
                                                </span>
                                            </div>
                                        </v-col>
                                        <v-col cols="4">
                                            <div class="align-center d-flex h-100">
                                             <span class="primary--text"> {{currentTime}}</span>
                                            </div>
                                        </v-col>
                                        <v-col cols="2">
                                            <v-switch v-model="attend">

                                            </v-switch>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="6">
                            <ul class="u-list">
                                <li>ID:</li>
                                <li>Name:</li>
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
            attend:false,
        }
    },
    computed: {
        id(){
            console.log(this.$route.params.id)
            return this.$route.params.id
        },
        today(){
            return new Date()
        },
        currentTime(){
            return this.today.getHours() +":"+this.today.getMinutes()
        }
    },
}
</script>