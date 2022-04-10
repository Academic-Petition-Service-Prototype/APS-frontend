<template>
  <div id="ChiefRequest" class="bg-color">
    <NavbarChief />
    <v-card class="cardshow">
      <v-toolbar dark prominent color="primary">
        <h1 class="text-center pa-5">การร้องขอคำร้องเพิ่มเติม</h1>
        <v-spacer></v-spacer>
      </v-toolbar>

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
            <v-col class="h3">ลำดับ</v-col>
            <v-col class="h3">รายการ</v-col>
            <v-col class="h3">วันที่ส่งการร้องขอ</v-col>
            <v-col class="h3">สถานะ</v-col>
          </v-row>

          <v-row v-for="(item, index) in props.items" :key="index">
            <v-card-title>
              <v-row class="text-center" align="center">
                <v-col> {{ index + 1 }} </v-col>
                <v-col> {{ item.request_title }} </v-col>

                <v-col>
                  <p>{{ item.request_created }}</p>
                </v-col>
                <v-col>
                  <v-btn @click="chageState(item.request_id)">
                    <div v-if="item.request_state == 'read'">
                      อ่านเเล้ว
                    </div>

                    <div v-if="item.request_state == 'unread'">
                      ยังไม่ได้อ่าน
                    </div>
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
    </v-card>
  </div>
</template>

<script>
import NavbarChief from "../../components/NavbarChief.vue";
import axios from "axios";
export default {
  name: "ChiefRequest",
  components: {
    NavbarChief,
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
      requests: [],
    };
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
    chageState(request_id) {
      axios
        .put(process.env.VUE_APP_URL + "requests", {
          id: request_id,
        })
        .then(() => {
          // handle success
          this.$router.push("/ChiefRequestDetail/" + request_id);
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
</style>
