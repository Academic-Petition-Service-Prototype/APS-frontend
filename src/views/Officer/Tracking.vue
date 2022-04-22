<template>
  <div id="OfficerTracking" class="bg-color">
    <NavbarOF />
    <v-card class="cardshow">
      <v-toolbar dark prominent color="#6c757d">
        <h1 class="text-center pa-5">สถานะคำร้อง</h1>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-container>
        <v-data-iterator
          :items="petitionListById"
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
              <v-col class="h3" md="5">รายการ</v-col>
              <v-col class="h3" md="3">ผู้ส่งคำร้อง</v-col>
              <v-col class="h3" md="4">วันที่ส่งคำร้อง</v-col>
            </v-row>

            <v-row
              v-for="(item, index) in props.items"
              :key="index"
              class="cardshow text-center "
            >
              <v-expansion-panels>
                <v-expansion-panel>
                  <v-expansion-panel-header color="#6c757d">
                    <v-row class="text-center">
                      <v-col md="5">
                        <h4>{{ item.form_name }}</h4>
                      </v-col>
                      <v-col md="3">
                        <h4>{{ item.fullname }}</h4>
                      </v-col>
                      <v-col md="4">
                        <h4>{{ item.submit_date }}</h4>
                      </v-col>
                    </v-row>

                    <!-- เเสดงชื่อเอกสาร -->

                    <!-- เเสดงขั้นนตอน-->
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <!-- เเสดงเนื้อหาข้างใน -->

                    <v-container id="inspire">
                      <v-stepper alt-labels v-model="item.submit_state">
                        <v-stepper-header>
                          <v-divider></v-divider>
                          <v-stepper-step
                            :complete="item.submit_state >= 1"
                            step=""
                            color="green"
                          >
                            รับเรื่องคำร้องเเล้ว
                          </v-stepper-step>
                          <v-divider></v-divider>

                          <template
                            v-for="(approval_order, n) in item.approval_order"
                          >
                            <v-stepper-step
                              :key="n"
                              :complete="item.submit_state > n + 1"
                              step=""
                              color="green"
                            >
                              {{ item.approval_order[n].approver_name.f_name }}

                              {{ item.approval_order[n].approver_name.l_name }}
                            </v-stepper-step>
                            <v-divider :key="approval_order"></v-divider>
                          </template>

                          <v-stepper-step
                            :complete="
                              item.submit_state > item.approval_order.length
                            "
                            step=""
                            color="green"
                          >
                            ยื่นคำร้องสำเร็จ
                          </v-stepper-step>
                          <v-divider></v-divider>
                        </v-stepper-header>
                        <v-stepper-items>
                          <template
                            v-for="(approval_order, n) in item.approval_order"
                          >
                            <v-stepper-content
                              :step="n + 2"
                              :key="approval_order"
                            >
                              <v-card
                                class="mb-12"
                                color="grey lighten-2"
                                height="200px"
                              >
                                <h2 class="cardshow">รายละเอียด</h2>
                                <p v-if="item.submit_refuse === null">
                                  กำลังดำเนิการ
                                </p>
                                <p v-if="item.submit_refuse !== null">
                                  {{ item.submit_refuse }}
                                </p>
                              </v-card>
                            </v-stepper-content>
                          </template>
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
      <!-- วนเเสดงรายการสถาณะเอสาร -->
    </v-card>
  </div>
</template>

<script>
import NavbarOF from "../../components/NavbarOfficer.vue";
import axios from "axios";
export default {
  name: "OfficerTracking",
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
      petitionListById: [],
    };
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.petitionListById.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter((key) => key !== "Name");
    },
  },
  methods: {
    getpetition() {
      axios
        .post(process.env.VUE_APP_URL + "getsubmitformsbyofficer", {
          user_id: this.$store.getters.getUser.user_id,
        })
        .then((response) => {
          //handle success

          // approval_order
          this.petitionListById = response.data;
          for (let i = 0; i < this.petitionListById.length; i++) {
            this.tmp = JSON.stringify(this.petitionListById[i].approval_order);
            this.tmp = this.tmp.replace(/\\/g, "");
            this.specifics = this.tmp.replace(/\\/g, "");

            var temp = this.specifics.slice(1, -1);
            temp = JSON.parse(temp);
            this.petitionListById[i].approval_order = temp;
            // date format
            this.petitionListById[i].submit_date = new Date(
              this.petitionListById[i].submit_date
            );
            this.petitionListById[i].submit_date = this.petitionListById[
              i
            ].submit_date.toLocaleDateString("th-TH", {
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

    stepComplete(step) {
      return this.curr > step;
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
    this.getpetition();
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
