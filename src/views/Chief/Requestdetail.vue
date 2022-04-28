<template>
  <div id="ChiefRequestDetail">
    <NavbarChief />
    <v-card class="cardmargin">
      <v-toolbar dark prominent color="primary">
        <h1>รายละเอียดการร้องขอคำร้องเพิ่มเติม</h1>
      </v-toolbar>
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-card outlined class="p-4 ">
                <h3 class="text-center">{{ request_title }}</h3>
                <v-divider></v-divider>
                <p class="h5">{{ request_detail }}</p>
                <p class="h6 text-right">
                  วันที่ส่งการร้องขอ
                </p>
                <p class="h6 text-right">
                  {{ request_created }}
                </p>
              </v-card>
            </v-col>
            <v-col cols="12" class="text-center">
              <v-btn dark x-large color="#3F3F3F" @click="back">
                ย้อนกลับ
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </div>
</template>
<script>
import NavbarChief from "../../components/NavbarChief.vue";
import axios from "axios";
export default {
  name: "ChiefRequestDetail",
  components: {
    NavbarChief,
  },
  data() {
    return {
      request_title: "",
      request_detail: "",
      request_created: "",
    };
  },
  methods: {
    back() {
      this.$router.push("/ChiefRequest");
    },
    getrequestbyid() {
      axios
        .get(process.env.VUE_APP_URL + "requests/" + this.$route.params.id)
        .then((response) => {
          // handle success
          this.request_title = response.data.request_title;
          this.request_detail = response.data.request_detail;
          this.request_created = response.data.request_created;
          this.request_created = new Date(this.request_created);
          this.request_created = this.request_created.toLocaleDateString(
            "th-TH",
            {
              hour: "numeric",
              minute: "numeric",
              year: "numeric",
              month: "long",
              day: "numeric",
              weekday: "long",
            }
          );
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    },
  },
  mounted() {
    this.getrequestbyid();
  },
};
</script>

<style scoped>
.cardmargin {
  margin: 2%;
}
</style>
