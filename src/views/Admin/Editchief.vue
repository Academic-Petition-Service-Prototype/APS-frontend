<template>
  <!-- ส่วนจัดเเสดง -->
  <div id="AdminEditChief">
    <NavbarAdmin />
    <v-card class="cardshow">
      <h1>
        แก้ไขข้อมูลหัวหน้าหน่วยงาน
        <v-divider></v-divider>
      </h1>
      {{ form.img }}

      <v-form v-model="isValid">
        <v-container>
          <v-row>
            <v-col align="center">
              <v-img class="rounded-circle" width="150" height="150" :src="url">
              </v-img>
              <v-file-input
                id="file"
                ref="file"
                v-model="form.img"
                value="form.img"
                @click="Preview_image()"
                accept="img/png, img/jpeg, img/bmp"
                placeholder="เลือกรูปโปรไฟล์"
                prepend-icon="mdi-camera"
                label="รูปโปรไฟล์"
              ></v-file-input>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.email"
                :rules="email_rules"
                type="email"
                label="อีเมล"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.password"
                :rules="password_rules"
                label="รหัสผ่าน"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                class="cardmargin"
                v-model="form.f_name"
                :rules="general_rules"
                label="ชื่อ"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="form.l_name"
                :rules="general_rules"
                label="นามสกุล"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-radio-group v-model="form.gender" mandatory row>
                <v-radio label="ชาย" value="ชาย"></v-radio>
                <v-radio label="หญิง" value="หญิง" color="#E91E63"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                v-model="form.tel_num"
                type="number"
                :rules="tel_num_rules"
                label="เบอร์โทร"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                v-model="form.address"
                :rules="general_rules"
                label="ที่อยู่"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-select
                v-model="form.agency_id"
                :rules="general_rules"
                :items="agencylist"
                item-text="agency_name"
                item-value="agency_id"
                label="เลือกหน่วยงาน"
              ></v-select>
            </v-col>
          </v-row>
          <v-btn
            color="green text-white"
            class="mr-5"
            type="submit"
            :disabled="!isValid"
            >ยืนยัน</v-btn
          >
          <v-btn color="error" @click="cancel()">
            ยกเลิก
          </v-btn>
        </v-container>
      </v-form>
    </v-card>
    <!-- ส่วนจัดเเสดง -->
  </div>
</template>
<script>
import NavbarAdmin from "../../components/NavbarAdmin.vue";
import axios from "axios";
export default {
  name: "AdminEditChief",
  components: {
    NavbarAdmin,
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
        f_name: "",
        l_name: "",
        gender: "",
        address: "",
        tel_num: "",
        img: {},
        agency_id: "",
      },
      isValid: true,
      url: null,
      agencylist: [],
      email_rules: [
        (value) => !!value || "จำเป็น",
        (value) => (value || "").length <= 30 || "สูงสุด 30 ตัวอักษร",
        (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "รูปแบบอีเมลผิด";
        },
      ],
      img_rules: [
        (value) => !!value || "จำเป็น",
        (value) =>
          !value || value.size < 2000000 || "รูปภาพโปรไฟล์ขนาดไม่เกิน 2 MB!",
      ],
      general_rules: [(value) => !!value || "จำเป็น"],
      password_rules: [
        (value) => !!value || "จำเป็น",
        (value) => value.length >= 6 || "รหัสผ่านต้องมี 6 อักษรขึ้นไป",
      ],
      tel_num_rules: [
        (value) => !!value || "จำเป็น",
        (value) => value.length == 10 || "เบอร์โทรต้องมีหมายเลข 10 ตัวเลข",
      ],
    };
  },
  methods: {
    getuserbyid() {
      axios
        .get(process.env.VUE_APP_URL + "users/" + this.$route.params.id)
        .then((response) => {
          // handle success
          this.form.email = response.data.email;
          this.form.password = response.data.password;
          this.form.f_name = response.data.f_name;
          this.form.l_name = response.data.l_name;
          this.form.gender = response.data.gender;
          this.form.address = response.data.address;
          this.form.tel_num = response.data.tel_num;
          this.form.img = response.data.img;
          this.form.agency_id = response.data.agencies_id;
          this.url = process.env.VUE_APP_IMG + this.form.img;
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    },
    getallagency() {
      axios
        .get(process.env.VUE_APP_URL + "agency")
        .then((response) => {
          //handle success
          this.agencylist = response.data;
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    },
    Preview_image() {
      this.url = URL.createObjectURL(this.form.img);
    },
    cancel() {
      this.$router.push("/AdminChiefManagement");
    },
  },
  mounted() {
    this.getallagency();
    this.getuserbyid();
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  padding: 10px;
}
h2 {
  text-align: center;
  padding: 10px;
}
.cardshow {
  margin: 2%;
}
.box-margin {
  margin: 5%;
}
</style>
