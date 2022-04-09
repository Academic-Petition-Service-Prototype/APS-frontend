<template>
  <div id="SecretaryRequestlistDetail">
    <NavbarSecretary />
    <v-card class="cardmargin">
      <v-toolbar dark prominent color="#8BC34A">
        <h1>รายละเอียดการรายงานปัญหา</h1>

        
      </v-toolbar>
      
      
      <v-form>
        <v-container class="text-center">
          <v-row>
            <v-col cols="12">
              <v-card  outlined class="p-4 ">
                
                <h1>หัวข้อปัญหา</h1>
                <h2 >{{ report_title }}</h2>
              </v-card>
              <v-card outlined class="p-4 mt-2">
                <h1>รายละเอียดปัญหา</h1>
                <h2 >{{ report_detail }}</h2>
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
import NavbarSecretary from "../../components/NavbarSecretary.vue";
import axios from "axios";
export default {
  name: "DashboardSecretary",
  components: {
    NavbarSecretary,
  },
  data() {
    return {
      report_title: "",
      report_detail: "",
    };
  },
  methods: {
    back() {
      this.$router.push("/Secretaryrequestlist");
    },
    getreportbyid() {
      axios
        .get(process.env.VUE_APP_URL + "reports/" + this.$route.params.id)
        .then((response) => {
          // handle success
          this.report_title = response.data.report_title;
          this.report_detail = response.data.report_detail;
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
