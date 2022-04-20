<template>
  <!-- ส่วนจัดเเสดง -->
  <div id="AdminAdminManagement">
    <NavbarAdmin />
    <v-card class="cardshow">
      <v-toolbar dark prominent color="#00B8D4">
        <h1 class="text-center pa-5">จัดการผู้ดูแลระบบ</h1>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-container>
        <v-data-iterator
          :items="adminlist"
          :items-per-page.sync="itemsPerPage"
          :page.sync="page"
          :search="search"
          :sort-by="sortBy.toLowerCase()"
          hide-default-footer
          class="text-center"
        >
          <template v-slot:header>
            <v-row>
              <v-col align="right"
                ><v-btn
                  color="success"
                  style="margin: 10px 10px -25px 10px"
                  @click="dialogadd = !dialogadd"
                >
                  เพิ่มผู้ดูแลระบบ
                </v-btn></v-col
              >
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  prepend-inner-icon="mdi-magnify"
                  label="ชื่อผู้ดูแลระบบ / หน่วยงาน"
                  placeholder="ชื่อผู้ดูแลระบบ / หน่วยงาน"
                  filled
                  rounded
                  dense
                  v-model="search"
                  class="cardshow"
                >
                </v-text-field>
                <template v-if="$vuetify.breakpoint.mdAndUp"> </template>
              </v-col>
            </v-row>
          </template>

          <template v-slot:default="props">
            <v-row class="text-center">
              <v-col class="h3" md="4"> ชื่อ-นามสกุล </v-col>
              <v-col class="h3" md="2"> หน่วยงาน </v-col>
              <v-col class="h3" md="4"> วันที่เพิ่มเข้าสู่ระบบ </v-col>
              <v-col class="h3" md="2"> การกระทำ </v-col>
            </v-row>

            <v-row v-for="(item, index) in props.items" :key="index">
              <v-card-title>
                <v-row class="text-center" align="center">
                  <v-col md="4"> {{ item.fullname }}</v-col>
                  <v-col md="2"> {{ item.agency_name }} </v-col>
                  <v-col md="4"> {{ item.registered }} </v-col>
                  <v-col md="2">
                    <v-btn icon @click="editadmin(item.user_id)"
                      ><v-icon color="yellow">mdi-pencil</v-icon></v-btn
                    >
                    <v-btn
                      icon
                      @click="deleteadmin(item.user_id, item.fullname)"
                      ><v-icon color="red">mdi-delete</v-icon></v-btn
                    >
                  </v-col>
                </v-row>
              </v-card-title>
              <v-divider style="margin: 0px 10px 0px 10px"></v-divider>
            </v-row>
          </template>

          <template v-slot:footer>
            <v-row class="mt-2" align="center" justify="center">
              <v-menu offset-y> </v-menu>

              <v-spacer></v-spacer>
              <v-row>
                <v-col align="center">
                  <span class="mr-4 grey--text">
                    Page {{ page }} of {{ numberOfPages }}
                  </span>
                </v-col>
              </v-row>
            </v-row>
            <v-row>
              <v-col align="center">
                <v-btn
                  fab
                  dark
                  icon
                  color="#00B8D4"
                  class="mr-1"
                  @click="formerPage"
                >
                  <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
                <v-btn
                  fab
                  dark
                  icon
                  color="#00B8D4"
                  class="ml-1"
                  @click="nextPage"
                >
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </template>
        </v-data-iterator>
      </v-container>
      <!-- เพิ่มข้อมูล admin -->
      <v-dialog v-model="dialogadd" persistent max-width="1000px">
        <v-card align="center">
          <h1>เพิ่มข้อมูลผู้ดูแลระบบ</h1>
          <v-divider></v-divider>
          <v-form @submit.prevent="addadmin()" v-model="isValid">
            <template>
              <v-container>
                <v-row>
                  <v-col>
                    <v-img
                      :src="url"
                      width="150"
                      height="150"
                      class="rounded-circle"
                    ></v-img>
                    <v-file-input
                      id="file"
                      ref="file"
                      v-model="form.img"
                      :rules="img_rules"
                      @change="Preview_image"
                      accept="img/png, img/jpeg, img/bmp"
                      placeholder="เลือกรูปโปรไฟล์"
                      prepend-icon="mdi-camera"
                      label="รูปโปรไฟล์"
                    ></v-file-input>
                  </v-col>
                  <v-col>
                    <v-text-field
                      class="cardmargin"
                      v-model="form.email"
                      :rules="email_rules"
                      type="email"
                      label="อีเมล"
                      required
                    ></v-text-field>
                    <v-text-field
                      class="cardmargin"
                      v-model="form.password"
                      :rules="password_rules"
                      type="password"
                      label="รหัสผ่าน"
                      required
                    ></v-text-field>
                    <v-text-field
                      class="cardmargin"
                      v-model="form.f_name"
                      :rules="general_rules"
                      label="ชื่อ"
                      required
                    ></v-text-field>
                    <v-text-field
                      class="cardmargin"
                      v-model="form.l_name"
                      :rules="general_rules"
                      label="นามสกุล"
                      required
                    ></v-text-field>
                    <v-radio-group v-model="form.gender" mandatory row>
                      <v-radio label="ชาย" value="ชาย"></v-radio>
                      <v-radio
                        label="หญิง"
                        value="หญิง"
                        color="#E91E63"
                      ></v-radio>
                    </v-radio-group>

                    <v-text-field
                      class="cardmargin"
                      v-model="form.tel_num"
                      type="number"
                      :rules="tel_num_rules"
                      label="เบอร์โทร"
                      required
                    ></v-text-field>

                    <v-text-field
                      class="cardmargin"
                      v-model="form.address"
                      :rules="general_rules"
                      label="ที่อยู่"
                      required
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
                <v-btn color="error" @click="resetadd()">
                  ยกเลิก
                </v-btn>
              </v-container>
            </template>
          </v-form>
        </v-card>
      </v-dialog>
      <!-- เพิ่มข้อมูล admin -->
    </v-card>
  </div>
  <!-- ส่วนจัดเเสดง -->
</template>

<script>
import NavbarAdmin from "../../components/NavbarAdmin.vue";
import axios from "axios";
export default {
  name: "AdminAdminManagement",
  components: {
    NavbarAdmin,
  },
  data() {
    return {
      search: "",
      filter: {},
      page: 1,
      itemsPerPage: 5,
      sortBy: "name",
      url: null,
      adminlist: [],
      agencylist: [],
      isValid: true,
      // rules
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

      // ของตัวไดอล็อค
      dialogadd: false,
      // ของตัวไดอล็อค

      // ฟอร์มเพิ่มข้อมูลผู้ดูแลระบบ
      form: {
        email: "",
        password: "",
        f_name: "",
        l_name: "",
        gender: "",
        address: "",
        tel_num: "",
        img: [],
        agency_id: "",
      },
    };
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.adminlist.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter((key) => key !== "Name");
    },
  },
  methods: {
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },

    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },

    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },

    resetadd() {
      this.form = {
        email: "",
        password: "",
        f_name: "",
        l_name: "",
        gender: "",
        address: "",
        tel_num: "",
        img: [],
        agency_id: "",
      };
      this.dialogadd = false;
    },

    Preview_image() {
      this.url = URL.createObjectURL(this.form.img);
    },

    addadmin() {
      let formData = new FormData();

      formData.append("email", this.form.email);
      formData.append("password", this.form.password);
      formData.append("role", "admin");
      formData.append("f_name", this.form.f_name);
      formData.append("l_name", this.form.l_name);
      formData.append("tel_num", this.form.tel_num);
      formData.append("gender", this.form.gender);
      formData.append("address", this.form.address);
      formData.append("img", this.form.img);
      formData.append("agencies_id", 2);

      axios
        .post(process.env.VUE_APP_URL + "users", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.data == "Add admin success") {
            this.$swal({
              icon: "success",
              title: "เพิ่มผู้ดูแลระบบสำเร็จ",
              text:
                "เพิ่มผู้ดูแลระบบ " +
                this.form.f_name +
                " " +
                this.form.l_name +
                " สำเร็จ ",
              timer: 2000,
            });
          } else {
            this.$swal({
              icon: "error",
              title: "เพิ่มผู้ดูแลระบบไม่สำเร็จ",
              text: "เกิดข้อผิดพลาดในการเพิ่มผู้ดูแลระบบ",
              timer: 2000,
            });
          }
        })
        .then(() => {
          this.$router.go();
        })
        .catch((error) => console.log(error));
    },

    getalladmin() {
      axios
        .post(process.env.VUE_APP_URL + "getusers", {
          role: this.$store.getters.getUser.role,
          roletarget: "admin",
        })
        .then((response) => {
          //handle success
          this.adminlist = response.data;

          for (let i = 0; i < this.adminlist.length; i++) {
            // date format
            this.adminlist[i].registered = new Date(
              this.adminlist[i].registered
            );
            this.adminlist[i].registered = this.adminlist[
              i
            ].registered.toLocaleDateString("th-TH", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              weekday: "short",
              hour: "numeric",
              minute: "numeric",
            });
            // date format
          }
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

    editadmin(user_id) {
      this.$router.push("/AdminadminEdit/" + user_id);
    },

    deleteadmin(user_id, fullname) {
      this.$swal({
        title: "ท่านแน่ใจหรือว่าต้องการจะลบผู้ดูแลระบบ?",
        icon: "warning",
        width: 600,
        showCancelButton: true,
        confirmButtonText: "ตกลง",
        cancelButtonText: "ยกเลิก",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(process.env.VUE_APP_URL + "users/" + user_id, {
              data: {
                role: "admin",
              },
            })
            .then((response) => {
              // handle success
              if (response.data == "ลบ admin สำเร็จ") {
                this.$swal({
                  icon: "success",
                  title: "ลบผู้ดูแลระบบสำเร็จ",
                  text: "ลบผู้ดูแลระบบ " + fullname + " สำเร็จ",
                  timer: 2000,
                });
                this.$router.go();
              } else {
                this.$swal({
                  icon: "error",
                  title: "ลบผู้ดูแลระบบไม่สำเร็จ",
                  text: "เกิดข้อผิดพลาดในการลบผู้ดูแลระบบ",
                  timer: 2000,
                });
              }
            })
            .catch((error) => {
              // handle error
              console.log(error);
            });
        }
      });
    },
  },
  mounted() {
    this.getalladmin();
    this.getallagency();
  },
};
</script>

<style scoped>
h1 {
  font-size: 50px;
  padding: 2% 0% 0% 0%;
}
.cardshow {
  margin: 2%;
}
.btn-margin {
  margin: 3%;
}
</style>
