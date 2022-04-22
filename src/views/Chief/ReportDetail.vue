<template>
  <div id="ChiefReportDetail">
    <NavbarChief />
    <v-card class="cardmargin">
      <v-toolbar dark prominent color="primary">
        <h1>รายละเอียดการรายงานปัญหา</h1>
      </v-toolbar>
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="12">
              <!-- <v-card outlined class="p-4 ">
                <h3>หัวข้อการร้องขอคำร้อง</h3>
                <v-divider></v-divider>
                <p class="h5">{{ report_title }}</p>
              </v-card>
              <v-card outlined class="p-4 mt-2">
                <h3>รายละเอียดการร้องขอคำร้อง</h3>
                <v-divider></v-divider>
                <p class="h5">{{ report_detail }}</p>
              </v-card> -->
              <v-card outlined class="p-4 ">
                <h3 class="text-center">{{ report_title }}</h3>
                <v-divider></v-divider>
                <p class="h5">{{ report_detail }}</p>
                <p class="h6 text-right">
                  วันและเวลาที่เกิดเหตุ
                </p>
                <p class="h6 text-right">
                  {{ report_occur }}
                </p>
              </v-card>
            </v-col>
            <v-col cols="12" class="text-center">
              <v-btn dark x-large color="#3F3F3F" @click="back">
                ย้อนกลับ
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </div>
</template>
<script>
import NavbarChief from "../../components/NavbarChief.vue";
import axios from "axios";
export default {
  name: "ChiefReportDetail",
  components: {
    NavbarChief,
  },
  data() {
    return {
      report_title: "",
      report_detail: "",
      report_occur: "",
    };
  },
  methods: {
    back() {
      this.$router.push("/ChiefReport");
    },
    getreportbyid() {
      axios
        .get(process.env.VUE_APP_URL + "reports/" + this.$route.params.id)
        .then((response) => {
          // handle success
          this.report_title = response.data.report_title;
          this.report_detail = response.data.report_detail;
          this.report_occur = response.data.report_occur;
          this.report_occur = new Date(this.report_occur);
          this.report_occur = this.report_occur.toLocaleDateString("th-TH", {
            hour: "numeric",
            minute: "numeric",
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "long",
          });
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    },
  },
  mounted() {
    this.getreportbyid();
  },
};
</script>

<style scoped>
.cardmargin {
  margin: 2%;
}
</style>
