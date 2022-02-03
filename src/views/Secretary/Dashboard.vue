<template>
  <!-- ส่วนจัดเเสดง -->
  <div id="DashboardSTU">
    <NavbarSecretary />
    <v-card class="cardshow">
      <h1>
        Dashboard
        <v-divider></v-divider>
      </h1>
      
      <v-row>
        <v-col>
          <!-- รายงานเอกสารที่ทำไป -->

          <b-card
            :img-src="require('../../assets/Docicon.png')"
            img-width="130"
            img-height="130"
            img-left="true"
            class="mb-3 box-margin"
          >
            <b-card-text> คำร้องที่เข้ามาทั้งหมด </b-card-text>
            <h5>{{ sumpentition }}</h5>
          </b-card>

          <!-- รายงานเอกสารที่ทำไป -->
        </v-col>
        <v-col>
          <!-- รายงานเอกสารที่ทำไป -->

          <b-card
            :img-src="require('../../assets/Docicon2.png')"
            img-width="130"
            img-height="130"
            img-left="true"
            class="mb-3 box-margin"
          >
            <b-card-text> รายงานที่ยังไม่ได้อ่าน </b-card-text>
            <h5>{{ sumreport }}</h5>
          </b-card>

          <!-- รายงานเอกสารที่ทำไป -->
        </v-col>

        <v-col>
          <!-- รายงานเอกสารที่ทำไป -->

          <b-card
            :img-src="require('../../assets/Docicon3.png')"
            img-width="130"
            img-height="130"
            img-left="true"
            class="mb-3 box-margin"
          >
            <b-card-text> คำร้องที่ต้องอนุมัติ </b-card-text>
            <h5>{{ sumrsuccess }}</h5>
          </b-card>

          <!-- รายงานเอกสารที่ทำไป -->
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <h1>
            จำนวณคำร้อง / รายงาน
            <v-divider></v-divider>
          </h1>

         
          <GChart
            type="ColumnChart"
            :data="chartData"
            :options="chartOptions"
            
          />

          <GChart
            type="PieChart"
            :data="PieChart"
            :options="PieChartOptions2"
            
          />
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import { GChart } from "vue-google-charts";
import NavbarSecretary from "../../components/NavbarSecretary.vue";
export default {
  name: "DashboardSecretary",
  components: {
    NavbarSecretary,
    GChart,
  },
  data() {
    return {
      datastu: [
        {
          id: "01",
          Fname: "Chayanin Buasala",
          sumpentition: 50,
          report: 10,
          tarcking: 9,
        },
      ],
      username: "",
      sumpentition: 10,
      sumreport: 10,
      sumrsuccess: 10,
      chartData: [
        ["month", "คำร้องที่เข้ามาทั้งหมด", "รายงานที่ยังไม่ได้อ่าน", "คำร้องที่ต้องอนุมัติ"],
        ["มกราคม", 80, 400, 200,],
        ["กุมภาพันธ์", 1170, 460, 250],
        ["มีนาคม", 660, 1120, 300],
        ["เมษายน", 1030, 540, 350],
        ["พฤษภาคม", 1030, 540, 350],
        ["มิถุนายน", 1030, 540, 350],
        ["กรกฎาคม", 1030, 540, 350],
        ["สิงหาคม", 1030, 540, 350],
        ["กันยายน", 1030, 540, 350],
        ["ตุลาคม", 1030, 540, 350],
        ["พฤศจิกายน", 1030, 540, 350],
        ["ธันวาคม", 1030, 540, 350],
      ],
      chartOptions: {
        chart: {
          title: "Company Performance",
          subtitle: "Sales, Expenses, and Profit: 2014-2017",
          
        },
        colors: ['#31BDDC', '#FE6666', '#72D362'],
         bars: 'horizontal',
         
      },
      PieChart: [
        ['Task', 'Hours per Day'],
          ['คำร้องที่เข้ามาทั้งหมด ',     11],
          ['รายงานที่ยังไม่ได้อ่าน ',      2],
          ['คำร้องที่ต้องอนุมัติ',  2],
          
      ],
      PieChartOptions2: {
        chart: {
          
          title: "Company Performance",
          subtitle: "Sales, Expenses, and Profit: 2014-2017",
        },
        colors: ["#d06cf3", "#ff2b2b", "#ff7b2b"],
        bars: "horizontal",
        is3D: true,
        height: 500,
        
        
      },
    };
  },
};
</script>

<style scoped>
.bg-color {
  background: #f0f0f0;
  height: 100%;
}
.cardmargin {
  margin: 2%;
}
.box-margin {
  margin: 5%;
}

</style>





