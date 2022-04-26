<template>
  <div id="UserPetition" class="bg-color">
    <NavbarUser />
    <v-card class="cardmargin">
      <v-toolbar dark prominent color="#FFAB40">
        <h1 class="text-center pa-5">เลือกแบบคำร้อง</h1>
        <v-spacer></v-spacer>
      </v-toolbar>

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
            class="cardmargin"
          ></v-text-field>

          <h3 class="textleft">ค้นหาตามหมวดหมู่</h3>
          <v-select
            v-model="search"
            :items="tag"
            :item-text="(item) => item.tag_name"
            label="กรุณาเลือกหมวดหมู่"
            outlined
            class="cardmargin"
          ></v-select>
        </template>

        <template v-slot:default="prop">
          <v-container>
            <v-row>
              <v-col
                v-for="item in prop.items"
                :key="item.name"
                cols="12"
                md="4"
              >
                <v-item>
                  <v-card
                    dark
                    max-width="500"
                    :to="item.route"
                    @click="sentPetition(item.form_id)"
                    v-if="item.form_status == 1"
                  >
                    <v-img
                      src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
                      gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
                    >
                      <v-card-title>
                        {{ item.form_name }}
                      </v-card-title>
                      <v-divider class="mx-4"></v-divider>
                      <v-card-subtitle class="text-left">
                        {{ item.form_detail }}
                      </v-card-subtitle>
                      <v-card-actions class="justify-end">
                        <v-btn rounded color="warning">
                          {{ item.tag_name }}
                        </v-btn>
                      </v-card-actions>
                    </v-img>
                  </v-card>
                </v-item>
              </v-col>
            </v-row>
          </v-container>
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
      itemsPerPage: 5,
      sortBy: "name",
      keys: ["Name"],
      petitionList: [],
      tag: [],
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
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    },
    sentPetition(form_id) {
      this.$router.push("/UserSentpetition/" + form_id);
    },
    gettagsbyagency() {
      axios
        .post(process.env.VUE_APP_URL + "tagsbyagency", {
          agency_id: this.$store.getters.getUser.agencies_id,
        })
        .then((response) => {
          // handle success
          this.tag = response.data;
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    },
  },
  mounted() {
    this.getpetition();
    this.gettagsbyagency();
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
.textleft {
  text-align: left;
  margin: 2%;
}

.petitiontitle {
  padding: 0px 30px 0px 30px;
}
.bottom-gradient {
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.4) 0%,
    transparent 72px
  );
}

.repeating-gradient {
  background-image: repeating-linear-gradient(
    -45deg,
    rgba(255, 0, 0, 0.25),
    rgba(255, 0, 0, 0.25) 5px,
    rgba(0, 0, 255, 0.25) 5px,
    rgba(0, 0, 255, 0.25) 10px
  );
}
</style>
