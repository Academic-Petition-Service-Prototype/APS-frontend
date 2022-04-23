<template>
  <!-- ส่วนจัดเเสดง -->
  <div id="AdminEditTag">
    <NavbarAdmin />
    <v-card class="cardshow">
      <h1>
        แก้ไขหมวดหมู่
        <v-divider></v-divider>
      </h1>

      <v-form v-model="isValid" @submit.prevent="edittag()">
        <v-container>
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="tag_name"
                :rules="tag_rules"
                type="text"
                label="ชื่อหมวดหมู่"
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
  name: "AdminEditTag",
  components: {
    NavbarAdmin,
  },
  data() {
    return {
      tag_name: "",
      isValid: true,
      url: null,
      taglist: [],
      tag_rules: [(value) => !!value || "จำเป็น"],
    };
  },
  methods: {
    gettagbyid() {
      axios
        .get(process.env.VUE_APP_URL + "tags/" + this.$route.params.id)
        .then((response) => {
          // handle success
          this.tag_name = response.data.tag_name;
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    },

    edittag() {
      axios
        .patch(process.env.VUE_APP_URL + "tag/" + this.$route.params.id, {
          data: {
            tag_name: this.tag_name,
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
          } else if (response.data == "อัพเดตหมวดหมู่สำเร็จ") {
            this.$swal({
              icon: "success",
              title: "แก้ไขหมวดหมู่",
              text: "ยินดีด้วยคุณแก้ไขหมวดหมู่ " + this.tag_name + " สำเร็จ",
              timer: 2000,
            });
            this.$router.push("/AdminTagManagement");
          } else {
            this.$swal({
              icon: "error",
              title: "เกิดข้อผิดพลาด",
              text:
                "เกิดข้อผิดพลาดในการแก้ไข " +
                this.form.f_name +
                " " +
                this.form.l_name,
              timer: 2000,
            });
            this.$router.push("/AdminTagManagement");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    cancel() {
      this.$swal({
        title: "ท่านกำลังจะออกจากหน้าแก้ไขหมวดหมู่?",
        text: "ท่านเเน่ใจว่าต้องการออกจากหน้าแก้ไขหมวดหมู่!",
        icon: "warning",
        width: 650,
        showCancelButton: true,
        confirmButtonText: "ตกลง",
        cancelButtonText: "ยกเลิก",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$router.push("/AdminTagManagement");
        }
      });
    },
  },
  mounted() {
    this.gettagbyid();
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
