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
      <h1 v-for="heard in heard" :key="heard" style="text-align: center">
        {{ heard.title }}
      </h1>
      <v-form v-model="valid" v-for="profile in profile" :key="profile">
        <v-container>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="profile.Fname"
                :counter="10"
                label="ชื่อ"
                required
                disabled
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="profile.Lname"
                :counter="10"
                label="นามสกุล"
                required
                disabled
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="profile.gender"
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
                label="ที่อยู่"
                required
                disabled
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row v-for="heard in heard" :key="heard">
            <v-col align="center" v-if="heard.hasSpecificsDetail">
              <v-row v-for="specifics in specifics" :key="specifics">
                <v-col>
                  {{ specifics.titleheard }}
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
      detail: "",
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
      heard: [
        {
          title: "การขอสอบย้อนหลัง",
          hasSpecificsDetail: true, //ตัวกำหนดว่าเป็นฟอรมต้องใส่รายละเอียดเพิ่ม
        },
      ],
      specifics: [
        { titleheard: "ข้อมูลรายวิชา", specificsdetail: "" },
        { titleheard: "เหตุผล", specificsdetail: "" },
        { titleheard: "เหตุผล", specificsdetail: "" },
        { titleheard: "เหตุผล", specificsdetail: "" },
      ],
      petitionListById: [],
    };
  },
  methods: {
    getpetitionbyid() {
      console.log(this.$route.params.form_id);
      axios
        .get(process.env.VUE_APP_URL + "forms/" + this.$route.params.id)
        .then((response) => {
          // handle success
          this.petitionListById = response.data;
        })
        .catch((error) => {
          // handle error
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
