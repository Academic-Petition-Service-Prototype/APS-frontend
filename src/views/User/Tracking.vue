<template>
  <div id="UserTracking" class="bg-color">
    <NavbarUser />
    <!-- สถานะคำร้อง -->
    <v-card class="cardshow">
      <v-toolbar dark prominent color="#FFAB40">
        <h1
          class="text-center pa-5"
          style="font-size: 50px; padding: 2% 0% 0% 0%"
        >
          สถานะคำร้อง
        </h1>
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
            <v-col> <h3>ลำดับ</h3></v-col>

            <v-col align="left"> <h3>รายการ</h3></v-col>
          </v-row>

          <v-row
            v-for="item in props.items"
            :key="item.title"
            class="cardshow text-center "
          >
            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <v-row class="text-center">
                    <v-col>
                      <h3>{{ item.submit_id }}</h3>
                    </v-col>
                    <v-col>
                      <h4>{{ item.form_name }}</h4>
                    </v-col>
                  </v-row>

                  <!-- เเสดงชื่อเอกสาร -->
                  <v-spacer></v-spacer>

                  <!-- เเสดงขั้นนตอน-->
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <!-- เเสดงเนื้อหาข้างใน -->

                  <v-container id="inspire">
                    <v-stepper alt-labels v-model="item.submit_state">
                      <v-stepper-header>
                        <v-divider></v-divider>

                        <template v-for="(approval_order,n) in item.approval_order"
                           >
                          <v-stepper-step
                          :key="approval_order"
                          :complete="item.submit_state > n + 1"
                          :step="n + 1"
                          color="green"
                        >
                         
                        </v-stepper-step>
                         <v-divider :key="approval_order" ></v-divider>
                        </template>

                        

                       

                        <!-- <v-stepper-step
                          :complete="item.submit_state > 2"
                          step="2"
                          color="green"
                        >
                          รับคำร้องเข้าระบบ
                        </v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step
                          :complete="item.submit_state > 3"
                          step="3"
                          color="green"
                        >
                          การอนุมัติคำร้อง
                        </v-stepper-step>

                        <v-divider></v-divider> -->

                        <!-- <v-stepper-step
                          :complete="item.submit_state > 4"
                          step="4"
                          color="green"
                        >
                          ยื่นคำร้องสำเร็จ
                        </v-stepper-step> -->
                      </v-stepper-header>
                      <v-stepper-items>
                        <v-stepper-content step="1">
                          <v-card
                            class="mb-12"
                            color="grey lighten-1"
                            height="200px"
                          >
                            <h2 class="cardshow">รายละเอียด</h2>
                            
                          </v-card>
                        </v-stepper-content>

                        <v-stepper-content step="2">
                          <v-card
                            class="mb-12"
                            color="grey lighten-1"
                            height="200px"
                          >
                            <h2 class="cardshow">รายละเอียด</h2>
                          </v-card>
                        </v-stepper-content>

                        <v-stepper-content step="3">
                          <v-card
                            class="mb-12"
                            color="grey lighten-1"
                            height="200px"
                          >
                            <h2 class="cardshow">รายละเอียด</h2>
                          </v-card>
                        </v-stepper-content>

                        <v-stepper-content step="4">
                          <v-card
                            class="mb-12"
                            color="grey lighten-1"
                            height="200px"
                          >
                            <h2 class="cardshow">รายละเอียด</h2>
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
    <!-- สถานะคำร้อง -->

    <!-- ของรายงาน -->
    <v-card class="cardshow">
      <v-toolbar dark prominent color="#FFAB40">
        <h1 class="text-center pa-5">สถานะการรายงานปัญหาแบบไม่ระบุตัวตน</h1>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-data-iterator
        :items="reports"
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
              <template v-if="$vuetify.breakpoint.mdAndUp"> </template>
            </v-col>
          </v-row>
        </template>
        <template v-slot:default="props">
          <v-row class="text-center">
            <v-col> ลำดับ </v-col>
            <v-col> รายการ </v-col>
            <v-col> </v-col>
          </v-row>

          <v-row v-for="item in props.items" :key="item.title" class="cardshow">
            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <v-row class="text-center">
                    <v-col> {{ item.report_id }} </v-col>
                    <v-col> {{ item.report_title }} </v-col>
                    <v-col> </v-col>
                  </v-row>

                  <!-- เเสดงชื่อเอกสาร -->
                  <v-spacer></v-spacer>

                  <!-- เเสดงขั้นนตอน-->
                </v-expansion-panel-header>

                <v-expansion-panel-content>
                  <!-- เเสดงเนื้อหาข้างใน -->

                  <v-container id="inspire">
                    <v-stepper alt-labels v-model="item.report_state">
                      <v-stepper-header>
                        <v-stepper-step
                          :complete="item.report_state > 1"
                          step="1"
                          color="green"
                        >
                          ส่งยื่นคำร้อง
                        </v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step
                          :complete="item.report_state > 2"
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
                            color="grey lighten-1"
                            height="200px"
                          >
                            <h2 class="cardshow">รายละเอียด1</h2>
                            <h2 class="cardshow">{{item.report_detail}}</h2>
                          </v-card>
                        </v-stepper-content>

                        <v-stepper-content step="2">
                          <v-card
                            class="mb-12"
                            color="grey lighten-1"
                            height="200px"
                          >
                            <h2 class="cardshow">รายละเอียด2</h2>
                            <h2 class="cardshow">{{item.report_detail}}</h2>
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
  name: "UserTracking",
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

      petitionListById: [
        
      ],
      reports: [],
    };
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.petitionListById.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter((key) => key !== "Name");
    },
    numberOfPagesreport() {
      return Math.ceil(this.reports.length / this.itemsPerPage);
    },
    filteredKeysreport() {
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
    getreport() {
      axios
        .post(process.env.VUE_APP_URL + "agencyreports",{
          agency_id: this.$store.getters.getUser.agencies_id
        })
        .then((response) => {
          // handle success
          this.reports = response.data;
          for (let i = 0; i < this.reports.length; i++) {
            if (this.reports[i].report_state == 'read') {
              this.reports[i].report_state = 3
            } else {
              this.reports[i].report_state = 1
            }
            
          }
          console.log(response.data)
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
    this.getpetition();
    this.getreport();
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
</style>
