<template>
  <div id="UseRequest" class="bg-color">
    <NavbarUser />
    <v-card class="cardmargin">
      <v-toolbar dark prominent color="#FFAB40">
        <h1 class="text-center pa-5">การร้องขอคำร้องที่ไม่มีในระบบ</h1>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="หัวข้อการร้องขอ"
                placeholder="ระบุหัวข้อการร้องข้อ"
                v-model="request_title"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                solo
                name="input-7-4"
                label="ระบุรายละเอียดการร้องขอดังกล่าว"
                v-model="request_detail"
              ></v-textarea>
            </v-col>
            <v-col cols="12" class="text-center">
              <v-btn dark x-large color="#2E7D32" @click="sentrequest">
                ส่งการร้องขอ
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import NavbarUser from "../../components/NavbarUser.vue";
import axios from "axios";
export default {
  name: "UserRequest",
  components: {
    NavbarUser,
  },
  data() {
    return {
      request_title: "",
      request_detail: "",
    };
  },
  methods: {
    sentrequest() {
      axios
        .post(process.env.VUE_APP_URL + "requests", {
          users_id: this.$store.getters.getUser.user_id,
          request_title: this.request_title,
          request_detail: this.request_detail,
        })
        .then((response) => {
          if (response.data == "Please fill your information") {
            alert("กรุณากรอกข้อมูลให้ครบ");
          } else if (response.data == "Sent request successful") {
            alert("การร้องขอคำร้องสำเร็จ");
            this.request_title = "";
            this.request_detail = "";
          } else {
            alert("เกิดข้อผิดพลาดในการร้องขอคำร้องสำเร็จ");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.bg-color {
  background: #f0f0f0;
  height: 100%;
}
.cardmargin {
  margin: 2%;
}
h1 {
  font-size: 50px;
  padding: 2% 0% 0% 0%;
}
</style>
