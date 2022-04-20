<template>
  <!-- ส่วนจัดเเสดง -->
  <div id="AdminEditAgency">
    <NavbarAdmin />
    <v-card class="cardshow">
      <h1>
        แก้ไขข้อมูลหน่วยงาน
        <v-divider></v-divider>
      </h1>

      <v-form v-model="isValid" @submit.prevent="editagency()">
        <v-container>
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="agency_name"
                :rules="agency_rules"
                type="email"
                label="ชื่อหน่วยงาน"
              ></v-text-field>
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
  name: "AdminEditAgency",
  components: {
    NavbarAdmin,
  },
  data() {
    return {
      agency_name: "",
      isValid: true,
      url: null,
      agencylist: [],
      agency_rules: [(value) => !!value || "จำเป็น"],
    };
  },
  methods: {
    getagencybyid() {
      axios
        .get(process.env.VUE_APP_URL + "agency/" + this.$route.params.id)
        .then((response) => {
          // handle success
          this.agency_name = response.data.agency_name;
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    },

    editagency() {
      axios
        .patch(process.env.VUE_APP_URL + "agency/" + this.$route.params.id, {
          data: {
            agency_name: this.agency_name,
          },
        })
        .then((response) => {
          if (response.data == "กรุณากรอกอีเมล") {
            this.$swal({
              icon: "error",
              title: "กรุณากรอกอีเมล",
              timer: 2000,
            });
          } else if (response.data.message == "อีเมลนี้มีอยู่ในระบบแล้ว") {
            this.$swal({
              icon: "error",
              title: "อีเมลนี้มีอยู่ในระบบแล้ว!",
              timer: 2000,
            });
          } else if (response.data == "อัพเดตหน่วยงานสำเร็จ") {
            this.$swal({
              icon: "success",
              title: "แก้ไขข้อมูลหน่วยงาน",
              text:
                "ยินดีด้วยคุณแก้ไขข้อมูลหน่วยงาน " +
                this.agency_name +
                " สำเร็จ",
              timer: 2000,
            });
            this.$router.push("/AdminAgencyManagement");
          } else {
            this.$swal({
              icon: "error",
              title: "เกิดข้อผิดพลาด",
              text:
                "เกิดข้อผิดพลาดในการแก้ไขข้อมูล " +
                this.form.f_name +
                " " +
                this.form.l_name,
              timer: 2000,
            });
            this.$router.push("/AdminAgencyManagement");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    cancel() {
      this.$swal({
        title: "ท่านกำลังจะออกจากหน้าแก้ไขหน่วยงาน?",
        text: "ท่านเเน่ใจว่าต้องการออกจากหน้าแก้ไขหน่วยงาน!",
        icon: "warning",
        width: 650,
        showCancelButton: true,
        confirmButtonText: "ตกลง",
        cancelButtonText: "ยกเลิก",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$router.push("/AdminAgencyManagement");
        }
      });
    },
  },
  mounted() {
    this.getagencybyid();
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
