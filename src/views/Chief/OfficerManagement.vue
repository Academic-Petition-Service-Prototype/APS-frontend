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
          :items="items"
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

          <template v-slot:default="props">
            <v-row>
              <v-col align="center"> ลำดับ </v-col>
              <v-col align="center"> ชื่อ - สกุล </v-col>
              <v-col align="center"> เพศ </v-col>

              <v-col align="center"> Action </v-col>
            </v-row>

            <v-row
              v-for="item in props.items"
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
                      <v-col align="center"> {{ item.no }} </v-col>
                      <v-col align="center"> {{ item.text }} </v-col>

                      <v-col align="center"> {{ item.datecreation }} </v-col>
                      <v-col align="center">
                        <v-btn icon
                          ><v-icon color="yellow">mdi-pencil</v-icon></v-btn
                        >
                        <v-btn icon
                          ><v-icon color="red">mdi-delete</v-icon></v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-card-title>

                  <v-divider></v-divider>
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
                  v-model="newapproverText"
                  label="ชื่อผู้อนุมัติ"
                  required
                ></v-text-field>
                <v-text-field
                  class="cardmargin"
                  v-model="newapproverText"
                  label="นามสกุล"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-dialog>

      <!-- ลบ  officer -->

      <v-dialog v-model="dialogdel" persistent width="800">
        <v-card align="center">
          <h1>ยืนยัน</h1>

          <v-divider></v-divider>
          <h2>ต้องการลบข้อมูลของ {{ "ตรงนี้ใส่ index คนที่จะลบ" }}</h2>

          <v-divider></v-divider>
          <v-btn color="green darken-1" text @click="dialogdel = false">
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
.box-margin {
  margin: 5%;
}
</style>
