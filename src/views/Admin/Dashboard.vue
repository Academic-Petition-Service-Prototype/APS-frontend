<template>
  <!-- ส่วนจัดเเสดง -->
  <div id="AdminDashboard">
    <NavbarAdmin />
    <v-card class="cardshow">
      <v-toolbar dark prominent color="#FFAB40">
        <h1>Dashboard Chief</h1>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-row>
        <v-col>
          <!-- จำนวนคำร้องที่ส่งเข้ามาทั้งหมด -->

          <b-card
            :img-src="require('../../assets/Docicon.png')"
            img-width="130"
            img-height="130"
            img-left="true"
            class="mb-3 box-margin"
          >
            <b-card-text> จำนวนคำร้องที่ส่งเข้ามาทั้งหมด </b-card-text>
            <h5>{{ sumpentition }}</h5>
          </b-card>

          <!-- จำนวนคำร้องที่ส่งเข้ามาทั้งหมด -->
        </v-col>
        <v-col>
          <!-- จำนวนคำร้องที่ส่งเข้ามาทั้งหมด -->

          <b-card
            :img-src="require('../../assets/Docicon2.png')"
            img-width="130"
            img-height="130"
            img-left="true"
            class="mb-3 box-margin"
          >
            <b-card-text> จำนวนคำร้องที่ส่งเข้ามาทั้งหมด </b-card-text>
            <h5>{{ pentitionapprove }}</h5>
          </b-card>

          <!-- จำนวนคำร้องที่ส่งเข้ามาทั้งหมด -->
        </v-col>

        <v-col>
          <!-- คำร้องที่ต้องอนุมัตทั้งหมด -->

          <b-card
            :img-src="require('../../assets/Docicon3.png')"
            img-width="130"
            img-height="130"
            img-left="true"
            class="mb-3 box-margin"
          >
            <b-card-text> คำร้องที่ต้องอนุมัตทั้งหมด </b-card-text>
            <h5>{{ pentitionsuccess }}</h5>
          </b-card>

          <!-- คำร้องที่ต้องอนุมัตทั้งหมด -->
        </v-col>
      </v-row>

      <!-- chart -->
      <v-row>
        <v-col>
          <GChart
            type="ColumnChart"
            :data="chartData1"
            :options="chartOptions1"
          />
        </v-col>
      </v-row>
      <!-- chart -->

      <!-- chart -->
      <v-row>
        <v-col>
          <v-toolbar dark prominent color="#FFAB40">
            <h1>จำนวณคำร้อง / รายงาน</h1>
            <v-spacer></v-spacer>
          </v-toolbar>
          <GChart
            type="ColumnChart"
            :data="chartData2"
            :options="chartOptions2"
          />
        </v-col>
      </v-row>
      <!-- chart -->
      <!-- แถว2 -->

      <!-- เเถว3 -->
      <v-row>
        <v-col>
          <v-toolbar dark prominent color="#FFAB40">
            <h1>จำนวณบุคคลกร</h1>
            <v-spacer></v-spacer>
          </v-toolbar>

          <GChart
            type="PieChart"
            :data="PieChart"
            :options="PieChartOptions2"
          />
        </v-col>
      </v-row>
      <!-- เเถว3 -->
    </v-card>
  </div>
  <!-- ส่วนจัดเเสดง -->
</template>

<script>
import { GChart } from "vue-google-charts";
import NavbarAdmin from "../../components/NavbarAdmin.vue";
export default {
  name: "AdminDashboard",
  components: {
    NavbarAdmin,
    GChart,
  },
  data() {
    return {
      datastu: [
        {
          id: "01",
          Fname: "Chayanin Buasala",
          petition: 50,
          report: 10,
          tarcking: 9,
        },
      ],
      sumpentition: 10,
      pentitionapprove: 11,
      pentitionsuccess: 12,
      chartData1: [
        [
          "month",
          "จำนวนคำร้องที่ส่งเข้ามาทั้งหมด",
          "คำร้องที่ต้องอนุมัตทั้งหมด",
          "คำร้องที่สำเร็จ",
        ],
        ["มกราคม", 80, 400, 200],
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
      chartOptions1: {
        chart: {
          title: "Company Performance",
          subtitle: "Sales, Expenses, and Profit: 2014-2017",
        },
        colors: ["#31BDDC", "#FE6666", "#72D362"],
        bars: "horizontal",
      },

      chartData2: [
        [
          "month",
          "จำนวนคำร้องที่ส่งเข้ามาทั้งหมด",
          "คำร้องที่ต้องอนุมัตทั้งหมด",
          "คำร้องที่สำเร็จ",
        ],
        ["มกราคม", 80, 400, 200],
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
      chartOptions2: {
        chart: {
          title: "Company Performance",
          subtitle: "Sales, Expenses, and Profit: 2014-2017",
        },
        colors: ["#d06cf3", "#ff2b2b", "#ff7b2b"],
        bars: "horizontal",
      },
      PieChart: [
        ["Task", "Hours per Day"],
        ["หัวหน้างาน (Chief)", 11],
        ["พนังงาน (Officer)", 2],
        ["ผู้ใช้งาน (User)", 2],
      ],
      PieChartOptions2: {
        chart: {
          title: "Company Performance",
          subtitle: "Sales, Expenses, and Profit: 2014-2017",
        },
        colors: ["#d06cf3", "#ff2b2b", "#ff7b2b"],
        bars: "horizontal",
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
