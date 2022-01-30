<template>
  
  <v-app>
    <!-- ส่วนจัดเเสดง -->
    <NavbarStu />

    <v-card class="cardshow">
      <h1>
        ข้อมูลผู้ใช้งาน
        <v-divider></v-divider>
      </h1>
      <v-row>
        <v-col align="center">
          <v-btn fab width="auto" height="auto" class="">
            <v-img
              class="rounded-circle"
              width="150"
              height="150"
              src="../../assets/5074620687.jpg"
            >
            </v-img>
          </v-btn>
        </v-col>
      </v-row>

      <v-form v-model="valid" v-for="profile in profile" :key="profile">
        <v-container>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="profile.f_name"
                :rules="nameRules"
                label="ชื่อ"
                required
                disabled
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="profile.l_name"
                :rules="nameRules"
                label="นามสกุล"
                required
                disabled
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="profile.gender"
                :rules="emailRules"
                label="เพศ"
                required
                disabled
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                v-model="profile.status"
                :rules="emailRules"
                label="สถานะผู้ใช้งาน"
                required
                disabled
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                v-model="profile.email"
                :rules="emailRules"
                label="E-mail"
                required
                disabled
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                v-model="profile.tel_num"
                :rules="emailRules"
                label="เบอร์โทร"
                required
                disabled
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                v-model="profile.address"
                :rules="emailRules"
                label="ที่อยู่"
                required
                disabled
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row v-for="heard in heard" :key="heard">
            <v-col align="center" v-if="heard.type == 1">
              <v-row v-for="specifics in specifics" :key="specifics">
                <v-col>
                  {{ specifics.titleheard }}
                  <v-text-field
                    v-model="specifics.specificsdetail"
                    :rules="emailRules"
                    label="ใส่ข้อมูลลงที่นี้"
                    required
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
    <!-- ส่วนจัดเเสดง -->

    <!-- ส่วนจัดเเสดง -->
  </v-app>
</template>

<script>
import NavbarStu from "../../components/NavbarUser.vue";
export default {
  name: "FormsSTU",
  components: {
    NavbarStu,
  },
  data() {
    return {
      detail: "",
      profile: [
        {
          f_name: this.$store.getters.getUser.f_name,
          l_name: this.$store.getters.getUser.l_name,
          gender: this.$store.getters.getUser.gender,
          email: this.$store.getters.getUser.email,
          tel_num: this.$store.getters.getUser.tel_num,
          address: this.$store.getters.getUser.address,
          status: this.$store.getters.getUser.status,
        },
      ],
    };
  },
};
</script>

<style>
h1{
  text-align: center;
  padding: 10px;
}
.cardshow {
  margin: 2%;
}
</style>
