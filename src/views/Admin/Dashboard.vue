<template>
  <!-- ส่วนจัดเเสดง -->
  <div id="AdminDashboard">
    <NavbarAdmin />
    <v-card class="cardshow">
      <v-toolbar dark prominent color="#00B8D4">
        <h1>Dashboard</h1>
        <v-spacer></v-spacer>
      </v-toolbar>

            <!-- ตอนเช้า -->
      <v-card
        height="200px"
        v-if="
          d == '5' ||
          d == '6' ||
          d == '7' ||
          d == '8' ||
          d == '9' ||
          d == '10' ||
          d == '11'
        "
      >
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
      <!-- ตอนเช้า -->

      <!-- ตอนเทียง -->
      <v-card height="200px" v-if="d == '12'">
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
                เที่ยงแล้วอย่าลืมหาอะไรทานด้วยหล่ะ
              </p>
            </v-col>
          </v-row>
        </v-img>
      </v-card>
      <!-- ตอนเทียง -->

      <!-- ตอนบ่าย -->
      <v-card height="200px" v-if="d == '13' || d == '14' || d == '15'">
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
                บ่ายนี้คุณต้องการทำอะไร ?
              </p>
            </v-col>
          </v-row>
        </v-img>
      </v-card>
      <!-- ตอนบ่าย -->

      <!-- ตอนเย็น -->
      <v-card height="200px" v-if="d == '16' || d == '17' || d == '18'">
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
                เย็นนี้คุณต้องการทำอะไร ?
              </p>
            </v-col>
          </v-row>
        </v-img>
      </v-card>
      <!-- ตอนเย็น -->

      <!-- ตอนดึก -->
      <v-card
        height="200px"
        v-if="
          d == '19' ||
          d == '20' ||
          d == '21' ||
          d == '22' ||
          d == '23' ||
          d == '0' ||
          d == '1' ||
          d == '2' ||
          d == '3' ||
          d == '4'
        "
      >
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
                ดึกแล้วอย่าลืมพักผ่อนด้วยหล่ะ ?
              </p>
            </v-col>
          </v-row>
        </v-img>
      </v-card>
      <!-- ตอนดึก -->

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
          <v-toolbar dark prominent color="#00B8D4">
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
          <v-toolbar dark prominent color="#00B8D4">
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
      d: new Date().getHours(),
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
