<template>
  <div id="ChiefApprovaldetail">
    <NavbarChief />

    <v-card class="cardshow">
      <v-row>
        <v-col>
          <v-btn class="ma-2" outlined color="error" @click="back">
            ย้อนกลับ
          </v-btn>
        </v-col>
        <v-col align="center">
          <!-- <v-btn class="ma-2" outlined color="error"> ย้อนกลับ </v-btn> -->
          <h2>{{ submition_detail[0].form_name }}</h2>
        </v-col>
        <v-col> </v-col>
      </v-row>

      <v-divider></v-divider>

      <v-card class="mb-12" color="#ECEFF1">
        <!-- ส่วนเเสดงหน้าการเเสดงตัวอย่าง -->
        <h1>
          {{ forms.title }}
        </h1>
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
                      <div >
                      {{ specificsdata[index] }}
                      </div>
                    </b-card>
                  </v-col>
                </div>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-row v-if="statuscheck == true">
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
                      @click="disapproved"
                    >
                      ไม่อนุมัติ
                    </v-btn>
                  </v-col>
                </v-row>
                <v-row v-if="statuscheck == false">
                  <v-row
                    v-if="
                      this.submition_detail[0].approval_order[0]
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
                        อนุมัติ
                      </v-btn>
                    </v-col>
                  </v-row>

                  <v-row
                    v-if="
                      this.submition_detail[0].approval_order[0]
                        .approver_state == 'ไม่อนุมัติ'
                    "
                  >
                    <v-col align="center">
                      <v-btn
                        class="ma-2"
                        outlined
                        color="error"
                        width="500"
                        height="80"
                      >
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
      </v-card>
    </v-card>
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
      statuscheck: true,
      specifics: [],
      specificsdata: [],
      titlespecifics: [],
    };
  },
  methods: {
    back() {
      this.$router.push("/ChiefApproval");
    },
    getapprovaldetaillbyid() {
      axios
        .get(
          process.env.VUE_APP_URL + "getsubmitforms/" + this.$route.params.id
        )
        .then((response) => {
          // handle success
          this.submition_detail = response.data;
          // approval_order
          this.submition_detail = response.data;
          for (let i = 0; i < this.submition_detail.length; i++) {
            this.tmp = JSON.stringify(this.submition_detail[i].approval_order);
            this.tmp = this.tmp.replace(/\\/g, "");
            this.specifics = this.tmp.replace(/\\/g, "");

            var temp = this.specifics.slice(1, -1);
            temp = JSON.parse(temp);
            this.submition_detail[i].approval_order = temp;
          }

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
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    },
    approve() {
      this.submition_detail[0].approval_order[0].approver_state = "อนุมัติแล้ว";
      this.statuscheck = false;
    },
    disapproved() {
      this.submition_detail[0].approval_order[0].approver_state = "ไม่อนุมัติ";
      this.statuscheck = false;
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
