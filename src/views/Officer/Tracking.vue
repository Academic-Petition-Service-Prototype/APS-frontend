<template>
  <div id="ChiefTracking" class="bg-color">
    <NavbarOF />
    <v-card class="cardshow">
      <v-toolbar dark prominent color="#6c757d">
        <h1 class="text-center pa-5">สถานะคำร้อง</h1>
        <v-spacer></v-spacer>
      </v-toolbar>
      
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
                label="ชื่อคำร้อง / ยื่นเรื่อง"
                placeholder="ชื่อคำร้อง / ยื่นเรื่อง"
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
            <v-col align="center"> <p>ลำดับ</p></v-col>

            <v-col align="center"> <p>รายการ</p></v-col>
            <v-col align="center"> <p>เวลา</p></v-col>
          </v-row>

          <v-row
            v-for="item in props.items"
            :key="item.title"
            class="cardshow text-center "
          >
            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-header color="#6c757d">
                  <v-row class="text-center">
                    <v-col >
                      <h3>{{ item.submit_id }}</h3>
                    </v-col>
                    <v-col>
                      <h4>{{ item.form_name }}</h4>
                    </v-col>
                    <v-col>
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
                          :complete="item.submit_state > item.approval_order.length"
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
                              color="grey lighten-1"
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
      itemsPerPageArray: [4, 8, 12],
      search: "",
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 4,
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
        .post(process.env.VUE_APP_URL + "getsubmitformsbyagency", {
          agency_id: this.$store.getters.getUser.agencies_id,
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
h3{
  color: #f0f0f0;
}
h4{
  color: #f0f0f0;
}
</style>
