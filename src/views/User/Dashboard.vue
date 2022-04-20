<template>
  <!-- ส่วนจัดเเสดง -->
  <div id="UserDashboard">
    <NavbarUser />
    <v-card class="cardshow">
      <!-- ตอนเช้า -->
      <v-card height="300px" 
      v-if="
          d == '5' 
          || d == '6'
          || d == '7'
          || d == '8'
          || d == '9'
          || d == '10'
          || d == '11'

          ">
        <v-img
          height="300px"
          src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
        >
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
      <v-card height="300px" 
      v-if="
          d == '12' 
          ">
        <v-img
          height="300px"
          src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
        >
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
      <v-card height="300px" 
      v-if="
          d == '13' 
          || d == '14'
          || d == '15'
          ">
        <v-img
          height="300px"
          src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
        >
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
      <v-card height="300px" 
      v-if="
          d == '16' 
          || d == '17'
          || d == '18'
          ">
        <v-img
          height="300px"
          src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
        >
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
      <v-card height="300px" 
      v-if="
          d == '19' 
          || d == '20'
          || d == '21'
          || d == '22'
          || d == '23'
          || d == '0'
          || d == '1'
          || d == '2'
          || d == '3'
          || d == '4'

          ">
        <v-img
          height="300px"
          src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
        >
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
    </v-card>

    <v-card class="cardshow">
      <v-row>
        <v-col>
          <v-toolbar dark prominent color="#FFAB40">
            <h1 class="text-center pa-5">คู่มือ / การใช้งาน</h1>
            <v-spacer></v-spacer>
          </v-toolbar>

          <v-slide-group class="pa-4" show-arrows>
            <v-slide-item v-for="item in Guide" :key="item">
              <v-btn
                class="ma-4"
                height="400"
                width="300"
                :to="item.path"
                :color="item.color"
              >
                <v-row>
                  <v-col>
                    <h3>{{ item.text }}</h3>
                    <h3>{{ item.text2 }}</h3>
                  </v-col>
                </v-row>
              </v-btn>
            </v-slide-item>
          </v-slide-group>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import NavbarUser from "../../components/NavbarUser.vue";
export default {
  name: "UserDashboard",
  components: {
    NavbarUser,
  },
  data() {
    return {
      d: new Date().getHours(),
      
      profile: [
        {
          f_name: this.$store.getters.getUser.f_name,
          l_name: this.$store.getters.getUser.l_name,
        },
      ],
      Guide: [
        {
          id: 1,
          text: "การส่งคำร้อง",
          path: "/guidepentions",
          color: "#FFAB40",
        },
        {
          id: 2,
          text: "การรายงานปัญหา",
          text2: "แบบไม่ระบุตัวตน",
          path: "/guidereport",
          color: "#485460",
        },
        {
          id: 3,
          text: "การร้องคำร้องเพิ่มเติม",
          path: "/guiderequest",
          color: "primary",
        },
      ],
<<<<<<< HEAD
      
      
      
=======
>>>>>>> hotfix
    };
  },
  methods:{

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
h3 {
  color: #f0f0f0;
  padding: 2% 0% 0% 0%;
}
.banneruser {
  font-size: 80px;
  padding: 10%;
  margin: 25px -100px -50px 50px;
}
.banneruserf_name {
  font-size: 25px;
  margin: -20px 100px -50px 50px;
  padding: 15%;
}
.text-warp {
  word-break: break-all;
}
</style>
