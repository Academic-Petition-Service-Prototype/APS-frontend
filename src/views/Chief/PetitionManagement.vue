<template>
  <!-- ส่วนจัดเเสดง -->
  <div id="ChiefPetitionManagement">
    <NavbarChief />
    <v-card class="cardshow">
      <v-toolbar dark prominent color="primary">
        <h1>จัดการคำร้อง/ยื่นเรื่อง</h1>
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
          <v-row>
            <v-col align="right"
              ><v-btn
                color="success"
                style="margin: 10px 10px -25px 10px"
                to="/ChiefCreatepetition"
              >
                สร้างคำร้อง
              </v-btn></v-col
            >
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
            <v-col> สถานะ </v-col>
            <v-col> วันที่สร้าง </v-col>
            <v-col> Action </v-col>
          </v-row>

          <v-row v-for="item in props.items" :key="item.text">
            <v-card-title>
              <v-row class="text-center" align="center">
                <v-col> {{ item.form_id }} </v-col>
                <v-col> {{ item.form_name }} </v-col>
                <v-col>
                  <v-switch
                    inset
                    v-model="item.switch"
                    style="margin: 0px 0px 0px 40%;"
                  ></v-switch>
                </v-col>
                <v-col> <p>{{ item.created_date }}</p> </v-col>
                <v-col>
                  <v-btn icon><v-icon color="yellow">mdi-pencil</v-icon></v-btn>
                  <v-btn icon><v-icon color="red">mdi-delete</v-icon></v-btn>
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
      <!-- </v-container> -->
    </v-card>
  </div>
  <!-- ส่วนจัดเเสดง -->
</template>

<script>
import NavbarChief from "../../components/NavbarChief.vue";
import axios from "axios";
export default {
  name: "ChiefPetitionManagement",
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
      petitionList: [],

      items: [
        {
          no: "1",
          text: "ฟรอมที่ 1",
          agency: "ศึกษาทั่วไป",
          satatus: true,
          switch: false,
          datecreation: "6/12/2564",
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
h1 {
  font-size: 50px;
  padding: 2% 0% 0% 0%;
}
.cardshow {
  margin: 2%;
}
.btn-margin {
  margin: 3%;
}
</style>
