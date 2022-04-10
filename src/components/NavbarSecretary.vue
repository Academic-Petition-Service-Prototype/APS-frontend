<template>
  <div id="NavbarSecretary">
    <!-- Navbar -->
    <v-app-bar color="#8BC34A">
      <v-app-bar-nav-icon @click="drawer = !drawer">
        <v-icon color="#FFFFFF">
          mdi-menu
        </v-icon>
      </v-app-bar-nav-icon>
      <div class="text-white title ml-4">{{ $route.name }}</div>
      <v-spacer></v-spacer>
      <div class="text-white subtitle-1 mr-4">
        เข้าสู่ระบบครั้งสุดท้ายเมื่อ {{ lastlogin }}
      </div>
      <v-btn elevation="2" color="error" @click="logout()">
        ออกจากระบบ
      </v-btn>
    </v-app-bar>
    <!-- Navbar -->

    <!-- Sidebar -->
    <v-navigation-drawer v-model="drawer" app color="#424242" width="300">
      <!-- ส่วนตัวเลือกเมนู -->
      <v-row>
        <v-col align="center">
          <v-img
            class="rounded-circle mt-15"
            width="150"
            height="150"
            src="../assets/5074620687.jpg"
          >
          </v-img>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="text-white" align="center">
          ชื่อ : {{ firstname }} {{ lastname }}<br />
          สถานะ : <v-if role="secretary">เลขานุการ</v-if>
        </v-col>
      </v-row>
      <v-divider></v-divider>

      <v-list-item
        v-for="menu in menu"
        :key="menu.numforms"
        router
        :to="menu.route"
      >
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="#FFFFFF">mdi-{{ menu.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="text-white">{{
            menu.text
          }}</v-list-item-title>
        </v-list-item>
      </v-list-item>
      <!-- ส่วนตัวเลือกเมนู -->
    </v-navigation-drawer>
    <!-- Sidebar -->
  </div>
</template>

<script>
import AuthService from "@/services/AuthService.js";
export default {
  name: "NavbarSecretary",
  data: () => ({
    drawer: null,

    firstname: "",
    lastname: "",
    role: "",
    lastlogin: "",
    menu: [
      {
        menu: "1",
        text: "หน้าแรก",
        route: "/SecretaryDashboard",
        icon: "home",
      },
      {
        menu: "2",
        text: "ติดตามสถานะคำร้อง",
        route: "/SecretaryTracking",
        icon: "marker-check",
      },
      {
        menu: "3",
        text: "การอนุมัติคำร้อง",
        route: "/SecretaryViewApproval",
        icon: "file-document",
      },
      {
        menu: "4",
        text: "การรายงานปัญหา",
        route: "/SecretaryViewReport",
        icon: "alert-octagon",
      },
      {
        menu: "5",
        text: "การร้องขอคำร้อง",
        route: "/Secretaryrequestlist",
        icon: "alert-octagon",
      },
      {
        menu: "6",
        text: "โปรไฟล์",
        route: "/SecretaryProfile",
        icon: "account",
      },
    ],
  }),
  async created() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push("/login");
    }
    this.firstname = this.$store.getters.getUser.f_name;
    this.lastname = this.$store.getters.getUser.l_name;
    this.role = this.$store.getters.getUser.role;
    this.lastlogin = this.$store.getters.getUser.last_login;
    this.secretMessage = await AuthService.getSecretContent();
    this.lastlogin = new Date(this.lastlogin);
    this.lastlogin = this.lastlogin.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  },
  methods: {
    logout() {
      this.$swal({
        title: "ท่านกำลังจะออกจากระบบ?",
        text: "ท่านเเน่ใจว่าต้องการออกจากระบบ!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "ตกลง",
        cancelButtonText: "ยกเลิก",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$swal({
            icon: "success",
            title: "ขอบคุณ",
            text: "ท่านออกจากระบบสำเร็จ",
            timer: 1500,
          });
          localStorage.clear();
          this.$store.dispatch("logout");
          this.$router.push("/login");
        }
      });
    },
  },
};
</script>

<style scope></style>
