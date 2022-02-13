<template>
  <div id="UserPetition" class="bg-color">
    <NavbarUser />
    <v-card class="cardmargin">
      <v-toolbar dark prominent color="#FFAB40">
        <h1>เลือกแบบคำร้อง / ยื่นเรื่อง</h1>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-data-iterator
        :items="items"
        :items-per-page.sync="itemsPerPage"
        :page.sync="page"
        :search="search"
        :sort-by="sortBy.toLowerCase()"
        :sort-desc="sortDesc"
        hide-default-footer
      >
        <template v-slot:header>
          <v-text-field
            v-model="search"
            dense
            filled
            rounded
            label="ค้นหาเอกสาร"
            class="cardshow magintextfind"
          ></v-text-field>
        </template>

        <template v-slot:default="name">
          <v-row
            v-for="item in name.items"
            :key="item.name"
            router
            :to="item.route"
            style="padding: 0px 30px 0px 30px"
          >
            <v-col align="">
              <v-btn outlined block height="100" router :to="item.route">
                <v-row>
                  <v-col align="center">
                    <h2>{{ item.name }}</h2>
                    <h2>{{ item.detail }}</h2>
                  </v-col>
                </v-row>
              </v-btn>
            </v-col>
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
    </v-card>
  </div>
</template>

<script>
import NavbarUser from "../../components/NavbarUser.vue";
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
      items: [
        {
          name: "เอกสารความกก้าวหน้า",
          route: "/UserSentpetition",
          icon: "file-document-outline",
          detail: "ส่งความก้าวหน้าการทำโครงการ",
        },
        {
          name: "Ice cream sandwich",
          route: "/UserSentpetition",
          icon: "file-document-outline",
          detail: "ส่งความก้าวหน้าการทำโครงการ",
        },
        {
          name: "Eclair",
          route: "/UserSentpetition",
          icon: "file-document-outline",
          detail: "ส่งความก้าวหน้าการทำโครงการ",
        },
        {
          name: "Cupcake",
          route: "/UserSentpetition",
          icon: "file-document-outline",
          detail: "ส่งความก้าวหน้าการทำโครงการ",
        },
        {
          name: "Gingerbread",
          route: "/UserSentpetition",
          icon: "file-document-outline",
          detail: "ส่งความก้าวหน้าการทำโครงการ",
        },
      ],
    };
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
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
</style>
