<template>
  <div id="UserPetition" class="bg-color">
    <NavbarUser />
    <v-card class="cardmargin">
      <h1>
        เลือกแบบคำร้อง / ยื่นเรื่อง
        <v-divider></v-divider>
      </h1>

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
            class="cardshow magintextfind "
          ></v-text-field>
        </template>

        <template v-slot:default="name">
          <v-row
            v-for="item in name.items"
            :key="item.name"
            router
            :to="item.route"
            style="padding: 0px 30px 0px 30px ;"
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
          route: "/Sentpentition",
          icon: "file-document-outline",
          detail: "ส่งความก้าวหน้าการทำโครงการ",
        },
        {
          name: "Ice cream sandwich",
          route: "/Sentpentition",
          icon: "file-document-outline",
          detail: "ส่งความก้าวหน้าการทำโครงการ",
        },
        {
          name: "Eclair",
          route: "/Sentpentition",
          icon: "file-document-outline",
          detail: "ส่งความก้าวหน้าการทำโครงการ",
        },
        {
          name: "Cupcake",
          route: "/Sentpentition",
          icon: "file-document-outline",
          detail: "ส่งความก้าวหน้าการทำโครงการ",
        },
        {
          name: "Gingerbread",
          route: "/Sentpentition",
          icon: "file-document-outline",
          detail: "ส่งความก้าวหน้าการทำโครงการ",
        },
      ],
    };
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
</style>
