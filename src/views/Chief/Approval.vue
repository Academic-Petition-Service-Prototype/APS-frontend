<template>
  <!-- ส่วนจัดเเสดง -->
  <v-app>
    <NavbarChief />
    <v-card class="cardshow">
      <h1 >
        การอนุมัติ
        <v-divider></v-divider>
      </h1>
      
    </v-card>
    <!-- ส่วนจัดเเสดง -->
  </v-app>
</template>
<script>
import NavbarChief from "../../components/NavbarChief.vue";
export default {
  name: "Approval",
  components: {
    NavbarChief,
  },
  data() {
    return {
      detail: "",
    };
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  padding: 10px;
}
h2 {
  text-align: center;
  padding: 10px;
}
.cardshow {
  margin: 2%;
}
.box-margin{
  margin: 5%;
}
</style>
