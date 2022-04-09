<template>
  <div id="SecretaryApprovaldetail">
    <NavbarSecretary />
    <v-card class="cardshow">
      <v-row>
        <v-col>
          <v-btn class="ma-2" outlined color="secondary" @click="back">
            ย้อนกลับ
          </v-btn>
        </v-col>
        <v-col align="center">
          <h2>{{ submition_detail[0].form_name }}</h2>
        </v-col>
        <v-col> </v-col>
      </v-row>

      <v-divider></v-divider>

      <v-card class="mb-12" color="#ECEFF1">
        <!-- ส่วนเเสดงหน้าการเเสดงตัวอย่าง -->

        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="submition_detail[0].f_name"
                  label="ชื่อ"
                  required
                  disabled
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="submition_detail[0].l_name"
                  label="นามสกุล"
                  required
                  disabled
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="submition_detail[0].gender"
                  label="เพศ"
                  required
                  disabled
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  v-model="submition_detail[0].email"
                  label="E-mail"
                  required
                  disabled
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  v-model="submition_detail[0].tel_num"
                  label="เบอร์โทร"
                  required
                  disabled
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  v-model="submition_detail[0].address"
                  label="ที่อยู่"
                  required
                  disabled
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <div
                  v-for="(titlespecifics, index) in titlespecifics"
                  :key="index"
                >
                  <h3>{{ titlespecifics.title }}</h3>

                  <v-col align="center">
                    <b-card class="text-center">
                      <div>
                        {{ specificsdata[index] }}
                      </div>
                    </b-card>
                  </v-col>
                </div>
              </v-col>
            </v-row>

            <v-row class="text-center">
              <h2>รายชื่อผู้อนุมัติ</h2>
              <v-col>
                <div
                  v-for="(approver_display, index) in approver_display"
                  :key="index"
                >
                  <h4>
                    {{ approver_display.approver_name.f_name }}
                    {{ approver_display.approver_name.l_name }}
                  </h4>

                  <v-col align="center">
                    <b-card class="text-center">
                      <div>
                        <!-- {{ approver_display.approver_state }} -->
                        <v-btn
                          v-if="
                            approver_display.approver_state ==
                              'ยังไม่ได้อนุมัติ'
                          "
                          color="warning"
                          block
                        >
                          ยังไม่ได้อนุมัติ
                        </v-btn>

                        <v-btn
                          v-if="
                            approver_display.approver_state == 'อนุมัติแล้ว'
                          "
                          color="green"
                          block
                        >
                          อนุมัติแล้ว
                        </v-btn>

                        <v-btn
                          v-if="approver_display.approver_state == 'ไม่อนุมัติ'"
                          color="error"
                          block
                        >
                          ไม่อนุมัติ
                        </v-btn>
                      </div>
                    </b-card>
                  </v-col>
                </div>
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
import NavbarSecretary from "../../components/NavbarSecretary.vue";
import axios from "axios";
export default {
  name: "SecretaryApprovaldetail",
  components: {
    NavbarSecretary,
  },
  data() {
    return {
      submition_detail: [],
      disapproveddialog: false,
      listapprover: [],
      statuscheck: true,
      specifics: [],
      specificsdata: [],
      titlespecifics: [],
      disapproveddetail: [],
      getdisapproveddetail: "",
      approver_detail: [],
      approver_display: [],
    };
  },
  methods: {
    back() {
      this.$router.push("/SecretaryViewApproval");
    },
    getapprovaldetaillbyid() {
      axios
        .get(
          process.env.VUE_APP_URL + "getsubmitforms/" + this.$route.params.id
        )
        .then((response) => {
          // handle success
          this.submition_detail = response.data;

          //form_value
          this.submition_detail = response.data;
          for (let i = 0; i < this.submition_detail.length; i++) {
            this.tmp = JSON.stringify(this.submition_detail[i].form_value);
            this.tmp = this.tmp.replace(/\\/g, "");
            this.specifics = this.tmp.replace(/\\/g, "");

            temp = this.specifics.slice(1, -1);
            temp = JSON.parse(temp);
            this.specificsdata = temp;
          }

          //form_specific
          this.submition_detail = response.data;
          for (let i = 0; i < this.submition_detail.length; i++) {
            this.tmp = JSON.stringify(this.submition_detail[i].form_specific);
            this.tmp = this.tmp.replace(/\\/g, "");
            this.specifics = this.tmp.replace(/\\/g, "");

            temp = this.specifics.slice(1, -1);
            temp = JSON.parse(temp);
            this.titlespecifics = temp;
          }

          // approval_order
          this.submition_detail = response.data;
          for (let i = 0; i < this.submition_detail.length; i++) {
            this.tmp = JSON.stringify(this.submition_detail[i].approval_order);
            this.tmp = this.tmp.replace(/\\/g, "");
            this.specifics = this.tmp.replace(/\\/g, "");

            var temp = this.specifics.slice(1, -1);
            temp = JSON.parse(temp);
            this.approver_display = temp;
          }
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    },
  },
  mounted() {
    this.getapprovaldetaillbyid();
  },
};
</script>

<style scoped>
.bg-color {
  background: #f0f0f0;
  height: 100%;
}

.cardshow {
  margin: 2%;
}
h1 {
  font-size: 50px;
  padding: 2% 0% 0% 0%;
}
p {
  font-size: 20px;
}
</style>
