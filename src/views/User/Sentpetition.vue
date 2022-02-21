<template>
  <!-- ส่วนจัดเเสดง -->
  <div id="UserSentpetition">
    <NavbarUser />
    <v-card class="cardshow">
      <h1>
        แบบคำร้อง / ยื่นเรื่อง
        <v-divider></v-divider>
      </h1>
      <h5>{{ petitionListById }}</h5>
      <h5>{{ specifics }}</h5>

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
              <v-row v-for="id in petitionListById.form_specific" :key="id">
                <v-col>
                  {{ id }}
                  <v-text-field
                    v-model="specifics.specificsdetail"
                    label="ใส่ข้อมูลลงที่นี้"
                    required
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-row>
            <v-col align="center">
              <v-btn class="ma-2" color="success"> ส่งคำร้อง </v-btn>
            </v-col>

            <v-col align="center">
              <v-btn class="ma-2" outlined color="error"> ย้อนกลับ </v-btn>
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
      detail: "sadas sadasdas sadasd",
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
      data1: "",
    };
  },
  methods: {
    getpetitionbyid() {
      console.log(this.$route.params.form_id);
      console.log(console.log(this.petitionListById.form_specific));
      axios
        .get(process.env.VUE_APP_URL + "forms/" + this.$route.params.id)
        .then((response) => {
          // handle success
          this.tmp = JSON.stringify(response.data);
          this.petitionListById = this.tmp.replace(/\\/g, "");
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    },
  },
  mounted() {
    this.getpetitionbyid();
    this.petitionListById.toString();
    this.specifics = this.petitionListById.split("");
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
