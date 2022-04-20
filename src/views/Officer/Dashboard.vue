<template>
  <!-- ส่วนจัดเเสดง -->
  <div id="OfficeDashboard">
    <NavbarOF />
    <v-card class="cardshow">
      <v-toolbar dark prominent color="#6c757d">
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
          <!-- คำร้องที่สร้างไปทั้งหมด -->

          <b-card
            :img-src="require('../../assets/Docicon.png')"
            img-width="130"
            img-height="130"
            img-left="true"
            class="mb-3 box-margin"
          >
            <b-card-text> คำร้องที่สร้างทั้งหมด </b-card-text>
            <h5>{{ petitionList.length }}</h5>
          </b-card>

          <!-- คำร้องที่สร้างไปทั้งหมด -->
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
            <b-card-text> คนที่ใช้คำร้องของที่ท่านสร้าง </b-card-text>
            <h5>{{ petitionListById.length }}</h5>
          </b-card>

          <!-- รายงานเอกสารที่ทำไป -->
        </v-col>
      </v-row>

    </v-card>
  </div>
</template>

<script>
import NavbarOF from "../../components/NavbarOfficer.vue";
import axios from "axios";
export default {
  name: "OfficeDashboard",
  components: {
    NavbarOF,
    
  },
  data() {
    return {
      
      countpetitionList:0,
      countpetitionListById:0,
      petitionList: [],
      petitionListById:[],
      d: new Date().getHours(),
      profile: [
        {
          f_name: this.$store.getters.getUser.f_name,
          l_name: this.$store.getters.getUser.l_name,
        },
      ],
      PieChart: [
        ["Task", "Hours per Day"],
        ["คำร้องที่สร้างทั้งหมด", this.i],
        ["คนที่ใช้คำร้องของที่ท่านสร้าง",this.countpetitionListById],
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
  methods:{
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
            this.countpetitionList = this.petitionList.length
            
          }
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
            this.countpetitionListById = this.petitionListById.length
          }
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
