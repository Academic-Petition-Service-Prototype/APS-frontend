<template>
  <!-- ส่วนจัดเเสดง -->
  <div id="DashboardSTU">
    <NavbarSecretary />
    <v-card class="cardshow">
      <v-toolbar dark prominent color="#8BC34A">
        <h1 class="text-center pa-5">หน้าแรก</h1>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-card height="200px">
        <v-img
          height="200px"
          src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
        >
          <!-- <div class="fill-height repeating-gradient"></div> -->
          <v-row>
            <v-col>
              <p class="banneruser">สวัสดี !</p>
            </v-col>
            <v-col align="center">
              <p class="banneruserf_name">
                คุณ {{ profile[0].f_name }}
                <br />
                เช้านี้คุณต้องการทำอะไร ?
              </p>
            </v-col>
          </v-row>
        </v-img>
      </v-card>

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
          <GChart
            type="ColumnChart"
            :data="chartData"
            :options="chartOptions"
          />

          <v-toolbar dark prominent color="#8BC34A">
            <h1 class="text-center pa-5">แผนภูมิวงกลม</h1>
            <v-spacer></v-spacer>
          </v-toolbar>

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
      profile: [
        {
          f_name: this.$store.getters.getUser.f_name,
          l_name: this.$store.getters.getUser.l_name,
          gender: this.$store.getters.getUser.gender,
          email: this.$store.getters.getUser.email,
          tel_num: this.$store.getters.getUser.tel_num,
          address: this.$store.getters.getUser.address,
          role: this.$store.getters.getUser.role,
        },
      ],
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
        [
          "month",
          "คำร้องที่เข้ามาทั้งหมด",
          "รายงานที่ยังไม่ได้อ่าน",
          "คำร้องที่ต้องอนุมัติ",
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
      chartOptions: {
        chart: {
          title: "Company Performance",
          subtitle: "Sales, Expenses, and Profit: 2014-2017",
        },
        colors: ["#31BDDC", "#FE6666", "#72D362"],
        bars: "horizontal",
      },
      PieChart: [
        ["Task", "Hours per Day"],
        ["คำร้องที่เข้ามาทั้งหมด ", 11],
        ["รายงานที่ยังไม่ได้อ่าน ", 2],
        ["คำร้องที่ต้องอนุมัติ", 2],
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
h1 {
  font-size: 50px;
  padding: 2% 0% 0% 0%;
}
.banneruser {
  font-size: 80px;
  padding: 10%;
  margin: -25px -100px -50px 50px;
}
.banneruserf_name {
  font-size: 25px;
  margin: -50px 100px -50px 50px;
  padding: 15%;
  font-size: 21px;
}
</style>
