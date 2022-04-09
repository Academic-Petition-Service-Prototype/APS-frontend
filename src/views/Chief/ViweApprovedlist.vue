<template>
  <div id="ChiefApprovaldetail">
    <NavbarChief />
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

            <v-row>
              <v-col>
                <v-row
                  v-if="
                    this.approver_detail[0].approval_order[0].approver_state ==
                      'ยังไม่ได้อนุมัติ'
                  "
                >
                  <v-col align="center">
                    <v-btn class="ma-2" color="success" @click="approve">
                      อนุมัติ
                    </v-btn>
                  </v-col>

                  <v-col align="center">
                    <v-btn
                      class="ma-2"
                      outlined
                      color="error"
                      @click="disapproveddialog = true"
                    >
                      ไม่อนุมัติ
                    </v-btn>
                  </v-col>
                </v-row>
                <v-row>
                  <v-row
                    v-if="
                      this.approver_detail[0].approval_order[0]
                        .approver_state == 'อนุมัติแล้ว'
                    "
                  >
                    <v-col align="center">
                      <v-btn
                        class="ma-2"
                        color="success"
                        width="500"
                        height="80"
                      >
                        <span class="h3">อนุมัติ</span>
                      </v-btn>
                    </v-col>
                  </v-row>

                  <v-row
                    v-if="
                      this.approver_detail[0].approval_order[0]
                        .approver_state == 'ไม่อนุมัติ'
                    "
                  >
                    <v-col align="center">
                      <v-btn class="ma-2" color="error" width="500" height="80">
                        ไม่อนุมัติ
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <!-- ส่วนเเสดงหน้าการเเสดงตัวอย่าง -->
        <!-- ส่วนจัดเเสดงเวลากดไม่อนุมัติ -->
        <v-dialog v-model="disapproveddialog" persistent width="800">
          <v-card align="center">
            <h1>รายละเอียด</h1>
            <h3>กรุณาใส่เหตุผลที่ไม่อนุมัติ</h3>

            {{ getdisapproveddetail }}
            <v-textarea
              v-model="getdisapproveddetail"
              auto-grow
              outlined
              rows="1"
              row-height="15"
              class="cardmargin"
            ></v-textarea>

            <v-btn color="green darken-1" text @click="disapproved">
              ตกลง
            </v-btn>
            <v-btn
              color="red darken-1"
              text
              @click="(disapproveddialog = false), (getdisapproveddetail = '')"
            >
              ยกเลิก
            </v-btn>
          </v-card>
        </v-dialog>
        <!-- ส่วนจัดเเสดงเวลากดไม่อนุมัติ -->
      </v-card>
    </v-card>

    <!-- เเจ้งเตือน  -->
    <v-snackbar v-model="notnull" color="red accent-2">
      <h3>กรุณาใส่ข้อความ โปรดอย่าเว้นว่าง</h3>

      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="notnull = false"> ปิด </v-btn>
      </template>
    </v-snackbar>
    <!-- เเจ้งเตือน  -->
    <!-- ส่วนจัดเเสดง -->
  </div>
</template>
<script>
import NavbarChief from "../../components/NavbarChief.vue";
import axios from "axios";
export default {
  name: "ChiefApprovaldetail",
  components: {
    NavbarChief,
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
      getdisapproveddetail: "",
      approver_detail: [],
      notnull: false,
    };
  },
  methods: {
    back() {
      this.$router.push("/Approvedlist");
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
            this.submition_detail[i].approval_order = temp;

            this.approver_detail = JSON.parse(
              JSON.stringify(this.submition_detail)
            );
            // console.log(typeof )
            for (
              let j = 0;
              j < this.approver_detail[i].approval_order.length;
              j++
            ) {
              if (
                this.$store.getters.getUser.user_id !==
                  this.approver_detail[i].approval_order[0].approver_name
                    .user_id &&
                this.approver_detail[i].approval_order[0].approver_state ==
                  "อนุมัติแล้ว"
              ) {
                this.approver_detail[i].approval_order.splice(i, 1);
              }
            }
          }
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    },
    approve() {
      if (confirm("ยืนยันการอนุมัติ")) {
        this.statuscheck = false;

        for (let i = 0; i < this.submition_detail.length; i++) {
          for (
            let j = 0;
            j < this.submition_detail[i].approval_order.length;
            j++
          ) {
            if (
              this.submition_detail[i].approval_order[j].approver_name
                .user_id == this.$store.getters.getUser.user_id
            ) {
              this.submition_detail[i].approval_order[j].approver_state =
                "อนุมัติแล้ว";
              this.submition_detail[i].submit_state++;

              if (
                this.submition_detail[i].submit_state >=
                this.submition_detail[i].approval_order.length
              ) {
                this.getdisapproveddetail = "ยื่นคำร้องสำเร็จ";
              } else {
                this.getdisapproveddetail = null;
              }

              axios
                .post(process.env.VUE_APP_URL + "approvepetition", {
                  submit_id: this.submition_detail[i].submit_id,
                  approval_order: this.submition_detail[i].approval_order,
                  submit_state: this.submition_detail[i].submit_state,
                  submit_refuse: this.getdisapproveddetail,
                })
                .then((response) => {
                  //handle success
                  if (response.data == "Approve petition successful") {
                    alert("อนุมัติคำร้องสำเร็จ");
                    this.$router.push("/ChiefCheckapprovedlist");
                  } else {
                    alert("อนุมัติคำร้องไม่สำเร็จ!");
                  }
                })
                .catch((error) => {
                  // handle error
                  console.log(error);
                });
            }
          }
        }
      }
    },
    disapproved() {
      if (this.getdisapproveddetail != "") {
        this.statuscheck = false;
        this.disapproveddialog = false;

        for (let i = 0; i < this.submition_detail.length; i++) {
          for (
            let j = 0;
            j < this.submition_detail[i].approval_order.length;
            j++
          ) {
            if (
              this.submition_detail[i].approval_order[j].approver_name
                .user_id == this.$store.getters.getUser.user_id
            ) {
              this.submition_detail[i].approval_order[j].approver_state =
                "ไม่อนุมัติ";

              axios
                .post(process.env.VUE_APP_URL + "approvepetition", {
                  submit_id: this.submition_detail[i].submit_id,
                  approval_order: this.submition_detail[i].approval_order,
                  submit_state: this.submition_detail[i].submit_state,
                  submit_refuse: this.getdisapproveddetail,
                })
                .then((response) => {
                  //handle success
                  if (response.data == "Approve petition successful") {
                    alert("ปฏิเสธคำร้องสำเร็จ");
                    this.$router.push("/ChiefCheckapprovedlist");
                  } else {
                    alert("ปฏิเสธคำร้องไม่สำเร็จ!");
                  }
                })
                .catch((error) => {
                  // handle error
                  console.log(error);
                });
            }
          }
        }
      } else {
        this.notnull = true;
      }
    },
    cancle() {
      this.disapproveddialog = false;
      this.getdisapproveddetail = "";
    },
  },
  mounted() {
    this.getapprovaldetaillbyid();
  },
};
</script>

<style scoped>
.cardmargin {
  margin: 2%;
}
</style>
