<template>
  <!-- ส่วนจัดเเสดง -->
  <div id="ChiefCreatepetition">
    <NavbarChief />
    <v-card class="cardshow">
      <h1>
        สร้างคำร้อง
        
        <v-divider></v-divider>
      </h1>
      <!-- ส่วนสร้างเอกสาร -->
      <v-stepper alt-labels v-model="stepprocess">
        <v-stepper-header>
          <v-stepper-step :complete="stepprocess > 1" step="1" color="green">
            สร้างหัวข้อ
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="stepprocess > 2" step="2" color="green">
            ผู้อนุมัติ
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3" color="green">
            ตัวอย่างคำร้อง
          </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1" ref="form">
            <v-card class="mb-12" color="#ECEFF1">
              <!-- หน้าสร้างหัวข้อ -->

              <v-row>
                <v-col>
                  <h1>สร้างหัวข้อคำร้อง</h1>
                  
                  <v-text-field
                    ref="forms.title"
                    name="forms.title"
                    v-model="forms.title"
                    label="ชื่อหัวข้อ"
                    class="cardshow"
                    required
                    :error-messages="errorMessages"
                    :rules="[() => !!forms.title || 'กรุณาใส่ชื่อหัวข้อ']"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="cardshow">
                  คำร้องนี้ต้องการข้อมูลเฉพาะเพิ่ม
                  <v-switch v-model="forms.specifics"></v-switch>
                </v-col>
              </v-row>

              <v-row v-if="forms.specifics == true">
                <div>
                  <form v-on:submit.prevent="addNewtitle">
                    <v-col class="cardshow" align="center">
                      <v-text-field
                        v-model="newtitleText"
                        label="ชื่อหัวข้อเฉพาะ"
                        required
                        class="cardshow"
                      ></v-text-field>
                      <v-btn type="submit">เพิ่ม</v-btn>
                    </v-col>
                  </form>
                  <v-row v-for="(title, index) in title" :key="title.id">
                    <v-col class="cardshow" align="center">
                      {{ title.id }}
                    </v-col>
                    <v-col class="cardshow" align="center">
                      {{ title.title }}
                    </v-col>
                    <v-col class="cardshow" align="center">
                      <v-btn @click="removetitle(index)"> ลบ </v-btn>
                    </v-col>
                  </v-row>
                </div>
              </v-row>

              <!-- หน้าสร้างหัวข้อ -->
            </v-card>

            <v-btn type="submit" color="primary" @click="nextstepfirst">
              ต่อไป
            </v-btn>

            <v-btn text @click="exitpention=true" > ยกเลิก </v-btn>
          </v-stepper-content>

          <v-stepper-content step="2" ref="Selectionapprover">
            <v-card class="mb-12" color="#ECEFF1">
              <v-row>
                <v-col class="cardshow">
                  <h1>เพิ่มผู้อนุมัติ</h1>
                </v-col>
              </v-row>

              <v-row>
                <!-- ส่วนของเพิ่มหน้าผู้อนุมัติ -->
                <div>
                  <form v-on:submit.prevent="addapprovertitle()">
                    <v-col class="cardshow" align="center">
                      <v-select
                        ref="approver"
                        v-model="newapproverText"
                        :rules="[
                          () => !!approverlist || 'กรุณาเลือกผู้อนุมัติ',
                        ]"
                        :items="approverlist"
                        :item-text="(item) => item.f_name + ' - ' + item.l_name"
                        item-value="user_id"
                        return-object
                        :error-messages="approvererrorMessages"
                        label="เลือกผู้อนุมัติ"
                        class="cardshow"
                      >
                      </v-select>
                      <v-btn type="submit">เพิ่ม</v-btn>
                    </v-col>
                  </form>
                  <v-row
                    v-for="(listapprover, index) in listapprover"
                    :key="listapprover.order"
                  >
                    <v-col class="cardshow" align="center">
                      {{ listapprover.order }}
                    </v-col>
                    <v-col class="cardshow" align="center">
                      {{ listapprover.approver_name.f_name }}
                      {{ listapprover.approver_name.l_name }}
                    </v-col>
                    <v-col class="cardshow" align="center">
                      <v-btn @click="removeapprover(index)"> ลบ </v-btn>
                    </v-col>
                  </v-row>
                  
                </div>
                <!-- ส่วนของเพิ่มหน้าผู้อนุมัติ -->
              </v-row>
            </v-card>

            <v-btn color="primary" @click="nextstepsecond"> ต่อไป </v-btn>

            <v-btn text @click="stepprocess = 1"> ย้อนกลับ </v-btn>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card class="mb-12" color="#ECEFF1">
              <h1>ตัวอย่างคำร้อง</h1>
              <!-- ส่วนเเสดงหน้าการเเสดงตัวอย่าง -->
              <h1>
                {{ forms.title }}
              </h1>
              <v-form v-model="valid" v-for="profile in profile" :key="profile">
                <v-container>
                  <v-row>
                    <v-col cols="12" md="4">
                      <v-text-field
                        v-model="profile.f_name"
                        label="ชื่อ"
                        required
                        disabled
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="4">
                      <v-text-field
                        v-model="profile.l_name"
                        label="นามสกุล"
                        required
                        disabled
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="4">
                      <v-text-field
                        v-model="profile.gender"
                        label="เพศ"
                        required
                        disabled
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="profile.email"
                        label="E-mail"
                        required
                        disabled
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="profile.tel_num"
                        label="เบอร์โทร"
                        required
                        disabled
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="profile.address"
                        label="ที่อยู่"
                        required
                        disabled
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row v-if="forms.specifics == true">
                    <div>
                      <v-row v-for="title in title" :key="title.id">
                        <v-col class="cardshow" align="center">
                          <h3>{{ title.title }}</h3>
                          <v-text-field
                            label="กรุณาใส่ข่อมูล"
                            required
                            class="cardshow"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </div>
                  </v-row>

                  <v-row>
                    <v-col align="center">
                      <v-btn class="ma-2" color="success"> ส่งคำร้อง </v-btn>
                    </v-col>

                    <v-col align="center">
                      <v-btn class="ma-2" outlined color="error">
                        ย้อนกลับ
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
              <!-- ส่วนเเสดงหน้าการเเสดงตัวอย่าง -->
            </v-card>

            <v-btn color="primary" @click="createpetition()">
              สร้างคำร้อง
            </v-btn>

            <v-btn text @click="stepprocess = 2"> ย้อนกลับ </v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
      <!-- ส่วนสร้างเอกสาร -->
    </v-card>

    <!-- เเจ้งเตือน  -->
    <v-snackbar v-model="snackbar">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>


    <!-- ส่วนจัดเเสดงเวลากดออกจากหน้าสร้างคำร้อง -->
        <v-dialog v-model="exitpention" persistent width="800">
          <v-card align="center">
            <h1>ต้องการออกจากหน้าสร้างคำร้องหรือไม่</h1>
            

            <v-btn color="green darken-1" text to="/ChiefPetitionManagement">
              ตกลง
            </v-btn>
            <v-btn color="red darken-1" text @click="exitpention = false">
              ยกเลิก
            </v-btn>
          </v-card>
        </v-dialog>
        <!-- ส่วนจัดเเสดงเวลากดออกจากหน้าสร้างคำร้อง -->
  </div>
  <!-- ส่วนจัดเเสดง -->
</template>

<script>
import NavbarChief from "../../components/NavbarChief.vue";
import axios from "axios";
export default {
  name: "ChiefCreatepetition",
  components: {
    NavbarChief,
  },
  data() {
    return {
      exitpention:false,
      stepprocess: 1,
      snackbar: false,
      text: ``,
      numspecifics: 1,
      profile: [
        {
          f_name: this.$store.getters.getUser.f_name,
          l_name: this.$store.getters.getUser.l_name,
          gender: this.$store.getters.getUser.gender,
          email: this.$store.getters.getUser.email,
          tel_num: this.$store.getters.getUser.tel_num,
          address: this.$store.getters.getUser.address,
        },
      ],
      forms: [
        {
          title: " ",
          specifics: true,
          approver: true,
        },
      ],
      newtitleText: "",
      newapproverText: "",
      title: [],
      listapprover: [],
      nextTodoId: 1,
      nextapproverId: 1,
      formHasErrors: false,
      approverError: false,
      approverlist: [],
      approver: [
        {
          id: "",
          name: "",
        },
      ],
    };
  },
  methods: {
    addNewtitle: function () {
      this.title.push({
        id: this.nextTodoId++,
        title: this.newtitleText,
      });
      this.newtitleText = "";
    },
    addapprovertitle: function () {
      this.listapprover.push({
        order: this.nextapproverId++,
        approver_name: this.newapproverText,
        approver_state: "ยังไม่ได้อนุมัติ",
        // approver_id: this.approver.id[0],
      });
      this.newapproverText = "";
    },
    removetitle: function (index) {
      this.title.splice(index, 1);
      this.nextTodoId--;
    },
    removeapprover: function (index) {
      this.listapprover.splice(index, 1);
      this.nextapproverId--;
    },

    nextstepfirst() {
      this.formHasErrors = false;
      // forms.specifics

      Object.keys(this.form).forEach((f) => {
        if (!this.form[f]) {
          this.formHasErrors = true;
          this.$refs[f].validate(true);
        } else {
          if (this.forms.specifics == true) {
            Object.keys(this.form).forEach((f) => {
              if (this.title >= 0) {
                this.formHasErrors = true;
                this.$refs[f].validate(true);
                console.log(this.newtitleText)
              } else {
                this.stepprocess = 2;
              }
            });
          } else {
            this.stepprocess = 2;
          }
        }
        console.log(this.form);
      });
    },

    nextstepsecond() {
      this.approver = false;

      Object.keys(this.Selectionapprover).forEach((f) => {
        if (this.listapprover >= 0) {
          this.approverError = true;
          this.$refs[f].validate(true);
        } else {
          this.stepprocess = 3;
        }
        console.log(this.Selectionapprover);
      });
    },

    createpetition() {
      axios
        .post(process.env.VUE_APP_URL + "insertforms", {
          users_id: this.$store.getters.getUser.user_id,
          form_name: this.forms.title,
          form_specific: this.title,
          f_name: this.$store.getters.getUser.f_name,
          l_name: this.$store.getters.getUser.l_name,
          approval_name: this.listapprover,
        })
        .then((response) => {
          if (response.data == "กรุณากรอกชื่อคำร้อง") {
            alert("กรุณากรอกชื่อคำร้อง");
          } else if (response.data == "ชื่อคำร้องนี้มีอยู่ในระบบแล้ว") {
            alert("ชื่อคำร้องนี้มีอยู่ในระบบแล้ว");
          } else {
            // this.textsnackbar = "รายงานปัญหาสำเร็จ";
            // this.colorsnackbar = "#2E7D32";
            // this.snackbar = true;
            alert("สร้างคำร้องสำเร็จ");
            this.$router.push("/ChiefPetitionManagement");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getchieflist() {
      axios
        .get(
          process.env.VUE_APP_URL +
            "getchief/" +
            this.$store.getters.getUser.agencies_id
        )
        .then((response) => {
          // handle success
          this.approverlist = response.data;

          // this.approverlist.forEach((approver) => {
          //   // this.approver[0].id.push(approver.user_id);
          //   this.approver.push(approver.f_name + " " + approver.l_name);
          //   console.log(this.approver[0].id);
          // });
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    },
  },
  watch: {
    name() {
      this.errorMessages = "";
    },
    approver() {
      this.approvererrorMessages = "";
    },
  },
  computed: {
    form() {
      return {
        name: this.forms.title,
      };
    },
    Selectionapprover() {
      return {
        approver: this.listapprover,
      };
    },
  },
  mounted() {
    this.getchieflist();
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  padding: 10px;
}
.cardshow {
  margin: 2%;
}
.btn-margin {
  margin: 3%;
}
h3 {
  margin: 2%;
}
</style>
