<template>
  <!-- ส่วนจัดเเสดง -->
  <div id="Officermanagement">
    <NavbarChief />
    <v-card class="cardshow">
      <h1>
        จัดการ Officer
        <v-divider></v-divider>
      </h1>

      <v-container fluid>
        <v-row>
          <v-col> </v-col>
          <v-col align="right">
            <v-btn
              class="btn-margin"
              color="success"
              @click="dialogadd = !dialogadd"
            >
              + เพิ่ม
            </v-btn>
          </v-col>
        </v-row>

        <v-data-iterator
          :items="listofficer"
          :items-per-page.sync="itemsPerPage"
          :page.sync="page"
          :search="search"
          :sort-by="sortBy.toLowerCase()"
          :sort-desc="sortDesc"
          hide-default-footer
        >
          <template v-slot:header>
            <v-toolbar dark color="blue darken-3" class="mb-1">
              <v-text-field
                v-model="search"
                clearable
                flat
                solo-inverted
                hide-details
                prepend-inner-icon="mdi-magnify"
                label="Search"
              ></v-text-field>
              <template v-if="$vuetify.breakpoint.mdAndUp"> </template>
            </v-toolbar>
          </template>

          <template >
            <v-row>
              <v-col align="center"> ลำดับ </v-col>
              <v-col align="center"> ชื่อ - สกุล </v-col>
              <v-col align="center"> เพศ </v-col>

              <v-col align="center"> Action </v-col>
            </v-row>

            <v-row
              v-for="item in listofficer"
              :key="item.text"
              cols="12"
              sm="6"
              md="4"
              lg="3"
            >
              <v-col>
                <v-card>
                  <v-card-title class="subheading font-weight-bold">
                    <v-row>
                      <v-col align="center"> {{ item.id }} </v-col>
                      <v-col align="center"> {{ item.Fname }} {{item.Lname }} </v-col>

                      <v-col align="center"> {{ item.gender }} </v-col>
                      <v-col align="center">
                        <v-btn icon
                          ><v-icon color="yellow">mdi-pencil</v-icon></v-btn
                        >
                        <v-btn icon
                          ><v-icon color="red" @click="dialogdel=!dialogdel">mdi-delete</v-icon></v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-card-title>

                  <v-divider></v-divider>
                  {{listofficer}}
                </v-card>
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
      </v-container>

      <!-- ส่วนจัดเเสดงเวลากดเเก้ไข -->

      <v-dialog v-model="dialog" persistent width="800">
        <v-card align="center">
          <h1>จัดการข้อมูล Officer</h1>

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
          <h1>เพิ่มข้อมูล officer</h1>

          <v-divider></v-divider>

          <!-- <form v-on:submit.prevent="addapprovertitle">
            <v-btn fab width="150" height="150">Profile</v-btn>

            <v-text-field
              class="cardmargin"
              v-model="newapproverText"
              label="ชื่อผู้อนุมัติ"
              required
            ></v-text-field>
            <v-btn color="green darken-1" type="submit"> ตกลง </v-btn>
            <v-btn color="red darken-1" text @click="dialogadd = false">
              ยกเลิก
            </v-btn>
          </form> -->

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
                  <v-radio
                    label="หญิง"
                    value="หญง"
                    color="#E91E63"
                  ></v-radio>
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

      <!-- ลบ  officer -->

      <v-dialog v-model="dialogdel" persistent width="800">
        <v-card align="center">
          <h1>ยืนยัน</h1>

          <v-divider></v-divider>
          <h2>ต้องการลบข้อมูลของ {{ "ตรงนี้ใส่ index คนที่จะลบ" }}</h2>

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
import NavbarChief from "../../components/NavbarChief.vue";
export default {
  name: "Officermanagement",
  components: {
    NavbarChief,
  },
  data() {
    return {
      search: "",
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 4,
      sortBy: "name",

      dialog: false,
      dialogadd: false,
      dialogdel: false,

      Fname:"",
      Lname:"",
      gender:"",
      email:"",
      address:"",
      nextOfficerId: 1,



      listofficer: [],
    };
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.listofficer.length / this.itemsPerPage);
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
      });
      this.Fname = "";
      this.Lname = "";
      this.gender = "";
      this.email = "";
      this.address = "";
      this.newtitleText = "";
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
.bg-color {
  background: #f0f0f0;
  height: 100%;
}
.cardmargin {
  margin: 2%;
}
.box-margin {
  margin: 5%;
}
</style>
