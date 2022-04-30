<template>
  <!-- ส่วนจัดเเสดง -->
  <div id="ChiefDashboard">
    <NavbarChief />
    <v-card class="cardshow">
      <v-toolbar dark prominent color="primary">
        <h1 class="text-center pa-5">หน้าแรก</h1>
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
          :src="require('../../assets/Day.png')"
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
          :src="require('../../assets/Daytime.png')"
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
          :src="require('../../assets/Afternoon.png')"
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
          :src="require('../../assets/Evening.png')"
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
          :src="require('../../assets/night.png')"
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
            <b-card-text> จำนวนคำร้องที่สร้างเข้ามาทั้งหมด </b-card-text>
            <h5>{{ petitionList.length }}</h5>
          </b-card>

          <!-- จำนวนคำร้องที่ส่งเข้ามาทั้งหมด -->
        </v-col>
        <v-col>
          <!-- จำนวนคำร้องที่ส่งเข้ามาทั้งหมด -->

          <b-card
            :img-src="require('../../assets/Docicon4.png')"
            img-width="130"
            img-height="130"
            img-left="true"
            class="mb-3 box-margin"
          >
            <b-card-text> จำนวนคำร้องที่ส่งเข้ามาทั้งหมด </b-card-text>
            <h5>{{ petitionListById.length }}</h5>
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
            <h5>{{ listapproval.length }}</h5>
          </b-card>

          <!-- คำร้องที่ต้องอนุมัตทั้งหมด -->
        </v-col>
      </v-row>

      <v-row>
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
            <h5>{{ reportsunread.length }}</h5>
          </b-card>

          <!-- รายงานเอกสารที่ทำไป -->
        </v-col>

        <v-col>
          <!-- รายงานเอกสารที่ทำไป -->

          <b-card
            :img-src="require('../../assets/Docicon5.png')"
            img-width="130"
            img-height="130"
            img-left="true"
            class="mb-3 box-margin"
          >
            <b-card-text> คำขอที่ยังไม่ได้อ่าน </b-card-text>
            <h5>{{ requestsunread.length }}</h5>
          </b-card>

          <!-- รายงานเอกสารที่ทำไป -->
        </v-col>
      </v-row>
      <v-row>
        <v-col >
          <v-toolbar dark prominent color="#00B8D4">
            <h1>ข้อมูลภาพรวม</h1>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-col align="center">
          <GChart
            type="PieChart"
            :data="PieChart"
            :options="PieChartOptions2"
            style="width: 600px; height: 300px;"
            
          />
          </v-col>
          
        </v-col>
        
      </v-row>
    </v-card>
  </div>
  <!-- ส่วนจัดเเสดง -->
</template>

<script>
import NavbarChief from "../../components/NavbarChief.vue";
import axios from "axios";
import { GChart } from "vue-google-charts";
export default {
  name: "ChiefDashboard",
  components: {
    NavbarChief,
    GChart,
  },
  data() {
    return {
      petitionList: [],
      petitionListById: [],
      petitionListByIdcheck: [],
      listapproval: [],
      reports: [],
      reportsunread: [],
      requests: [],
      requestsunread: [],
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
      PieChart: [],
      PieChartOptions2: {
        chart: {
          title: "Company Performance",
          
        },
        colors: ["#d06cf3", "#ff2b2b", "#ff7b2b", "#E91E63"],
        bars: "horizontal",
        pieHole: 0.5,
         pieSliceTextStyle: {
            color: 'black',
          },
          
      },
    };
  },
  methods: {
    getpetition() {
      axios
        .post(process.env.VUE_APP_URL + "getforms", {
          user_id: this.$store.getters.getUser.user_id,
          role: this.$store.getters.getUser.role,
          agency: this.$store.getters.getUser.agency_name,
        })
        .then((response) => {
          // handle success
          this.petitionList = response.data;
          // console.log(response.data)
          for (let i = 0; i < this.petitionList.length; i++) {
            // date format
            this.petitionList[i].created_date = new Date(
              this.petitionList[i].created_date
            );
            this.petitionList[i].created_date = this.petitionList[
              i
            ].created_date.toLocaleDateString("th-TH", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              weekday: "short",
              hour: "numeric",
              minute: "numeric",
            });
            // date format
            
          }
          this.countpetitionList = this.petitionList.length;
            this.PieChart.push(
              ["name", "value"],
              ["จำนวนคำร้องที่สร้างเข้ามาทั้งหมด", this.countpetitionList]
            );
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    },
    getUserforms() {
      axios
        .post(process.env.VUE_APP_URL + "getsubmitformsbyagency", {
          agency_id: this.$store.getters.getUser.agencies_id,
        })
        .then((response) => {
          //handle success

          // approval_order
          this.petitionListById = response.data;
          for (let i = 0; i < this.petitionListById.length; i++) {
            this.tmp = JSON.stringify(this.petitionListById[i].approval_order);
            this.tmp = this.tmp.replace(/\\/g, "");
            this.specifics = this.tmp.replace(/\\/g, "");

            var temp = this.specifics.slice(1, -1);
            temp = JSON.parse(temp);
            this.petitionListById[i].approval_order = temp;
            // date format
            this.petitionListById[i].submit_date = new Date(
              this.petitionListById[i].submit_date
            );
            this.petitionListById[i].submit_date = this.petitionListById[
              i
            ].submit_date.toLocaleDateString("th-TH", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              weekday: "short",
              hour: "numeric",
              minute: "numeric",
            });
            // date format
            
          }
          this.countpetitionListById = this.petitionListById.length;
            this.PieChart.push(
              
              ["จำนวนคำร้องที่ส่งเข้ามาทั้งหมด", this.countpetitionListById]
            );
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    },

    getpetitioncheck() {
      axios
        .post(process.env.VUE_APP_URL + "getsubmitforms", {
          user_id: this.$store.getters.getUser.user_id,
        })
        .then((response) => {
          //handle success

          // approval_order
          this.petitionListByIdcheck = response.data;

          for (let i = 0; i < this.petitionListByIdcheck.length; i++) {
            this.tmp = JSON.stringify(
              this.petitionListByIdcheck[i].approval_order
            );
            this.tmp = this.tmp.replace(/\\/g, "");
            this.specifics = this.tmp.replace(/\\/g, "");

            var temp = this.specifics.slice(1, -1);
            temp = JSON.parse(temp);
            this.petitionListByIdcheck[i].approval_order = temp;

            // date format
            this.petitionListByIdcheck[i].submit_date = new Date(
              this.petitionListByIdcheck[i].submit_date
            );
            this.petitionListByIdcheck[i].submit_date =
              this.petitionListByIdcheck[i].submit_date.toLocaleDateString(
                "th-TH",
                {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                  weekday: "short",
                  hour: "numeric",
                  minute: "numeric",
                }
              );
            // date format

            for (
              let j = 0;
              j < this.petitionListByIdcheck[i].approval_order.length;
              j++
            ) {
              if (
                this.petitionListByIdcheck[i].approval_order[j].approver_name
                  .user_id == this.$store.getters.getUser.user_id
              ) {
                if (
                  this.petitionListByIdcheck[i].approval_order[0].approver_name
                    .f_name == this.$store.getters.getUser.f_name &&
                  this.petitionListByIdcheck[i].approval_order[0].approver_name
                    .l_name == this.$store.getters.getUser.l_name &&
                  this.petitionListByIdcheck[i].approval_order[0].approver_name
                    .user_id == this.$store.getters.getUser.user_id
                ) {
                  if (
                    this.petitionListByIdcheck[i].approval_order[j]
                      .approver_state == "ยังไม่ได้อนุมัติ"
                  ) {
                    this.listapproval.push(this.petitionListByIdcheck[i]);
                  }
                } else if (
                  this.petitionListByIdcheck[i].approval_order[j - 1]
                    .approver_state == "อนุมัติแล้ว" &&
                  this.petitionListByIdcheck[i].approval_order[j]
                    .approver_state == "ยังไม่ได้อนุมัติ"
                ) {
                  this.listapproval.push(this.petitionListByIdcheck[i]);
                }
              }
            }
            
          }
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    },

    getreport() {
      axios
        .post(process.env.VUE_APP_URL + "agencyreports", {
          agency_id: this.$store.getters.getUser.agencies_id,
        })
        .then((response) => {
          // handle success
          this.reports = response.data;
          for (let i = 0; i < this.reports.length; i++) {
            // date format
            this.reports[i].report_created = new Date(
              this.reports[i].report_created
            );
            this.reports[i].report_created = this.reports[
              i
            ].report_created.toLocaleDateString("th-TH", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              weekday: "short",
              hour: "numeric",
              minute: "numeric",
            });
            // date format

            if (this.reports[i].report_state == "unread") {
              this.reportsunread.push(this.reports[i]);
            } 
          }
          this.reports = this.reports.length;
            this.PieChart.push(
              
              ["จำนวนรายงายที่ส่งเข้ามาทั้งหมด", this.reports]
            );
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    },

    getrequest() {
      axios
        .post(process.env.VUE_APP_URL + "agencyrequests", {
          agency_id: this.$store.getters.getUser.agencies_id,
        })
        .then((response) => {
          // handle success
          this.requests = response.data;
          for (let i = 0; i < this.requests.length; i++) {
            // date format
            this.requests[i].request_created = new Date(
              this.requests[i].request_created
            );
            this.requests[i].request_created = this.requests[
              i
            ].request_created.toLocaleDateString("th-TH", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              weekday: "short",
              hour: "numeric",
              minute: "numeric",
            });
            // date format

            if (this.requests[i].request_state == "unread") {
              this.requestsunread.push(this.requests[i]);
            } else {
              // อิอิ
            }
          }
          this.requests = this.requests.length;
            this.PieChart.push(
              ["คำร้องเพิ่มเติมที่ส่งเข้ามาทั้งหมด", this.requests]
            );
            // console.log(this.PieChart)

        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    },
    
  },
  mounted() {
    this.getpetition();
    this.getUserforms();
    this.getpetitioncheck();
    this.getreport();
    this.getrequest();
    
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
  color: #f0f0f0;
}
.banneruserf_name {
  font-size: 25px;
  margin: -50px 100px -50px 50px;
  padding: 15%;
  color: #f0f0f0;
  font-size: 21px;
}
</style>
