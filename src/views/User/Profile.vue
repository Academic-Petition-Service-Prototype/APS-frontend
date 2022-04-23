<template>
  <div id="UserProfile">
    <!-- ส่วนจัดเเสดง -->
    <NavbarUser />

    <v-card class="cardshow">
      <h1>
        ข้อมูลผู้ยื่นคำร้อง
        <v-divider></v-divider>
      </h1>

      <v-row>
        <v-col align="center">
          <v-btn fab width="auto" height="auto" class="">
            <v-img class="rounded-circle" width="150" height="150" :src="url">
            </v-img>
          </v-btn>
        </v-col>
      </v-row>

      <v-form v-for="profile in profile" :key="profile">
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
        </v-container>
      </v-form>
    </v-card>
    <!-- ส่วนจัดเเสดง -->

    <!-- ส่วนจัดเเสดง -->
  </div>
</template>

<script>
import NavbarUser from "../../components/NavbarUser.vue";
export default {
  name: "UserProfile",
  components: {
    NavbarUser,
  },
  data() {
    return {
      url: process.env.VUE_APP_USER_IMG + this.$store.getters.getUser.img,
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
    };
  },
};
</script>

<style>
h1 {
  text-align: center;
  padding: 10px;
}
.cardshow {
  margin: 2%;
}
</style>
