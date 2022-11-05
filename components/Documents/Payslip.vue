<template>
    <div v-if="selected">
    <v-container>
        <div class="page" >
            <div class="institution">
                <div class="logo">
                    <img
                    src='https://picsum.photos/250'
                    class="responsive-img"
                    />
                </div>
                <div class="name mt-3">
                    Goldent Software Sierra Leone Limited
                </div>
            </div>
            <br>
            <div class="center doc-title">Salary Payslip</div>

            <v-row class="mt-20 pa-20">
                <v-col cols="10">
                    Month:
                </v-col>
                <v-col cols="2">
                    December,2022
                </v-col>
                <v-col cols="12">
                   <v-divider></v-divider>
                </v-col>

                <v-col cols="12">
                    <h2>Personal Information</h2>
                    <p>Name : Osman Sesay</p>
                    <p>Position : Finance Officer</p>
                    <p>Grade : 3</p>
                   <v-divider></v-divider>
                </v-col>
                <v-col cols="12">
                    <h2>Wages Calculation</h2>
                    <v-row>
                        <v-col cols="6">
                            Basic Salary:
                        </v-col>
                        <v-col cols="6" class="right-text">
                            Le 1,000,000
                        </v-col>

                        <v-col cols="6">
                            Basic Salary:
                        </v-col>
                        <v-col cols="6" class="right-text">
                            Le 1,000,000
                        </v-col>
                        <v-col cols="6">
                            <h3>Gross Salary:</h3>
                        </v-col>
                        <v-col cols="6" class="right-text">
                            <h3>Le 1,403,000</h3>
                        </v-col>
                    </v-row>
                   <v-divider></v-divider>
                </v-col>

                <v-col cols="12">
                    <h2>Deductions</h2>
                    <v-row>
                        <v-col cols="6">
                            P.A.Y.E:
                        </v-col>
                        <v-col cols="6" class="right-text">
                            Le 76,000
                        </v-col>

                        <v-col cols="6">
                            Nassit Contribution
                        </v-col>
                        <v-col cols="6" class="right-text">
                            Le 150,000
                        </v-col>
                        <v-col cols="6">
                            <h3>Total Deductions:</h3>
                        </v-col>
                        <v-col cols="6" class="right-text">
                            <h3>Le 217,000</h3>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12">
                    <v-row>
                        <v-col cols="6">
                            <h3>Net Salary:</h3>
                        </v-col>
                        <v-col cols="6" class="right-text">
                            <h3>Le 1,186,000</h3>
                        </v-col>
                    </v-row>
                    <v-divider></v-divider>
                </v-col>

                <v-col cols="12" class="mt-10">
                    <v-row>
                        <v-col cols="6">
                            <h3>Signature of Employee....................</h3>
                        </v-col>
                        <v-col cols="6" class="right-text">
                            <h3>Date 04/11/2022</h3>
                        </v-col>
                    </v-row>

                </v-col>
            </v-row>
          
           <div class="stamp-area"></div>
        <footerVue/>
        
        </div>
    </v-container>
</div>
</template>
<script>
import Schoollogo from "../schoollogo.vue"
import footerVue from './footer.vue';
export default {
    components:{footerVue,Schoollogo},
    props:['selected'],
    data() {
        return {
            
        }
    },
    methods: {
        
    },
}
</script>