<template>
  <div id="UserReport" class="bg-color">
    <NavbarUser />
    <v-card class="cardmargin">
      <v-toolbar dark prominent color="#FFAB40">
        <h1 class="text-center pa-5">รายงานปัญหาไม่ระบุตัวตน</h1>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-form>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="หัวข้อปัญหา"
                placeholder="ระบุหัวข้อปัญหา"
                v-model="report_title"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                solo
                name="input-7-4"
                label="ระบุรายละเอียดปัญหา"
                v-model="report_detail"
              ></v-textarea>
            </v-col>
            <v-col cols="12" class="text-center">
              <v-btn dark x-large color="#2E7D32" @click="sentreport">
                ส่งรายงาน
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
    <!-- ป้ายเเจ้งเตือน -->
    <v-snackbar v-model="snackbar" :timeout="timeout" :color="colorsnackbar">
      {{ textsnackbar }}
    </v-snackbar>
    <!-- ป้ายเเจ้งเตือน -->
  </div>
</template>

<script>
import NavbarUser from "../../components/NavbarUser.vue";
import axios from "axios";
export default {
  name: "UserReport",
  components: {
    NavbarUser,
  },
  data() {
    return {
      report_title: "",
      report_detail: "",
      colorsnackbar: "",
      textsnackbar: "",
      snackbar: false,
      timeout: 2000,
    };
  },
  methods: {
    sentreport() {
      axios
        .post(process.env.VUE_APP_URL + "reports", {
          users_id: this.$store.getters.getUser.user_id,
          report_title: this.report_title,
          report_detail: this.report_detail,
        })
        .then((response) => {
          if (response.data == "Please fill your information") {
            this.textsnackbar = "กรุณากรอกข้อมูลให้ครบ";
            this.colorsnackbar = "#DB4437";
            this.snackbar = true;
          } else if (response.data == "Sent report successful") {
            this.textsnackbar = "รายงานปัญหาสำเร็จ";
            this.colorsnackbar = "#2E7D32";
            this.snackbar = true;
            this.report_title = "";
            this.report_detail = "";
          } else {
            alert("เกิดข้อผิดพลาดในการส่งรายงาน");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
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
h1 {
  font-size: 50px;
  padding: 2% 0% 0% 0%;
}
</style>
