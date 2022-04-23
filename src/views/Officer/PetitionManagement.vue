<template>
  <!-- ส่วนจัดเเสดง -->
  <div id="OfficerPetitionManagement">
    <NavbarOF />
    <v-card class="cardshow">
      <v-toolbar dark prominent color="#6c757d">
        <h1 class="text-center pa-5">จัดการคำร้อง</h1>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-container>
        <v-data-iterator
          :items="petitionList"
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
                  to="/OfficerCreatepetition"
                >
                  สร้างคำร้อง
                </v-btn></v-col
              >
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  prepend-inner-icon="mdi-magnify"
                  label="รายการคำร้อง / วันที่"
                  placeholder="รายการคำร้อง / วันที่"
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
              <v-col class="h3" md="4">รายการ</v-col>
              <v-col class="h3" md="3">เปิด/ปิดคำร้อง</v-col>
              <v-col class="h3" md="3">วันที่สร้างคำร้อง</v-col>
              <v-col class="h3" md="2">การกระทำ</v-col>
            </v-row>

            <v-row v-for="(item, index) in props.items" :key="index">
              <v-card-title>
                <v-row class="text-center" align="center">
                  <v-col md="4"> {{ item.form_name }} </v-col>
                  <v-col md="3">
                    <v-switch
                      inset
                      v-model="item.form_status"
                      @click="
                        chagestatusform(
                          item.form_id,
                          item.form_status,
                          item.form_name
                        )
                      "
                      style="margin: 0px 0px 0px 40%"
                    ></v-switch>
                  </v-col>
                  <v-col md="3">
                    <p>{{ item.created_date }}</p>
                  </v-col>
                  <v-col md="2">
                    <v-btn icon
                      ><v-icon color="yellow">mdi-pencil</v-icon></v-btn
                    >
                    <v-btn icon><v-icon color="red">mdi-delete</v-icon></v-btn>
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
                  color="#6c757d"
                  class="mr-1"
                  @click="formerPage"
                >
                  <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
                <v-btn
                  fab
                  dark
                  icon
                  color="#6c757d"
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
    </v-card>
  </div>
  <!-- ส่วนจัดเเสดง -->
</template>

<script>
import NavbarOF from "../../components/NavbarOfficer.vue";
import axios from "axios";
export default {
  name: "OfficerPetitionManagement",
  components: {
    NavbarOF,
  },
  data() {
    return {
      search: "",
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 5,
      sortBy: "name",
      petitionList: [],
    };
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
    getpetition() {
      axios
        .post(process.env.VUE_APP_URL + "getforms", {
          user_id: this.$store.getters.getUser.user_id,
          role: this.$store.getters.getUser.role,
          agency: this.$store.getters.getUser.agency_name,
        })
        .then((response) => {
          // handle success
          this.petitionList = response.data;
          for (let i = 0; i < this.petitionList.length; i++) {
            // date format
            this.petitionList[i].created_date = new Date(
              this.petitionList[i].created_date
            );
            this.petitionList[i].created_date = this.petitionList[
              i
            ].created_date.toLocaleDateString("th-TH", {
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
    chagestatusform(form_id, form_status, form_name) {
      axios
        .put(process.env.VUE_APP_URL + "changestatusforms", {
          form_id: form_id,
          form_status: form_status,
        })
        .then((response) => {
          // handle success
          if (response.data == "Change state success") {
            this.$swal({
              icon: "success",
              title: "เปลี่ยนสถานะคำร้องสำเร็จ",
              text: "เปลี่ยนสถานะคำร้อง" + form_name + "สำเร็จ ",
              timer: 2000,
            });
          } else {
            this.$swal({
              icon: "error",
              title: "เปลี่ยนสถานะคำร้องไม่สำเร็จ",
              text: "เกิดข้อผิดพลาดในการเปลี่ยนสถานะ",
              timer: 2000,
            });
            this.$router.push("/OfficerPetitionManagement");
          }
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    },
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.petitionList.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter((key) => key !== "Name");
    },
  },
  mounted() {
    this.getpetition();
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
