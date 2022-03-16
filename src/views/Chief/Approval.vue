<template>
  <div id="ChiefApproval">
    <NavbarChief />
    <v-card class="cardmargin">
      <v-toolbar dark prominent color="#FFAB40">
        <h1 class="text-center pa-5">การอนุมัติ</h1>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-row>
        <v-col align="center" v-if="petitionList.length">
          <v-btn width="150" height="50">
            <v-icon>mdi-account</v-icon>
            <div class="title">{{ petitionList.length }}</div>
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
      <v-data-table :headers="headers" :items="petitionList" :search="search">
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn small class="mr-2" @click="chageState(item.id)">
            {{ item.report_state }}
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import NavbarChief from "../../components/NavbarChief.vue";
import axios from "axios";
export default {
  name: "ChiefApproval",
  components: {
    NavbarChief,
  },
  data() {
    return {
      search: "",
      headers: [
        {
          text: "ลำดับ",
          align: "start",
          value: "submit_id",
          width: 100,
        },
        { text: "รายการ", width: 300, value: "form_name" },
        { text: "ผู้ยื่นคำร้อง", width: 500, value: "fullname" },
        {
          text: "สถานะ",
          width: 200,
          value: "approval_order.approver_state[0]",
        },
      ],
      petitionList: [],
    };
  },

  methods: {
    getpetition() {
      axios
        .post(process.env.VUE_APP_URL + "getsubmitforms", {
          user_id: this.$store.getters.getUser.user_id,
        })
        .then((response) => {
          // handle success
          this.petitionList = response.data;
          console.log(response.data);
          console.log(this.petitionList);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    },
    // chageState(id) {
    //   console.log(id);
    //   axios
    //     .put(process.env.VUE_APP_URL + "petitionList", {
    //       id: id,
    //     })
    //     .then(() => {
    //       // handle success
    //       this.$router.push("/Approvaldetaill/" + id);
    //     })
    //     .catch((error) => {
    //       // handle error
    //       console.log(error);
    //     });
    // },
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
