<template>
  <!-- ส่วนจัดเเสดง -->
  <div id="AdminChiefManagement">
    <NavbarAdmin />
    <v-card class="cardshow">
      <v-toolbar dark prominent color="#00B8D4">
        <h1>จัดการหัวหน้าหน่วยงาน</h1>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-container>
        <v-data-iterator
          :items="chieflist"
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
                  เพิ่มหัวหน้าหน่วยงาน
                </v-btn></v-col
              >
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  prepend-inner-icon="mdi-magnify"
                  label="ชื่อหัวหน้าหน่วยงาน / หน่วยงาน"
                  placeholder="ชื่อหัวหน้าหน่วยงาน / หน่วยงาน"
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
                    <v-btn icon
                      ><v-icon color="yellow" @click="editchief(item.user_id)"
                        >mdi-pencil</v-icon
                      ></v-btn
                    >
                    <v-btn icon
                      ><v-icon color="red" @click="dialogdel = !dialogdel"
                        >mdi-delete</v-icon
                      ></v-btn
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
      <!-- เพิ่มข้อมูล chief -->
      <v-dialog v-model="dialogadd" persistent max-width="1000px">
        <v-card align="center">
          <h1>เพิ่มข้อมูลหัวหน้าหน่วยงาน</h1>
          <v-divider></v-divider>
          <v-form @submit.prevent="addchief()" v-model="isValid">
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

                    <v-select
                      v-model="form.agency_id"
                      :rules="general_rules"
                      :items="agencylist"
                      item-text="agency_name"
                      item-value="agency_id"
                      label="เลือกหน่วยงาน"
                      required
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
                <v-btn color="error" @click="resetadd()">
                  ยกเลิก
                </v-btn>
              </v-container>
            </template>
          </v-form>
        </v-card>
      </v-dialog>
      <!-- เพิ่มข้อมูล chief -->
    </v-card>
  </div>
  <!-- ส่วนจัดเเสดง -->
</template>

<script>
import NavbarAdmin from "../../components/NavbarAdmin.vue";
import axios from "axios";
export default {
  name: "AdminChiefManagement",
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
      chieflist: [],
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
      dialogdel: false,
      // ของตัวไดอล็อค

      // ฟอร์มเพิ่มข้อมูลหัวหน้าหน่วยงาน
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
      return Math.ceil(this.chieflist.length / this.itemsPerPage);
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
      this.url = URL.createObjectURL(process.env.VUE_APP_IMG + this.form.img);
    },
    addchief() {
      let formData = new FormData();

      formData.append("email", this.form.email);
      formData.append("password", this.form.password);
      formData.append("role", "chief");
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
          if (response.data == "Add chief success") {
            this.$swal({
              icon: "success",
              title: "เพิ่มหัวหน้าหน่วยงาน",
              text:
                "ส่งรายงาน " +
                this.form.f_name +
                " " +
                this.form.l_name +
                " สำเร็จ ",
              timer: 2000,
            });
          } else {
            this.$swal({
              icon: "error",
              title: "เพิ่มหัวหน้าหน่วยงานไม่สำเร็จ",
              text: "เกิดข้อผิดพลาดในการเพิ่มหัวหน้าหน่วยงาน",
              timer: 2000,
            });
          }
        })
        .then(() => {
          window.location.reload();
        })
        .catch((error) => console.log(error));
    },
    getallchief() {
      axios
        .post(process.env.VUE_APP_URL + "getusers", {
          role: this.$store.getters.getUser.role,
          roletarget: "chief",
        })
        .then((response) => {
          //handle success
          this.chieflist = response.data;

          for (let i = 0; i < this.chieflist.length; i++) {
            // date format
            this.chieflist[i].registered = new Date(
              this.chieflist[i].registered
            );
            this.chieflist[i].registered = this.chieflist[
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
    editchief(user_id) {
      this.$router.push("/AdminChiefEdit/" + user_id);
    },
  },
  mounted() {
    this.getallchief();
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
