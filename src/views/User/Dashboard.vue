<template>
  <!-- ส่วนจัดเเสดง -->
  <div id="UserDashboard">
    <NavbarUser />
    <v-card class="cardshow">
      <v-card height="300px">
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
    </v-card>

    <v-card class="cardshow">
      <v-row>
        <v-col>
          <v-toolbar dark prominent color="#FFAB40">
            <h1>คู่มือ / การใช้งาน</h1>
            {{d}}
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
      d: new Date(
        
      ),
      
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
        {
          id: 5,
          text: "เกี่ยวกับเรา",
          path: "/Userabout",
          color: "#00B8D4",
        },
      ],
      
      
      
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

