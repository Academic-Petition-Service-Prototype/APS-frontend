<template>
  <div id="ChiefTracking" class="bg-color">
    <NavbarChief />
    <v-card class="cardshow">
      <v-toolbar dark prominent color="#FFAB40">
        <h1 class="text-center pa-5">สถานะคำร้อง</h1>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-data-iterator
        :items="listtracking"
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
            <v-col> ลำดับ </v-col>
            <v-col> รายการ </v-col>
            <v-col> </v-col>
          </v-row>

          <v-row v-for="item in props.items" :key="item.title" class="cardshow">
            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <v-row class="text-center">
                    <v-col> {{ item.num }} </v-col>
                    <v-col> {{ item.title }} </v-col>
                    <v-col> </v-col>
                  </v-row>

                  <!-- เเสดงชื่อเอกสาร -->
                  <v-spacer></v-spacer>

                  <!-- เเสดงขั้นนตอน-->
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <!-- เเสดงเนื้อหาข้างใน -->

                  <v-container id="inspire">
                    <v-stepper alt-labels v-model="item.checktracking">
                      <v-stepper-header>
                        <v-stepper-step
                          :complete="item.checktracking > 1"
                          step="1"
                          color="green"
                        >
                          ส่งยื่นคำร้อง
                        </v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step
                          :complete="item.checktracking > 2"
                          step="2"
                          color="green"
                        >
                          รับคำร้องเข้าระบบ
                        </v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step
                          :complete="item.checktracking > 3"
                          step="3"
                          color="green"
                        >
                          การอนุมัติคำร้อง
                        </v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step
                          :complete="item.checktracking > 4"
                          step="4"
                          color="green"
                        >
                          ยื่นคำร้องสำเร็จ
                        </v-stepper-step>
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
                color="blue darken-3"
                class="mr-1"
                @click="formerPage"
              >
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
              <v-btn
                fab
                dark
                color="blue darken-3"
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
import NavbarChief from "../../components/NavbarChief.vue";
export default {
  name: "ChiefTracking",
  components: {
    NavbarChief,
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
      listtracking: [
        {
          num: 1,
          title: "เอกสารที่1",
          pointracking: 6,
          checktracking: 3,
          e1: 1,
        },
        {
          num: 2,
          title: "เอกสารที่2",
          pointracking: 2,
          checktracking: 3,
          e1: 1,
        },
        {
          num: 3,
          title: "เอกสารที่2",
          pointracking: 2,
          checktracking: 1,
          e1: 1,
        },
      ],
    };
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.listtracking.length / this.itemsPerPage);
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
</style>
