<template>
  <!-- ส่วนจัดเเสดง -->
  <div id="UserEditSentpetition">
    <NavbarUser />
    <v-card class="cardshow">
      <h1>
        แก้ไขการส่งคำร้อง
        <v-divider></v-divider>
      </h1>

      <h1 v-for="heard in heard" :key="heard" style="text-align: center">
        {{ petitionListById.form_name }}
      </h1>
      <v-form
        v-model="isValid"
        @submit.prevent="sentpetition()"
        v-for="profile in profile"
        :key="profile"
      >
        <v-container>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                class="text-black"
                v-model="profile.f_name"
                label="ชื่อ"
                readonly
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="profile.l_name"
                label="นามสกุล"
                readonly
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="profile.gender"
                label="เพศ"
                readonly
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                v-model="profile.role"
                label="สถานะผู้ใช้งาน"
                readonly
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                v-model="profile.email"
                label="E-mail"
                readonly
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                v-model="profile.tel_num"
                label="เบอร์โทร"
                readonly
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                v-model="profile.address"
                label="ที่อยู่"
                readonly
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row v-for="heard in heard" :key="heard">
            <v-col v-if="heard.hasSpecificsDetail">
              <v-row
                v-for="(form_specific, index) in petitionListById.form_specific"
                :key="form_specific.id"
              >
                <v-col>
                  {{ form_specific.title }}
                  <v-text-field
                    v-model="form_value[index]"
                    label="กรุณากรอกข้อมูล"
                    placeholder="กรุณากรอกข้อมูล"
                    :rules="data_rules"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-col align="center">
              <v-btn
                class="ma-2"
                color="success"
                type="submit"
                :disabled="!isValid"
              >
                ส่งคำร้อง
              </v-btn>
            </v-col>

            <v-col align="center">
              <v-btn class="ma-2" outlined color="error" @click="back()">
                ย้อนกลับ
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
    <!-- ส่วนจัดเเสดง -->
  </div>
</template>

<script>
import NavbarUser from "../../components/NavbarUser.vue";
import axios from "axios";
export default {
  name: "UserEditSentpetition",
  components: {
    NavbarUser,
  },
  data() {
    return {
      profile: [
        {
          f_name: this.$store.getters.getUser.f_name,
          l_name: this.$store.getters.getUser.l_name,
          gender: this.$store.getters.getUser.gender,
          email: this.$store.getters.getUser.email,
          tel_num: this.$store.getters.getUser.tel_num,
          address: this.$store.getters.getUser.address,
          role: "ผู้ยื่นคำร้อง",
        },
      ],
      heard: [
        {
          title: "",
          hasSpecificsDetail: true, //ตัวกำหนดว่าเป็นฟอรมต้องใส่รายละเอียดเพิ่ม
        },
      ],
      specifics: [],
      petitionListById: [],
      form_value: [],
      data_rules: [(value) => !!value || "จำเป็น"],
      isValid: true,
    };
  },
  methods: {
    getsubmitformsbyid() {
      axios
        .get(
          process.env.VUE_APP_URL + "getsubmitforms/" + this.$route.params.id
        )
        .then((response) => {
          // handle success

          // form_specific
          this.petitionListById = response.data[0];
          this.tmp = JSON.stringify(this.petitionListById.form_specific);
          this.tmp = this.tmp.replace(/\\/g, "");
          this.specifics = this.tmp.replace(/\\/g, "");

          var temp = this.specifics.slice(1, -1);
          temp = JSON.parse(temp);
          this.petitionListById.form_specific = temp;

          //approval_order
          this.petitionListById = response.data[0];
          this.tmp = JSON.stringify(this.petitionListById.approval_order);
          this.tmp = this.tmp.replace(/\\/g, "");
          this.specifics = this.tmp.replace(/\\/g, "");

          temp = this.specifics.slice(1, -1);
          temp = JSON.parse(temp);
          this.petitionListById.approval_name = temp;

          //form_value
          this.tmp = JSON.parse(response.data[0].form_value);
          for (let i = 0; i < this.tmp.length; i++) {
            this.form_value.push(this.tmp[i]);
          }
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    },

    sentpetition() {
      this.approval_order = JSON.parse(this.petitionListById.approval_order);
      for (let i = 0; i < this.approval_order.length; i++) {
        if (this.approval_order[i].approver_state == "ไม่อนุมัติ") {
          this.approval_order[i].approver_state = "ยังไม่ได้อนุมัติ";
        }
      }
      axios
        .post(process.env.VUE_APP_URL + "approvepetition", {
          submit_id: this.petitionListById.submit_id,
          submit_state: this.petitionListById.submit_state,
          approval_order: this.approval_order,
          form_value: this.form_value,
          submit_refuse: null,
        })
        .then((response) => {
          if (response.data == "Approve petition successful") {
            this.$swal({
              icon: "success",
              title: "แก้ไขการส่งคำร้องสำเร็จ",
              text:
                "แก้ไขการส่งคำร้อง " +
                this.petitionListById.form_name +
                " สำเร็จ ",
              timer: 2000,
            });
            this.$router.push("/UserTracking");
          } else {
            this.$swal({
              icon: "warning",
              title: "เกิดข้อผิดพลาดในแก้ไขการส่งคำร้อง",
              timer: 2000,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    back() {
      this.$swal({
        title: "ท่านกำลังจะออกจากหน้าแก้ไขการส่งคำร้อง?",
        text: "ท่านเเน่ใจว่าต้องการออกจากหน้าแก้ไขคำร้อง!",
        icon: "warning",
        width: 650,
        showCancelButton: true,
        confirmButtonText: "ตกลง",
        cancelButtonText: "ยกเลิก",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$router.push("/Trackingdetail/" + this.$route.params.id);
        }
      });
    },
  },
  mounted() {
    this.getsubmitformsbyid();
  },
};
</script>

<style scoped>
h1 {
  padding: 10px;
}
.cardshow {
  margin: 2%;
}
</style>
