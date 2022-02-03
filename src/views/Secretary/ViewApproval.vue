<template>
  <div id="ChiefReport">
    <NavbarSecretary />
    <v-card class="cardmargin">
      
       <v-toolbar dark prominent color="#FFAB40">
        <h1 class="text-center pa-5">การอนุมัติ</h1>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-row>
        <v-col align="center" v-if="reports.length">
          <v-btn width="150" height="50">
            <v-icon>mdi-account</v-icon>
            <div class="title">{{ reports.length }}</div>
          </v-btn>
        </v-col>
      </v-row>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        >
        </v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="reports" :search="search">
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn small class="mr-2" @click="chageState(item.id)" disabled>
            {{ item.report_state }}
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import NavbarSecretary from "../../components/NavbarSecretary.vue";
import axios from "axios";
export default {
  name: "Approval",
  components: {
    NavbarSecretary,
  },
  data() {
    return {
      search: "",
      headers: [
        {
          text: "ลำดับ",
          align: "start",
          value: "id",
          width: 100,
        },
        { text: "รายการ", width: 500, value: "report_title" },

        { text: "สถานะ", width: 200, value: "actions" },
      ],
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
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    },
    chageState(id) {
      console.log(id);
      axios
        .put(process.env.VUE_APP_URL + "reports", {
          id: id,
        })
        .then(() => {
          // handle success
          this.$router.push("/Approvaldetaill/" + id);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.cardmargin {
  margin: 2%;
}
</style>

