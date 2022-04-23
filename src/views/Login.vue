<template>
  <v-main class="bg-login">
    <Navbar />
    <v-row class="frame-login">
      <v-col align="center">
        <v-row>
          <v-col class="bg-color-logo">
            <v-img height="300px" width="500px" src="../assets/RKR.png"></v-img>
            <div class="text-login text-white">Academic Petition Service</div>
          </v-col>

          <v-col class="bg-color-logo-formslogin">
            <h1 class="margin-login">เข้าสู่ระบบ</h1>
            <v-form v-model="isValid" @submit.prevent="login()">
              <!-- ช่อง Email -->
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="email"
                    label="อีเมล"
                    placeholder="อีเมล"
                    type="email"
                    class="textfield-margin"
                    :rules="email_rules"
                    required
                  >
                    <template v-slot:prepend>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <v-icon v-on="on"> mdi-account </v-icon>
                        </template>
                        ใส่อีเมลล์
                      </v-tooltip>
                    </template>
                  </v-text-field>
                </v-col>
              </v-row>
              <!-- ช่อง Email -->

              <!-- ช่อง password -->
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="password"
                    :rules="password_rules"
                    label="รหัสผ่าน"
                    placeholder="รหัสผ่าน"
                    type="password"
                    class="textfield-margin"
                    required
                  >
                    <template v-slot:prepend>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <v-icon v-on="on"> mdi-lock </v-icon>
                        </template>
                        ใส่รหัสผ่าน
                      </v-tooltip>
                    </template>
                  </v-text-field>
                </v-col>
              </v-row>
              <!-- ช่อง password -->
              <v-row>
                <v-col align="center">
                  <v-btn
                    color="primary"
                    type="submit"
                    :disabled="!isValid"
                    width="300"
                  >
                    เข้าสู่ระบบ
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import AuthService from "@/services/AuthService.js";
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      msg: "",
      forgotEmail: "",
      snackbar: false,
      dialogforgot: false,
      timeout: 2000,
      isValid: true,
      // rules
      email_rules: [
        (value) => !!value || "จำเป็น",
        (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "รูปแบบอีเมลผิด";
        },
      ],
      password_rules: [(value) => !!value || "จำเป็น"],
    };
  },
  components: {
    Navbar,
  },
  methods: {
    async login() {
      try {
        const credentials = {
          email: this.email,
          password: this.password,
        };
        const response = await AuthService.login(credentials);
        this.msg = response.message;
        this.$swal({
          icon: "success",
          title: "เข้าสู่ระบบสำเร็จ",
          timer: 2000,
        });
        const token = response.token;
        const user = response.user;
        this.$store.dispatch("login", { token, user });
        if (user.role == "user") {
          this.$router.push("/UserDashboard");
        } else if (user.role == "officer") {
          this.$router.push("/OfficerDashboard");
        } else if (user.role == "chief") {
          this.$router.push("/ChiefDashboard");
        } else if (user.role == "secretary") {
          this.$router.push("/SecretaryDashboard");
        } else if (user.role == "admin") {
          this.$router.push("/AdminDashboard");
        }
        localStorage.setItem("token", token);
        localStorage.setItem("UserData", JSON.stringify(user));
      } catch (error) {
        this.$swal({
          icon: "error",
          title: "เข้าสู่ระบบไม่สำเร็จ",
          text: "เกิดข้อผิดพลาดในการเข้าสู่ระบบ",
          timer: 2000,
        });
        this.msg = error.response.data.message;
      }
    },

    submit: function() {
      this.dialogforgot = false;
      this.snackbar = true;
    },
  },
};
</script>

<style scoped>
.email-forgot-margin {
  margin: 0px 10px 0px 10px;
}
.blocklogin {
  margin: 170px 0px 0px 0px;
}
.login-margin {
  margin: 100px 0px 0px 0px;
}
.pic-magin {
  margin: 100px 0px 0px 40px;
}
.text-login {
  font-size: 30px;
}
.bg-login {
  background-color: #f7c5a8;
  height: 100%;
}
.card-login {
  margin: 100px 0px 0px 0px;
}
.textfield-margin {
  margin: 0px 30px 0px 0px;
}
.margin-login {
  margin: 50px 0px 40px 0px;
}
.bg-color-logo {
  background-color: #ff8d41;
}
.bg-color-logo-formslogin {
  background-color: #ffffff;
}
.frame-login {
  margin: 50px 50px 0px 50px;
}
</style>
