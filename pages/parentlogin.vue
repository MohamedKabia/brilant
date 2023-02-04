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
                                    <h1 class="mb-5 pb-5">{{title}}</h1>
                                    
                                    
                                </div>
                                    <v-form>
                                        <v-text-field
                                            class="text-uppercase"
                                            v-model="staffId"
                                            
                                            label="Staf ID"
                                            outlined
                                            dense
                                        ></v-text-field>
                                        <v-text-field
                                            class="text-uppercase"
                                            v-model="password"
                                            
                                            label="Password"
                                            outlined
                                            dense
                                        ></v-text-field>

                                        <v-btn color="primary" dense @click="login">
                                            Login <v-icon>mdi-account</v-icon>
                                        </v-btn>
                                    </v-form>

                                    <div class="mt-5 center">
                                        <div class="mt-4">
                                        <div>
                                            Are you a student?  
                                            <v-btn text color="info" to="/studentlogin">login as student</v-btn>
                                        </div>
                                    </div>
                                    <v-divider></v-divider>
                                    <div class="mt-4">
                                        <div>
                                            Are you a parent?  
                                            <v-btn text color="info" dense to="/stafflogin">login as Staff</v-btn>
                                        </div>
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
            staffId:null,
            password:null,
            title:"Parent Login",
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