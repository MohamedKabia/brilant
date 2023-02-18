<template>
    <div>
        <v-containe>
            
            <v-row dense>
                <v-col cols="12">
                    <div class="d-flex">
                        <div class="title">Schools</div>
                        <v-spacer></v-spacer>
                        <div>
                            <v-btn rounded outlined color="primary" @click="dialog=!dialog">
                                Create <v-icon>mdi-plus</v-icon>
                            </v-btn>
                        </div>
                    </div>
                </v-col>
                <v-col cols="6" v-for="item in schools" :key="item._id">
                    <v-card
                        :color="item.color"
                        dark
                    >
                        <div class="d-flex flex-no-wrap justify-space-between">
                        <div>
                            <v-card-title
                            class="text-h5"
                            v-text="item.title"
                            ></v-card-title>

                            <v-card-subtitle v-text="item.artist"></v-card-subtitle>

                            <v-card-actions>
                            <v-btn
                                v-if="item.artist === 'Ellie Goulding'"
                                class="ml-2 mt-3"
                                fab
                                icon
                                height="40px"
                                right
                                width="40px"
                            >
                                <v-icon>mdi-play</v-icon>
                            </v-btn>

                            <v-btn
                                v-else
                                class="ml-2 mt-5"
                                outlined
                                rounded
                                small
                                icon
                            >
                                Edit <v-icon class="ml-2" color="info">mdi-pencil</v-icon>
                            </v-btn>

                            <v-btn
                                v-else
                                class="ml-2 mt-5"
                                outlined
                                rounded
                                small
                                icon
                            >
                                Remove <v-icon class="ml-2" color="error">mdi-delete</v-icon>
                            </v-btn>
                            </v-card-actions>
                        </div>

                        <v-avatar
                            class="ma-3"
                            size="125"
                            tile
                        >
                            <v-img :src="item.src"></v-img>
                        </v-avatar>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
            <CreateSchool :dialog="dialog" @update:option="closeDialog"/>
        </v-containe>
    </div>
</template>
<script>
import CreateSchool from '../../../components/SchoolCompinent/create.vue';
export default {
    components:{CreateSchool},
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
