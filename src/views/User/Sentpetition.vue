<template>
  <!-- ส่วนจัดเเสดง -->
  <div id="UserSentpetition">
    <NavbarUser />
    <v-card class="cardshow">
      <h1>
        แบบคำร้อง / ยื่นเรื่อง
        <v-divider></v-divider>
      </h1>
     
      <h1 v-for="heard in heard" :key="heard" style="text-align: center">
        {{ petitionListById.form_name }}
      </h1>
      <v-form v-model="valid" v-for="profile in profile" :key="profile">
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
                v-model="profile.num_tel"
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
            <v-col align="center" v-if="heard.hasSpecificsDetail">
              <!-- <v-row v-for="form_specific in petitionListById" :key="form_specific.id"> -->
              <v-row
                v-for="(form_specific, index) in petitionListById.form_specific"
                :key="form_specific.id"
              >
                <v-col>
                  {{ form_specific.title }}
                  <v-text-field
                    v-model="form_value[index]"
                    label="ใส่ข้อมูลลงที่นี้"
                    required
                  >
                  </v-text-field>

                  <!-- {{ form_value }} -->
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-row>
            <v-col align="center">
              <v-btn class="ma-2" color="success" @click="sentpetition">
                ส่งคำร้อง
              </v-btn>
            </v-col>

            <v-col align="center">
              <v-btn class="ma-2" outlined color="error" to="/UserPetition">
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
  name: "UserSentpetition",
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
          role: this.$store.getters.getUser.role,
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
    };
  },
  methods: {
    getpetitionbyid() {
      axios
        .get(process.env.VUE_APP_URL + "forms/" + this.$route.params.id)
        .then((response) => {
          // handle success
          // this.tmp = JSON.stringify(response.data);
          // this.petitionListById = this.tmp.replace(/\\/g, "");

          // form_specific
          this.petitionListById = response.data;
          this.tmp = JSON.stringify(this.petitionListById.form_specific);
          this.tmp = this.tmp.replace(/\\/g, "");
          this.specifics = this.tmp.replace(/\\/g, "");

          var temp = this.specifics.slice(1, -1);
          temp = JSON.parse(temp);
          this.petitionListById.form_specific = temp;

          //approval_name
          this.petitionListById = response.data;
          this.tmp = JSON.stringify(this.petitionListById.approval_name);
          this.tmp = this.tmp.replace(/\\/g, "");
          this.specifics = this.tmp.replace(/\\/g, "");

          temp = this.specifics.slice(1, -1);
          temp = JSON.parse(temp);
          this.petitionListById.approval_name = temp;

          
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    },
    sentpetition() {
      axios
        .post(process.env.VUE_APP_URL + "submitforms", {
          users_id: this.$store.getters.getUser.user_id,
          forms_id: this.petitionListById.form_id,
          approval_order: this.petitionListById.approval_name,
          form_value: this.form_value,
        })
        .then((response) => {
          if (response.data == "Sent petition successful") {
            alert("ส่งคำร้อง" + this.petitionListById.form_name + "สำเร็จ");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getpetitionbyid();
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
