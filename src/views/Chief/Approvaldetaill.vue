<template>
  <div id="ReportDetail">
    <NavbarChief />
    <!-- <v-card class="cardmargin">
      <h1 class="text-center p-2">
        รายละเอียดการรายงานปัญหา
      </h1>
      <v-divider></v-divider>
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-card outlined class="p-4">
                <h3>หัวข้อปัญหา</h3>
                <p class="subtitle-1">{{ report_title }}</p>
              </v-card>
              <v-card outlined class="p-4 mt-2">
                <h3>รายละเอียดปัญหา</h3>
                <p class="subtitle-1">{{ report_detail }}</p>
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
    </v-card> -->

    <v-card class="cardshow">
      <v-row>
        <v-col>
          <v-btn class="ma-2" outlined color="error" @click="back" > ย้อนกลับ </v-btn>
        </v-col>
        <v-col align="center">
          <!-- <v-btn class="ma-2" outlined color="error"> ย้อนกลับ </v-btn> -->
          <h2>แบบคำร้อง / ยื่นเรื่อง</h2>
        </v-col>
        <v-col></v-col>
      </v-row>

      <v-divider></v-divider>

      <v-card class="mb-12" color="#ECEFF1">
        <!-- ส่วนเเสดงหน้าการเเสดงตัวอย่าง -->
        <h1>
          {{ forms.title }}
        </h1>
        <v-form v-model="valid" v-for="profile in profile" :key="profile">
          <v-container>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="profile.Fname"
                  :rules="nameRules"
                  :counter="10"
                  label="ชื่อ"
                  required
                  disabled
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="profile.Lname"
                  :rules="nameRules"
                  :counter="10"
                  label="นามสกุล"
                  required
                  disabled
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="profile.gender"
                  :rules="emailRules"
                  label="เพศ"
                  required
                  disabled
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  v-model="profile.email"
                  :rules="emailRules"
                  label="E-mail"
                  required
                  disabled
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  v-model="profile.tell"
                  :rules="emailRules"
                  label="เบอร์โทร"
                  required
                  disabled
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  v-model="profile.addess"
                  :rules="emailRules"
                  label="ที่อยู่"
                  required
                  disabled
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row v-if="forms.specifics == true">
              <div>
                <v-row v-for="title in title" :key="title.id">
                  <v-col class="cardshow" align="center">
                    <h3>{{ title.title }}</h3>
                    <v-text-field
                      label="กรุณาใส่ข่อมูล"
                      required
                      class="cardshow"
                    ></v-text-field>
                  </v-col>
                </v-row>

                {{ title }}
              </div>
            </v-row>
            <v-row>
              <v-col>
                {{statuscheck}}
                <v-row v-if="statuscheck==null">
              <v-col align="center">
                <v-btn class="ma-2" color="success" @click="statuscheck=true"> อนุมัติ </v-btn>
              </v-col>

              <v-col align="center">
                <v-btn class="ma-2" outlined color="error" @click="statuscheck=false"> ไม่อนุมัติ </v-btn>
              </v-col>
            </v-row>

            <v-row v-if="statuscheck==true">
              <v-col align="center">
                <v-btn class="ma-2" color="success" width="500" height="80"> อนุมัติ </v-btn>
              </v-col>

              
            </v-row>

            <v-row v-if="statuscheck==false">
              <v-col align="center">
                <v-btn class="ma-2" outlined color="error" width="500" height="80"> ไม่อนุมัติ </v-btn>
              </v-col>

              
            </v-row>


              </v-col>
            </v-row>
            
          </v-container>
        </v-form>
        <!-- ส่วนเเสดงหน้าการเเสดงตัวอย่าง -->
      </v-card>
    </v-card>
    <!-- ส่วนจัดเเสดง -->
  </div>
</template>
<script>
import NavbarChief from "../../components/NavbarChief.vue";
import axios from "axios";
export default {
  name: "Approvaldetaill",
  components: {
    NavbarChief,
  },
  data() {
    return {
      report_title: "",
      report_detail: "",

      profile: [
        {
          Fname: "ณัฐภูมิ",
          Lname: "ผาจิต",
          gender: "ชาย",
          email: "62015011@kmit.ac.th",
          tell: "0856937521",
          addess:
            "เลขที่ 1 ซอยฉลองกรุง 1แขวงลาดกระบัง เขตลาดกระบังกรุงเทพฯ 10520",
        },
      ],
      forms: [
        {
          title: "",
          specifics: true,
          approver: true,
        },
      ],
      newtitleText: "",
      newapproverText: "",
      title: [],
      listapprover: [],
      nextTodoId: 1,
      nextapproverId: 1,
      statuscheck:null,
    };
  },
  mounted() {
    this.getreportbyid();
  },
  methods: {
    back() {
      this.$router.push("/ChiefApproval");
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
};
</script>

<style scoped>
.cardmargin {
  margin: 2%;
}
</style>
