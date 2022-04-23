<template>
  <!-- ส่วนจัดเเสดง -->
  <div id="ChiefSecretaryManagement">
    <NavbarChief />
    <v-card class="cardshow">
      <v-toolbar dark prominent color="primary">
        <h1 class="text-center pa-5">จัดการเลขานุการ</h1>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-container>
        <v-data-iterator
          :items="listSecretary"
          :items-per-page.sync="itemsPerPage"
          :page.sync="page"
          :search="search"
          :sort-by="sortBy.toLowerCase()"
          :sort-desc="sortDesc"
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
                  เพิ่มเลขานุการ
                </v-btn></v-col
              >
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  prepend-inner-icon="mdi-magnify"
                  label="ชื่อเลขานุการ"
                  placeholder="ชื่อเลขานุการ"
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
            <v-row>
              <v-col class="h3" md="5"> ชื่อ-นามสกุล </v-col>
              <v-col class="h3" md="1"> เพศ </v-col>
              <v-col class="h3" md="4"> วันที่เพิ่มเข้าสู่ระบบ </v-col>
              <v-col class="h3" md="2"> การกระทำ </v-col>
            </v-row>

            <v-row v-for="item in props.items" :key="item.text">
              <v-card-title>
                <v-row class="text-center">
                  <v-col md="5"> {{ item.fullname }}</v-col>
                  <v-col md="1"> {{ item.gender }} </v-col>
                  <v-col md="4"> {{ item.registered }} </v-col>
                  <v-col md="2">
                    <v-btn icon @click="editsecretary(item.user_id)"
                      ><v-icon color="yellow">mdi-pencil</v-icon></v-btn
                    >
                    <v-btn
                      icon
                      @click="deletesecretary(item.user_id, item.fullname)"
                      ><v-icon color="red">mdi-delete</v-icon></v-btn
                    >
                  </v-col>
                </v-row>
              </v-card-title>
              <v-divider style="margin: 0px 10px 0px 10px;"></v-divider>
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
                  color="primary"
                  class="mr-1"
                  @click="formerPage"
                >
                  <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
                <v-btn
                  fab
                  dark
                  icon
                  color="primary"
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

      <!-- เพิ่มข้อมูล secretary -->
      <v-dialog v-model="dialogadd" persistent max-width="1000px">
        <v-card align="center">
          <h1>เพิ่มเลขานุการ</h1>
          <v-divider></v-divider>
          <v-form v-model="isValid" @submit.prevent="addsecretary()">
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
      <!-- เพิ่มข้อมูล secretary -->
    </v-card>
  </div>
  <!-- ส่วนจัดเเสดง -->
</template>

<script>
import NavbarChief from "../../components/NavbarChief.vue";
import axios from "axios";
export default {
  name: "ChiefSecretaryManagement",
  components: {
    NavbarChief,
  },
  data() {
    return {
      // ของตัวตาราง
      search: "",
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 5,
      sortBy: "name",
      // ของตัวตาราง
      url: null,
      isValid: true,
      listSecretary: [],

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
      dialogdel: false,
      // ของตัวไดอล็อค

      // ฟอร์มเพิ่มข้อมูลเลขานุการ
      form: {
        email: "",
        password: "",
        f_name: "",
        l_name: "",
        gender: "",
        address: "",
        tel_num: "",
        img: [],
        agency_id: this.$store.getters.getUser.agencies_id,
      },
    };
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.listSecretary.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter((key) => key !== "Name");
    },
  },
  methods: {
    addsecretary() {
      let formData = new FormData();

      formData.append("email", this.form.email);
      formData.append("password", this.form.password);
      formData.append("role", "secretary");
      formData.append("f_name", this.form.f_name);
      formData.append("l_name", this.form.l_name);
      formData.append("tel_num", this.form.tel_num);
      formData.append("gender", this.form.gender);
      formData.append("address", this.form.address);
      formData.append("img", this.form.img);
      formData.append("agencies_id", this.form.agency_id);

      axios
        .post(process.env.VUE_APP_URL + "users", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.data == "Add secretary success") {
            this.$swal({
              icon: "success",
              title: "เพิ่มเลขานุการสำเร็จ",
              text:
                "เพิ่มเลขานุการ " +
                this.form.f_name +
                " " +
                this.form.l_name +
                " สำเร็จ ",
              timer: 2000,
            });
            this.$router.go();
          } else if (response.data == "อีเมลนี้มีอยู่ในระบบแล้ว") {
            this.$swal({
              icon: "error",
              title: "เพิ่มเลขานุการไม่สำเร็จ",
              text: "อีเมลนี้มีอยู่ในระบบแล้ว",
              timer: 2000,
            });
          }
        })
        .catch((error) => console.log(error));
    },

    getsecretary() {
      axios
        .post(process.env.VUE_APP_URL + "getusers", {
          role: this.$store.getters.getUser.role,
          roletarget: "secretary",
          agency_id: this.$store.getters.getUser.agencies_id,
        })
        .then((response) => {
          //handle success
          this.listSecretary = response.data;

          for (let i = 0; i < this.listSecretary.length; i++) {
            // date format
            this.listSecretary[i].registered = new Date(
              this.listSecretary[i].registered
            );
            this.listSecretary[i].registered = this.listSecretary[
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
      this.url = null;
      this.dialogadd = false;
    },

    editsecretary(user_id) {
      this.$router.push("/ChiefSecretaryEdit/" + user_id);
    },

    deletesecretary(user_id, fullname) {
      this.$swal({
        title: "ท่านแน่ใจหรือว่าต้องการจะลบเลขานุการ?",
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
                role: "secretary",
              },
            })
            .then((response) => {
              // handle success
              if (response.data == "ลบ secretary สำเร็จ") {
                this.$swal({
                  icon: "success",
                  title: "ลบเลขานุการสำเร็จ",
                  text: "ลบเลขานุการ " + fullname + " สำเร็จ",
                  timer: 2000,
                });
                this.$router.go();
              } else {
                this.$swal({
                  icon: "error",
                  title: "ลบเลขานุการไม่สำเร็จ",
                  text: "เกิดข้อผิดพลาดในการลบเลขานุการ",
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

    Preview_image() {
      this.url = URL.createObjectURL(this.form.img);
    },

    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },

    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },

    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
  },
  mounted() {
    this.getsecretary();
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
