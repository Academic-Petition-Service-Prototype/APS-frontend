<template>
  <div id="ChiefApprovaldetail">
    <NavbarChief />
    {{ submition_detail }}
    <v-card class="cardshow">
      <v-row>
        <v-col>
          <v-btn class="ma-2" outlined color="error" @click="back">
            ย้อนกลับ
          </v-btn>
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
                {{ statuscheck }}
                <v-row v-if="statuscheck == null">
                  <v-col align="center">
                    <v-btn
                      class="ma-2"
                      color="success"
                      @click="statuscheck = true"
                    >
                      อนุมัติ
                    </v-btn>
                  </v-col>

                  <v-col align="center">
                    <v-btn
                      class="ma-2"
                      outlined
                      color="error"
                      @click="statuscheck = false"
                    >
                      ไม่อนุมัติ
                    </v-btn>
                  </v-col>
                </v-row>

                <v-row v-if="statuscheck == true">
                  <v-col align="center">
                    <v-btn class="ma-2" color="success" width="500" height="80">
                      อนุมัติ
                    </v-btn>
                  </v-col>
                </v-row>

                <v-row v-if="statuscheck == false">
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
      statuscheck: null,
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
          console.log(this.submition_detail);
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
.cardmargin {
  margin: 2%;
}
</style>
