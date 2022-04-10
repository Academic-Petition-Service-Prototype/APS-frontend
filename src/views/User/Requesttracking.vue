<template>
  <div id="UserRequestTracking" class="bg-color">
    <NavbarUser />
    <!-- สถานะคำร้อง -->
    <v-card class="cardshow">
      <v-toolbar dark prominent color="#FFAB40">
        <h1 class="text-center pa-5">
          สถานะการร้องขอคำร้องเพิ่มเติม
        </h1>
        <v-spacer></v-spacer>
      </v-toolbar>

      <!-- ของรายงาน -->
      <v-data-iterator
        :items="requests"
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
            <v-col>
              <v-text-field
                prepend-inner-icon="mdi-magnify"
                label="ชื่อหัวข้อการร้องขอคำร้องเพิ่มเติม"
                placeholder="ชื่อหัวข้อการร้องขอคำร้องเพิ่มเติม"
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
            <v-col align="center" class="h3">ลำดับ</v-col>
            <v-col align="center" class="h3">รายการ</v-col>
            <v-col align="center" class="h3">วันที่ส่งคำร้อง</v-col>
          </v-row>

          <v-row
            v-for="(item, index) in props.items"
            :key="index"
            class="cardshow"
          >
            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-header color="#FFAB40">
                  <v-row class="text-center">
                    <v-col>
                      <h3>{{ index + 1 }}</h3>
                    </v-col>
                    <v-col>
                      <h4>{{ item.request_title }}</h4>
                    </v-col>
                    <v-col>
                      <h4>{{ item.request_created }}</h4>
                    </v-col>
                  </v-row>

                  <!-- เเสดงชื่อเอกสาร -->

                  <!-- เเสดงขั้นนตอน-->
                </v-expansion-panel-header>

                <v-expansion-panel-content>
                  <!-- เเสดงเนื้อหาข้างใน -->

                  <v-container id="inspire">
                    <v-stepper alt-labels v-model="item.request_state">
                      <v-stepper-header>
                        <v-stepper-step
                          :complete="item.request_state > 1"
                          step="1"
                          color="green"
                        >
                          ส่งยื่นคำร้อง
                        </v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step
                          :complete="item.request_state > 2"
                          step="2"
                          color="green"
                        >
                          รับคำร้องเข้าระบบ
                        </v-stepper-step>
                      </v-stepper-header>
                      <v-stepper-items>
                        <v-stepper-content step="1">
                          <v-card
                            class="mb-12"
                            color="grey lighten-2"
                            height="200px"
                          >
                            <h2 class="cardshow">รายละเอียด</h2>
                            <h5 class="cardshow">{{ item.request_detail }}</h5>
                          </v-card>
                        </v-stepper-content>

                        <v-stepper-content step="2">
                          <v-card
                            class="mb-12"
                            color="grey lighten-2"
                            height="200px"
                          >
                            <h2 class="cardshow">รายละเอียด</h2>
                            <h5 class="cardshow">{{ item.request_detail }}</h5>
                          </v-card>
                        </v-stepper-content>

                        <v-stepper-content step="3">
                          <v-card
                            class="mb-12"
                            color="grey lighten-2"
                            height="200px"
                          >
                            <h2 class="cardshow">รายละเอียด</h2>
                            <h5 class="cardshow">{{ item.request_detail }}</h5>
                          </v-card>
                        </v-stepper-content>
                      </v-stepper-items>
                    </v-stepper>
                  </v-container>

                  <!-- เเสดงเนื้อหาข้างใน -->
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
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
                color="#FFAB40"
                class="mr-1"
                @click="formerPage"
              >
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
              <v-btn
                fab
                dark
                icon
                color="#FFAB40"
                class="ml-1"
                @click="nextPage"
              >
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </template>
      </v-data-iterator>
      <!-- วนเเสดงรายการสถาณะเอสาร -->
    </v-card>
    <!-- ของรายงาน -->
  </div>
</template>

<script>
import NavbarUser from "../../components/NavbarUser.vue";
import axios from "axios";
export default {
  name: "UserRequestTracking",
  components: {
    NavbarUser,
  },
  data() {
    return {
      itemsPerPageArray: [4, 8, 12],
      search: "",
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 4,
      sortBy: "name",
      requests: [],
    };
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.requests.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter((key) => key !== "Name");
    },
    numberOfPagesrequest() {
      return Math.ceil(this.requests.length / this.itemsPerPage);
    },
    filteredKeysrequest() {
      return this.keys.filter((key) => key !== "Name");
    },
  },
  methods: {
    getrequest() {
      axios
        .post(process.env.VUE_APP_URL + "agencyrequests", {
          agency_id: this.$store.getters.getUser.agencies_id,
        })
        .then((response) => {
          // handle success
          this.requests = response.data;
          for (let i = 0; i < this.requests.length; i++) {
            if (this.requests[i].request_state == "read") {
              this.requests[i].request_state = 3;
            } else {
              this.requests[i].request_state = 1;
            }

            // date format
            this.requests[i].request_created = new Date(
              this.requests[i].request_created
            );
            this.requests[i].request_created = this.requests[
              i
            ].request_created.toLocaleDateString("th-TH", {
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
    this.getrequest();
  },
};
</script>

<style scoped>
.bg-color {
  background: #f0f0f0;
  height: 100%;
}

.cardshow {
  margin: 2%;
}
h1 {
  font-size: 50px;
  padding: 2% 0% 0% 0%;
}
h3 {
  color: #f0f0f0;
}
h4 {
  color: #f0f0f0;
}
</style>
