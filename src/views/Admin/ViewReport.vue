<template>
  <div id="SecretaryReport" class="bg-color">
    <NavbarAdmin />
    <v-card class="cardshow">
      <v-toolbar dark prominent color="#00B8D4">
        <h1 class="text-center pa-5">การรายงานปัญหาทั้งหมด</h1>
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
            <v-col align="right"></v-col>
          </v-row>
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

            <v-col> วันที่สร้าง </v-col>
            <v-col> สถานะ </v-col>
          </v-row>

          <v-row v-for="item in props.items" :key="item.text">
            <v-card-title>
              <v-row class="text-center" align="center">
                <v-col> {{ item.report_id }} </v-col>
                <v-col> {{ item.report_title }} </v-col>

                <v-col>
                  <p>{{ item.report_created }}</p>
                </v-col>
                <v-col>
                  <v-btn
                    disabled
                    small
                    class="mr-2"
                    @click="chageState(item.report_id)"
                  >
                    {{ item.report_state }}
                  </v-btn>
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
    </v-card>
  </div>
</template>

<script>
import NavbarAdmin from "../../components/NavbarAdmin.vue";
import axios from "axios";
export default {
  name: "AdminReport",
  components: {
    NavbarAdmin,
  },
  data() {
    return {
      vitemsPerPageArray: [4, 8, 12],
      search: "",
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 4,
      sortBy: "name",
      reports: [],
    };
  },
  mounted() {
    this.getreport();
  },

  methods: {
    getreport() {
      axios
        .get(process.env.VUE_APP_URL + "reports")
        .then((response) => {
          // handle success
          this.reports = response.data;
          for (let i = 0; i < this.reports.length; i++) {
            // date format
            this.reports[i].report_created = new Date(
              this.reports[i].report_created
            );
            this.reports[i].report_created = this.reports[
              i
            ].report_created.toLocaleDateString("th-TH", {
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
