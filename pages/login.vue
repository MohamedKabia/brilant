<template>
    <div>
        <v-container>
                <v-row>
                <v-col cols="12" sm="10" class="offset-sm-1">
                    <v-card flat>
                        <v-card-text>
                            <v-row class="align-center">
                                <v-col cols="12" sm="6" class="primary light pattern-bg vh-90">
                                
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <div class="center">
                                    <h1 class="mb-5">{{title}}</h1>

                                    <div class="d-flex justify-center align-center">
                                        <v-btn-toggle
                                        rounded
                                        >
                                        <v-btn to="/stafflogin" color="primary">Staff <v-icon>mdi-account-hard-hat-outline</v-icon></v-btn>
                                        <v-btn to="/studentlogin" color="info">Student <v-icon>mdi-account-school-outline</v-icon></v-btn>
                                        <v-btn to="/parentlogin" color="secondary">Parent <v-icon>mdi-account-multiple-outline</v-icon></v-btn>
                                        </v-btn-toggle>
                                    </div>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
                </v-row>
       
        </v-container>
    </div>
</template>
<script>
export default {
    data() {
        return {
            title:"Select Login Type",
        }
    },
    computed: {
        user(){
            return this.$store.getters['account/getUser']
        }
	},
    methods: {
       
        login(){
           let  data={
            staffId:this.staffId,
            password:this.password
            }
            this.$store.dispatch("account/staffLogin",data);
        }
    },
    watch: {
		user(val){
			if(val){
				this.$router.push('/') 
			}
			
		}
	  },
}
</script>