<template>
  <div id="UserReport" class="bg-color">
    <NavbarUser />
    <v-card class="cardmargin">
      <v-toolbar dark prominent color="#FFAB40">
        <h1 class="text-center pa-5">รายงานปัญหาไม่ระบุตัวตน</h1>
        <v-spacer></v-spacer>
      </v-toolbar>
      {{ valuedate }}
      {{ time }}
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
            <v-col>
              <div>
                <label for="example-datepicker">กรุณาเลือกวันเกิดเหตุ</label>
                <b-form-datepicker
                  id="example-datepicker"
                  v-model="valuedate"
                  class="mb-2"
                ></b-form-datepicker>
                
              </div>
            </v-col>
            <v-col>
              <v-menu
                ref="menu"
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="time"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="time"
                    label="กรุณาเลือกเวลาเกิดเหตุ"
                    prepend-icon="mdi-clock-time-four-outline"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="menu2"
                  v-model="time"
                  full-width
                  @click:minute="$refs.menu.save(time)"
                ></v-time-picker>
              </v-menu>
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
      time: null,
      valuedate:'',
      menu2: false,
      menu1: false,
      dateFormatted: null,
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
            this.$swal({
              icon: "warning",
              title: "เกิดข้อผิดพลาดในการส่งรายงาน",
              text: "กรุณากรอกข้อมูลให้ครบ",
              timer: 2000,
            });
          } else if (response.data == "Sent report successful") {
            this.$swal({
              icon: "success",
              title: "รายงานปัญหาสำเร็จ",
              text: "ส่งรายงาน " + this.report_title + " สำเร็จ ",
              timer: 1500,
            });

            this.report_title = "";
            this.report_detail = "";
          } else {
            this.$swal({
              icon: "error",
              title: "เกิดข้อผิดพลาดในการส่งรายงาน",
              text: "การส่งรายงานเกิดความผิดพลาด",
              timer: 2000,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
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
