<template>
  <!-- ส่วนจัดเเสดง -->
  <div id="ChiefApprovedlist" class="bg-color">
    <NavbarChief />
    <v-card class="cardshow">
      <v-toolbar dark prominent color="primary">
        <h1 class="text-center pa-5">คำร้องที่อนุมัติแล้ว</h1>

        <v-spacer></v-spacer>
      </v-toolbar>

      {{ petitionListById }}
      <br /><br /><br />
      {{ listapproval }}
      <v-data-iterator
        :items="listapproval"
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
                label="ชื่อคำร้อง"
                placeholder="ชื่อคำร้อง"
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
            <v-col class="h3"> ลำดับ </v-col>
            <v-col class="h3"> รายการ </v-col>
            <v-col class="h3"> ผู้ยื่นคำร้อง </v-col>
            <v-col class="h3"> วันที่ยื่นคำร้อง </v-col>
            <v-col class="h3"> สถานะ </v-col>
          </v-row>

          <v-row>
            <template v-for="(item, index) in props.items">
              <div :key="index">
                <v-card-title>
                  <v-row class="text-center" align="center">
                    <v-col> {{ index + 1 }} </v-col>
                    <v-col> {{ item.form_name }} </v-col>
                    <v-col> {{ item.fullname }}</v-col>
                    <v-col> {{ item.submit_date }} </v-col>

                    <v-col>
                      <v-btn
                        @click="selectApprovaldetaill(item.submit_id)"
                        color="#4CAF50"
                        class="text-white"
                      >
                        <template
                          v-for="(approval_order, n) in item.approval_order"
                        >
                          <!-- {{ item.approval_order[n].approver_name.user_id}} -->

                          <div
                            :key="n"
                            v-if="
                              item.approval_order[n].approver_name.user_id ==
                                stong
                            "
                          >
                            {{ item.approval_order[n].approver_state }}
                          </div>
                        </template>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card-title>
              </div>
            </template>

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
  <!-- ส่วนจัดเเสดง -->
</template>

<script>
import NavbarChief from "../../components/NavbarChief.vue";
import axios from "axios";
export default {
  name: "ChiefApprovedlist",
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
      itemsPerPage: 12,
      sortBy: "name",
      petitionListById: [],
      specifics: [],
      stong: this.$store.getters.getUser.user_id,
      listapproval: [],
    };
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.listapproval.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter((key) => key !== "Name");
    },
  },

  methods: {
    getpetition() {
      axios
        .post(process.env.VUE_APP_URL + "getsubmitforms", {
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

            console.log(this.petitionListById[i].form_name);
            console.log(this.stong);
            for (
              let j = 0;
              j < this.petitionListById[i].approval_order.length;
              j++
            ) {
              if (
                this.petitionListById[i].approval_order[j].approver_name
                  .user_id == this.$store.getters.getUser.user_id
              ) {
                if (
                  this.petitionListById[i].approval_order[j].approver_name
                    .user_id == this.$store.getters.getUser.user_id &&
                  this.petitionListById[i].approval_order[j].approver_state ==
                    "อนุมัติแล้ว"
                ) {
                  this.listapproval.push(this.petitionListById[i]);
                } else {
                  //   h
                }
              } else {
                console.log("error0.0");
              }
            }
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
      this.$router.push("/ViweApprovedlist/" + submit_id);
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
h5 {
  color: #f0f0f0;
}
</style>
