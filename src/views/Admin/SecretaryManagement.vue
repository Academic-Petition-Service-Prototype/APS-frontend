<template>
  <!-- ส่วนจัดเเสดง -->
  <div id="AdminSecretaryManagement">
    <NavbarAdmin />
    <v-card class="cardshow">
      <v-toolbar dark prominent color="#FFAB40">
        <h1>จัดการ Secretary</h1>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-data-iterator
        :items="listofficer"
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
                @click="dialogadd = !dialogadd"
              >
                เพิ่ม Secretary
              </v-btn></v-col
            >
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                prepend-inner-icon="mdi-magnify"
                label="ชื่อ Secretary"
                placeholder="ชื่อ Secretary"
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
          <v-row>
            <v-col align="center"> ลำดับ </v-col>
            <v-col align="center"> ชื่อ - สกุล </v-col>
            <v-col align="center"> Agency </v-col>

            <v-col align="center"> Action </v-col>
          </v-row>

          <v-row v-for="item in props.items" :key="item.text">
            <v-card-title>
              <v-row>
                <v-col align="center"> {{ item.id }} </v-col>
                <v-col align="center">
                  {{ item.Fname }} {{ item.Lname }}
                </v-col>

                <v-col align="center"> {{ item.agency }} </v-col>
                <v-col align="center">
                  <v-btn icon><v-icon color="yellow">mdi-pencil</v-icon></v-btn>
                  <v-btn icon
                    ><v-icon color="red" @click="dialogdel = !dialogdel"
                      >mdi-delete</v-icon
                    ></v-btn
                  >
                </v-col>
              </v-row>
            </v-card-title>
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
          <!-- {{listofficer}} --> 
        </template>
      </v-data-iterator>

      <!-- ส่วนจัดเเสดงเวลากดเเก้ไข -->
      <v-dialog v-model="dialog" persistent width="800">
        <v-card align="center">
          <h1>จัดการข้อมูล Secretary</h1>

          <v-divider></v-divider>
          <v-btn fab width="250" height="250" left class="text-pprofile-magin"
            >Image</v-btn
          >

          <v-text-field
            label="ชื่อ"
            outlined
            readonly
            class="text-pprofile-magin"
          ></v-text-field>

          <v-text-field
            label="นามสกุล"
            outlined
            readonly
            class="text-pprofile-magin"
          ></v-text-field>
          <v-text-field
            label="หน่วยงาน"
            outlined
            readonly
            class="text-pprofile-magin"
          ></v-text-field>

          <v-textarea
            label="คำอธิบาย"
            auto-grow
            outlined
            rows="1"
            row-height="15"
            class="text-pprofile-magin"
          ></v-textarea>
          <v-divider></v-divider>
          <v-btn color="green darken-1" text @click="dialog = false">
            ตกลง
          </v-btn>
          <v-btn color="red darken-1" text @click="dialog = false">
            ยกเลิก
          </v-btn>
        </v-card>
      </v-dialog>
      <!-- ส่วนจัดเเสดงเวลากดเเก้ไข -->
      <!-- เพิ่มข้อมูล officer -->
      <v-dialog v-model="dialogadd" persistent max-width="1000px">
        <v-card align="center">
          <h1>เพิ่มข้อมูล Secretary</h1>
          <v-divider></v-divider>
          <form v-on:submit.prevent="addNewofficer">
            <v-container>
              <v-row>
                <v-col>
                  <v-btn fab width="150" height="150"> </v-btn>
                  <v-file-input
                    :rules="rules"
                    accept="image/png, image/jpeg, image/bmp"
                    placeholder="Pick an avatar"
                    prepend-icon="mdi-camera"
                    label="Avatar"
                  ></v-file-input>
                </v-col>
                <v-col>
                  <v-text-field
                    class="cardmargin"
                    v-model="Fname"
                    label="ชื่อ"
                    required
                  ></v-text-field>
                  <v-text-field
                    class="cardmargin"
                    v-model="Lname"
                    label="นามสกุล"
                    required
                  ></v-text-field>
                  <v-radio-group v-model="gender" mandatory row>
                    <v-radio label="ชาย" value="ขาย"></v-radio>
                    <v-radio label="หญิง" value="หญง" color="#E91E63"></v-radio>
                  </v-radio-group>
                  <v-text-field
                    class="cardmargin"
                    v-model="email"
                    label="E-mail"
                    required
                  ></v-text-field>
                  <v-text-field
                    class="cardmargin"
                    v-model="tell"
                    label="เบอร์โทร"
                    required
                  ></v-text-field>

                  <v-text-field
                    class="cardmargin"
                    v-model="address"
                    label="ที่อยู่"
                    required
                  ></v-text-field>

                  <v-select
                    v-model="select"
                    :items="itemsAgency"
                    :error-messages="errors"
                    label="Select Agency"
                    data-vv-name="select"
                    required
                  ></v-select>
                </v-col>
              </v-row>
              <v-btn color="green darken-1" type="submit"> ตกลง </v-btn>
              <v-btn color="red darken-1" text @click="dialogadd = false">
                ยกเลิก
              </v-btn>
            </v-container>
          </form>
        </v-card>
      </v-dialog>
      <!-- เพิ่มข้อมูล officer -->
      <!-- ลบ  officer -->
      <v-dialog v-model="dialogdel" persistent width="800">
        <v-card align="center">
          <h1>ยืนยัน</h1>

          <v-divider></v-divider>
          <h2>ต้องการลบข้อมูลของ Secretary คนนี้</h2>

          <v-divider></v-divider>
          <v-btn color="green darken-1" text @click="removeofficer">
            ตกลง
          </v-btn>
          <v-btn color="red darken-1" text @click="dialogdel = false">
            ยกเลิก
          </v-btn>
        </v-card>
      </v-dialog>
      <!-- ลบ  officer -->
    </v-card>
  </div>
  <!-- ส่วนจัดเเสดง -->
</template>

<script>
import NavbarAdmin from "../../components/NavbarAdmin.vue";
export default {
  name: "adminSecretaryManagement",
  components: {
    NavbarAdmin,
  },
  data() {
    return {
      // ของตัวตาราง
      itemsPerPageArray: [4, 8, 12],
      search: "",
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 4,
      sortBy: "name",
      // ของตัวตาราง

      // ของตัวไดอล็อค
      dialog: false,
      dialogadd: false,
      dialogdel: false,
      // ของตัวไดอล็อค

      // ของตัวเพิ่มข้อมูล
      Fname: "",
      Lname: "",
      gender: "",
      email: "",
      address: "",
      nextOfficerId: 1,
      listofficer: [],
      select:"",
      // ของตัวเพิ่มข้อมูล

      items: [],

      itemsAgency: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
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
    addNewofficer: function () {
      this.listofficer.push({
        id: this.nextOfficerId++,
        Fname: this.Fname,
        Lname: this.Lname,
        gender: this.gender,
        email: this.email,
        address: this.address,
        agency:this.select,
      });
      this.Fname = "";
      this.Lname = "";
      this.gender = "";
      this.email = "";
      this.address = "";
      this.newtitleText = "";
      this.select = "";
      this.dialogadd = false;
    },
    removeofficer: function (index) {
      console.log(index);
      this.listofficer.splice(index, 1);
      this.dialogdel = false;
    },
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
