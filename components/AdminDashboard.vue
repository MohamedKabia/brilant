
<template>
  <v-container>
    <v-row>
      <v-col sm="6" md="3">
          <DataCardVue :data='data1'/>
      </v-col>
      <v-col sm="6" md="3">
          <DataCardVue :data='data4'/>
      </v-col>
      <v-col sm="6" md="3">
          <DataCardVue :data='data3'/>
      </v-col>
      <v-col sm="6" md="3">
          <DataCardVue :data='data4'/>
      </v-col>

      <v-col md="6" cols="12">
        <div>
            <apexcharts width="100%" type="bar" :options="options" :series="series" class="primary"></apexcharts>
        </div>
      </v-col>
      <v-col md="6" cols="12">
        <div>
            <apexcharts width="100%" type="bar" :options="options2" :series="options2.series" class="info"></apexcharts>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import DataCardVue from './default/DataCard.vue';
export default {
  components:{DataCardVue},
  data() {
      return {
        data1:{
          title:'45000',
          subtitle:"Students",
          icon:'mdi-account-school-outline ',
          color:'success'
        },
        data2:{
          title:'40',
          subtitle:"Awordees",
          icon:'mdi-file-certificate-outline ',
          color:'info'
        },
        data3:{
          title:'50',
          subtitle:"Teachers",
          icon:'mdi-human-male-board ',
          color:'secondary'
        },
        data4:{
          title:'Le 450,050',
          subtitle:"Revernue",
          icon:'mdi-cash-multiple ',
          color:'primary'
        },


          options: {
      chart: {
        id: 'vuechart-example'
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
      }
    },
    series: [{
      name: 'series-1',
      data: [30, 40, 45, 50, 49, 60, 70, 91]
    }],


    //second chat
    options2:{
          series: [
            {
          name: 'Girls',
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
        }, {
          name: 'Boys',
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
        },
        ],
          chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: ['G1', 'G1', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8', 'G9'],
        },
        yaxis: {
          title: {
            text: 'Students'
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return   val + " thousands"
            }
          }
        }
        },
      
      
    
      }
  },
}
</script>