<template>
  <div id="UserPetition" class="bg-color">
    <NavbarUser />
    <v-card class="cardmargin">
      <v-toolbar dark prominent color="#FFAB40">
        <h1>เลือกแบบคำร้อง / ยื่นเรื่อง</h1>
        <v-spacer></v-spacer>
      </v-toolbar>
        <!-- {{petitionList}} -->
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
          <v-text-field
            v-model="search"
            dense
            filled
            rounded
            label="ค้นหาคำร้อง"
            clearable
            class="cardmargin "
          ></v-text-field>

          <h3 class="textleft">ค้นหาตามหมวดหมู่</h3>
          <v-select
          v-model="search"
          :items="form_tag"
          label="กรุณาเลือกหมวดหมู่"
          outlined
          class="cardmargin "
        ></v-select>
        </template>

        <template v-slot:default="prop">
          <v-container>
            <v-row>
              <v-col align="left">
                <h2>แนะนำสำหรับท่าน</h2>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                v-for="item in prop.items"
                :key="item.name"
                cols="12"
                md="6"
              >
                <v-item>
                  <v-card
                    class="d-flex align-center"
                    dark
                    height="200"
                    :to="item.route"
                    @click="sentPetition(item.form_id)"
                    v-if="item.form_status == 'active'"
                  >
                    <v-row>
                      <v-col align="center">
                        <h2>{{ item.form_name }}</h2>
                        <h5>{{ item.form_detail }}</h5>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-item>
              </v-col>
            </v-row>
          </v-container>
          <template v-if="search == ''">
            <v-stepper v-model="e1" class="cardmargin">
              <v-toolbar dark prominent color="#FFAB40">
                <h1>แบบคำร้องที่ยอดนิยม</h1>
                <v-spacer></v-spacer>
              </v-toolbar>

              <v-stepper-items>
                <v-stepper-content step="1">
                  <v-card class="mb-12" height="500px">
                    <v-row>
                      <v-col
                        v-for="item in prop.items"
                        :key="item.name"
                        class=" petitiontitle"
                        cols="12"
                        md="4"
                      >
                        <v-btn
                          v-if="item.form_status == 'active'"
                          block
                          dark
                          height="150"
                          router
                          :to="item.route"
                          @click="sentPetition(item.form_id)"
                        >
                          <v-row>
                            <v-col align="center">
                              <h2>{{ item.form_name }}</h2>
                              <h5>{{ item.form_detail }}</h5>
                            </v-col>
                          </v-row>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>
          </template>
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
</template>

<script>
import NavbarUser from "../../components/NavbarUser.vue";
import axios from "axios";
export default {
  name: "UserPetition",
  components: {
    NavbarUser,
  },
  data() {
    return {
      search: "",
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 4,
      sortBy: "name",
      keys: ["Name"],
      petitionList: [],
      e1: 1,
      form_tag: [],
    };
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.petitionList.length / this.itemsPerPage);
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

            this.form_tag.push(this.petitionList[i].form_tag)
            
          }

        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    },
    sentPetition(form_id) {
      this.$router.push("/UserSentpetition/" + form_id);
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
.cardmargin {
  margin: 2%;
}
.magintextfind {
  padding: 2%;
}
h1 {
  font-size: 50px;
  padding: 2% 0% 0% 0%;
  
}
.textleft{
  text-align: left;
  margin: 2%;

}

.petitiontitle {
  padding: 0px 30px 0px 30px;
}
</style>
