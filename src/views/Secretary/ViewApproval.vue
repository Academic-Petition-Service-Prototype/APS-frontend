<template>
  <!-- ส่วนจัดเเสดง -->
  <div id="SecretaryApproval">
    <NavbarSecretary />
    <v-card class="cardshow">
      <v-toolbar dark prominent color="#FFAB40">
        <h1>การอนุมัติคำร้อง</h1>

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
            <v-col> ลำดับ </v-col>
            <v-col> รายการ </v-col>
            <v-col> ผู้ยื่นคำร้อง </v-col>
            <v-col> วันที่ยื่นคำร้อง </v-col>
            <v-col> สถานะ </v-col>
          </v-row>

          <v-row v-for="item in props.items" :key="item.text">
            <v-card-title>
              <v-row class="text-center" align="center">
                <v-col> {{ item.submit_id }} </v-col>
                <v-col> {{ item.form_name }} </v-col>
                <v-col> {{ item.fullname }}</v-col>
                <v-col> {{ item.submit_date }} </v-col>

                <v-col>
                  <v-btn @click="selectApprovaldetaill(item.submit_id)">
                    <h4>
                      ดูรายละเอียด
                    </h4>
                  </v-btn>
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
    </v-card>
  </div>
  <!-- ส่วนจัดเเสดง -->
</template>

<script>
import NavbarSecretary from "../../components/NavbarSecretary.vue";
import axios from "axios";
export default {
  name: "SecretaryApproval",
  components: {
    NavbarSecretary,
  },
  data() {
    return {
      search: "",
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 4,
      sortBy: "name",
      petitionListById: [],
    };
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
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
    selectApprovaldetaill(submit_id) {
      this.$router.push("/ViewApprovaldetail/" + submit_id);
    },
  },

  mounted() {
    this.getpetition();
  },
};
</script>

<style scoped>
.cardmargin {
  margin: 2%;
}
h1 {
  font-size: 50px;
  padding: 2% 0% 0% 0%;
}
</style>
