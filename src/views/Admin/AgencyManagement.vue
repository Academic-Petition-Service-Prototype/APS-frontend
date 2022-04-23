<template>
  <!-- ส่วนจัดเเสดง -->
  <div id="AdminAgencyManagement">
    <NavbarAdmin />
    <v-card class="cardshow">
      <v-toolbar dark prominent color="#00B8D4">
        <h1 class="text-center pa-5">จัดการหน่วยงาน</h1>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-container>
        <v-data-iterator
          :items="agencylist"
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
                  เพิ่มหน่วยงาน
                </v-btn></v-col
              >
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  prepend-inner-icon="mdi-magnify"
                  label="ชื่อหน่วยงาน"
                  placeholder="ชื่อหน่วยงาน"
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
              <v-col class="h3" md="6"> หน่วยงาน </v-col>
              <v-col class="h3" md="4"> วันที่เพิ่มเข้าสู่ระบบ </v-col>
              <v-col class="h3" md="2"> การกระทำ </v-col>
            </v-row>

            <v-row v-for="(item, index) in props.items" :key="index">
              <v-card-title>
                <v-row class="text-center" align="center">
                  <v-col md="6"> {{ item.agency_name }} </v-col>
                  <v-col md="4"> {{ item.agency_created }} </v-col>
                  <v-col md="2">
                    <v-btn icon @click="editagency(item.agency_id)"
                      ><v-icon color="yellow">mdi-pencil</v-icon></v-btn
                    >
                    <v-btn
                      icon
                      @click="deleteagency(item.agency_id, item.agency_name)"
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
      <!-- เพิ่มข้อมูล agency -->
      <v-dialog v-model="dialogadd" persistent max-width="1000px">
        <v-card align="center">
          <h1>เพิ่มข้อมูลหน่วยงาน</h1>
          <v-divider></v-divider>
          <v-form @submit.prevent="addagency()" v-model="isValid">
            <template>
              <v-container>
                <v-row>
                  <v-col>
                    <v-text-field
                      class="cardmargin"
                      v-model="agency_name"
                      :rules="agency_rules"
                      type="email"
                      label="ชื่อหน่วยงาน"
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
      <!-- เพิ่มข้อมูล agency -->
    </v-card>
  </div>
  <!-- ส่วนจัดเเสดง -->
</template>

<script>
import NavbarAdmin from "../../components/NavbarAdmin.vue";
import axios from "axios";
export default {
  name: "AdminAgencyManagement",
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
      agencylist: [],
      isValid: true,
      // rules
      agency_rules: [(value) => !!value || "จำเป็น"],

      // ของตัวไดอล็อค
      dialogadd: false,
      // ของตัวไดอล็อค

      // ฟอร์มเพิ่มข้อมูลหน่วยงาน
      agency_name: "",
    };
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.agencylist.length / this.itemsPerPage);
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

    addagency() {
      axios
        .post(process.env.VUE_APP_URL + "agency", {
          agency_name: this.agency_name,
        })
        .then((response) => {
          if (response.data == "กรุณากรอกชื่อหน่วยงาน") {
            this.$swal({
              icon: "error",
              title: "กรุณากรอกชื่อหน่วยงาน",
              timer: 2000,
            });
          } else if (response.data == "หน่วยงานนี้มีอยู่ในระบบแล้ว") {
            this.$swal({
              icon: "error",
              title: "หน่วยงานนี้มีอยู่ในระบบแล้ว",
              text: "หน่วยงาน " + this.agency_name + " มีอยู่ในระบบแล้ว",
              timer: 2000,
            });
          } else if (response.data == "เพิ่มหน่วยงานสำเร็จ") {
            this.$swal({
              icon: "success",
              title: "เพิ่มหน่วยงานสำเร็จ",
              text: "เพิ่มหน่วยงาน " + this.agency_name + " สำเร็จ",
              timer: 2000,
            });
            this.$router.go();
          } else {
            this.$swal({
              icon: "error",
              title: "เกิดข้อผิดพลาดในการส่งรายงาน",
              text: "การส่งรายงานเกิดความผิดพลาด",
              timer: 2000,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getallagency() {
      axios
        .get(process.env.VUE_APP_URL + "agency")
        .then((response) => {
          //handle success
          this.agencylist = response.data;

          for (let i = 0; i < this.agencylist.length; i++) {
            // date format
            this.agencylist[i].agency_created = new Date(
              this.agencylist[i].agency_created
            );
            this.agencylist[i].agency_created = this.agencylist[
              i
            ].agency_created.toLocaleDateString("th-TH", {
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

    editagency(agency_id) {
      this.$router.push("/AdminagencyEdit/" + agency_id);
    },

    deleteagency(agency_id, agency_name) {
      this.$swal({
        title: "ท่านแน่ใจหรือว่าต้องการจะลบหน่วยงาน?",
        icon: "warning",
        width: 600,
        showCancelButton: true,
        confirmButtonText: "ตกลง",
        cancelButtonText: "ยกเลิก",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(process.env.VUE_APP_URL + "agency/" + agency_id)
            .then((response) => {
              // handle success
              if (response.data == "ลบหน่วยงานสำเร็จ") {
                this.$swal({
                  icon: "success",
                  title: "ลบหน่วยงานสำเร็จ",
                  text: "ลบหน่วยงาน " + agency_name + " สำเร็จ",
                  timer: 2000,
                });
                this.$router.go();
              } else {
                this.$swal({
                  icon: "error",
                  title: "ลบหน่วยงานไม่สำเร็จ",
                  text: "เกิดข้อผิดพลาดในการลบหน่วยงาน",
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
