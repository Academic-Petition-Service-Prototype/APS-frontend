<template>
  <!-- ส่วนจัดเเสดง -->
  <div id="OfficerCreatepetition">
    <NavbarOF />
    <v-card class="cardshow">
      <v-toolbar dark prominent color="#6c757d">
        <v-row>
          <v-col align="center">
            <p>สร้างคำร้อง</p>
          </v-col>
        </v-row>
      </v-toolbar>
      <!-- ส่วนสร้างเอกสาร -->
      <v-stepper alt-labels v-model="stepprocess">
        <v-stepper-header>
          <v-stepper-step :complete="stepprocess > 1" step="1" color="green">
            สร้างหัวข้อ
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step
            :complete="stepprocess > 2"
            step="2"
            color="green"
            class="text-center"
          >
            รายละเอียด และ จัดหมวดหมู่คำร้อง
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="stepprocess > 3" step="3" color="green">
            ผู้อนุมัติ
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="4" color="green">
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
                      {{ index + 1 }}
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

            <v-btn text @click="leavepage"> ยกเลิก </v-btn>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card class="mb-12" color="#ECEFF1">
              <!-- หน้าสร้างหัวข้อ -->

              <v-row>
                <v-col>
                  <h1>รายละเอียดคำร้อง</h1>

                  <v-text-field
                    v-model="form_detail"
                    label="รายละเอียดคำร้อง"
                    class="cardshow"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <h1>หมวดหมู่คำร้อง</h1>

                  <v-autocomplete
                    class="cardshow"
                    v-model="tag_form"
                    :items="tag"
                    :item-text="(item) => item.tag_name"
                    outlined
                    dense
                    chips
                    small-chips
                    label="หมวดหมู่คำร้อง"
                    return-object
                  ></v-autocomplete>
                </v-col>
                <v-col align="center">
                  หากท่านต้องการสร้างหมวดหมู่ใหม่กดเพิ่ม "เพิ่มหมวดหมู่"
                  <v-row>
                    <v-col align="center">
                      <v-btn class="cardshow" @click="addtag()">
                        เพิ่มหมวดหมู่
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>

              <!-- หน้าสร้างหัวข้อ -->
            </v-card>

            <v-btn type="submit" color="primary" @click="nextstepsecond">
              ต่อไป
            </v-btn>

            <v-btn text @click="stepprocess = 1"> ย้อนกลับ </v-btn>
          </v-stepper-content>

          <v-stepper-content step="3" ref="Selectionapprover">
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
                      {{ index + 1 }}
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

            <v-btn color="primary" @click="nextstep3"> ต่อไป </v-btn>

            <v-btn text @click="stepprocess = 2"> ย้อนกลับ </v-btn>
          </v-stepper-content>

          <v-stepper-content step="4">
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

            <v-btn text @click="stepprocess = 3"> ย้อนกลับ </v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
      <!-- ส่วนสร้างเอกสาร -->
    </v-card>
  </div>
  <!-- ส่วนจัดเเสดง -->
</template>

<script>
import NavbarOF from "../../components/NavbarOfficer.vue";
import axios from "axios";
export default {
  name: "OfficerCreatepetition",
  components: {
    NavbarOF,
  },
  data() {
    return {
      tag: [],
      tag_form: null,
      form_detail: "",
      stepprocess: 1,
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
    leavepage() {
      this.$swal({
        title: "ท่านกำลังจะออกจากหน้าสร้างคำร้อง ?",
        text: "ท่านเเน่ใจว่าต้องการออกจากหน้าสร้างคำร้อง!",
        icon: "warning",
        width: 550,
        showCancelButton: true,
        confirmButtonText: "ตกลง",
        cancelButtonText: "ยกเลิก",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$router.push("/OfficerPetitionManagement");
        }
      });
    },
    addNewtitle: function() {
      this.title.push({
        id: this.nextTodoId++,
        title: this.newtitleText,
      });
      this.newtitleText = "";
    },
    addapprovertitle: function() {
      if (this.newapproverText !== "" && this.newapproverText !== null) {
        let ifdup = false;
        for (let i = 0; i < this.listapprover.length; i++) {
          if (
            this.listapprover[i].approver_name.user_id ==
              this.newapproverText.user_id &&
            this.listapprover[i].approver_name[i].f_name ==
              this.newapproverText.f_name &&
            this.listapprover[i].approver_name[i].l_name ==
              this.newapproverText.l_name
          ) {
            console.log("if ddf");
            ifdup = true;
          } else {
            console.log("else");
            ifdup = false;
          }
        }
        if (ifdup == true) {
          this.$swal({
            icon: "warning",
            title: "ไม่สามารถเลือกผู้อนุมัติซ้ำได้ โปรดเลือกใหม่!",
            text: "ท่านเลือกผู้อนุมัติที่อยู่ในลำดับเเล้วโปรดเลือกใหม่",
            timer: 2000,
          });
        } else {
          this.listapprover.push({
            order: this.nextapproverId++,
            approver_name: this.newapproverText,
            approver_state: "ยังไม่ได้อนุมัติ",
          });
          this.newapproverText = "";
        }
      } else {
        this.$swal({
          icon: "warning",
          title: "ท่านยังไม่ได้เลือกผู้อนุมัติโปรดเลือกก่อน!",
          text: "ก่อนจะกดปุ่มเพิ่มโปรดเลือกรายชื่อผู้อนุมัติก่อน",
          timer: 2000,
        });
      }
    },
    removetitle: function(index) {
      this.title.splice(index, 1);
      this.nextTodoId--;
    },
    removeapprover: function(index) {
      this.listapprover.splice(index, 1);
      this.nextapproverId--;
    },

    addtag() {
      this.$swal({
        title: "กรุณากรอกชื่อหมวดหมู่คำร้อง",
        input: "text",
        // inputValue: this.tag_form,
        showCancelButton: true,
        confirmButtonText: "เพิ่ม",
        cancelButtonText: "ยกเลิก",
        showLoaderOnConfirm: true,
        inputValidator: (value) => {
          if (!value) {
            return "กรุณากรอกชื่อหมวดหมู่คำร้อง";
          } else {
            this.tag_form = value;
            axios
              .post(process.env.VUE_APP_URL + "tags", {
                users_id: this.$store.getters.getUser.user_id,
                agencies_id: this.$store.getters.getUser.agencies_id,
                tag_name: this.tag_form,
              })
              .then((response) => {
                if (response.data == "กรุณากรอกชื่อหมวดหมู่คำร้อง") {
                  this.$swal({
                    icon: "error",
                    title: "เกิดข้อผิดพลาดในการสร้างหมวดหมู่คำร้อง",
                    text: "กรุณากรอกชื่อหมวดหมู่คำร้อง",
                    timer: 2000,
                  });
                } else if (
                  response.data == "หมวดหมู่นี้มีอยู่ในระบบของหน่วยงานแล้ว"
                ) {
                  this.$swal({
                    icon: "error",
                    title: "หมวดหมู่นี้มีอยู่ในระบบของหน่วยงานแล้ว",
                    text: "กรุณาใช้ชื่อหมวดหมู่คำร้องอื่น",
                    timer: 2000,
                  });
                } else if (response.data == "เพิ่มหมวดหมู่สำเร็จ") {
                  this.$swal({
                    icon: "success",
                    title: "เพิ่มหมวดหมู่สำเร็จ",
                    text: "เพิ่ม " + this.tag_form + " สำเร็จ",
                    timer: 2000,
                  });
                  this.$router.go();
                } else {
                  this.$swal({
                    icon: "error",
                    title: "เกิดข้อผิดพลาด",
                    text: "การสร้างหมวดหมู่เกิดข้อผิดพลาด",
                    timer: 2000,
                  });
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
        },
      });
    },

    nextstepfirst() {
      this.formHasErrors = false;
      // forms.specifics

      Object.keys(this.form).forEach((f) => {
        if (!this.form[f]) {
          this.$swal({
            icon: "warning",
            title: "กรุณาใส่ชื่อหัวข้อ",
            text: "กรุณากรอกข้อมูลให้ครบ และอย่าเว้นว่าง",
            timer: 2000,
          });
          this.formHasErrors = true;
          this.$refs[f].validate(true);
        } else {
          if (this.forms.specifics == true) {
            Object.keys(this.form).forEach((f) => {
              if (this.title >= 0) {
                this.$swal({
                  icon: "warning",
                  title: "กรุณากรอกข้อมูลเฉพาะ",
                  text:
                    "เมื่อท่านเปิดใช้งานเพิ่มข้อมูลเฉพาะ กรุณากรอกข้อมูล และอย่าเว้นว่าง",
                  timer: 5000,
                });

                this.formHasErrors = true;
                this.$refs[f].validate(true);
                console.log(this.newtitleText);
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
      if (
        this.form_detail !== "" &&
        this.form_detail !== null &&
        this.tag_form !== "" &&
        this.tag_form !== null &&
        this.tag_form.length !== 0
      ) {
        this.stepprocess = 3;
      } else {
        this.$swal({
          icon: "warning",
          title: "กรุณากรอกข้อมูลให้ครบถ้วน",
          text: "กรุณากรอกข้อมูลให้ครบ",
          timer: 5000,
        });
      }
    },

    nextstep3() {
      this.approver = false;

      Object.keys(this.Selectionapprover).forEach((f) => {
        if (this.listapprover >= 0) {
          this.$swal({
            icon: "warning",
            title: "โปรดเลือกผู้อนุมัติ !",
            text: "ในการสร้างคำร้อง ได้โปรดเลือกผู้อนุมัติอย่างน้อย 1 คนขึ้นไป",
            timer: 2000,
          });

          this.$refs[f].validate(true);
        } else {
          this.stepprocess = 4;
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
          approval_name: this.listapprover,
          form_detail: this.form_detail,
          tag_id: this.tag_form.tag_id,
        })
        .then((response) => {
          if (response.data == "กรุณากรอกชื่อคำร้อง") {
            this.$swal({
              icon: "error",
              title: "กรุณากรอกชื่อคำร้อง",
              timer: 2000,
            });
          } else if (response.data == "ชื่อคำร้องนี้มีอยู่ในระบบแล้ว") {
            this.$swal({
              icon: "error",
              title: "ชื่อคำร้องนี้มีอยู่ในระบบแล้ว!",
              text: "คำร้องของท่านมีในระบบอยู่เเล้ว",
              timer: 2000,
            });
          } else {
            this.$swal({
              icon: "success",
              title: "สร้างคำร้องเสร็จสิ้น",
              text: "ยินดีด้วยคุณสร้างคำร้อง " + this.forms.title + " สำเร็จ",
              timer: 2000,
            });
            this.$router.push("/OfficerPetitionManagement");
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
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    },
    gettagsbyagency() {
      axios
        .post(process.env.VUE_APP_URL + "tagsbyagency", {
          agency_id: this.$store.getters.getUser.agencies_id,
        })
        .then((response) => {
          // handle success
          this.tag = response.data;
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
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
    this.gettagsbyagency();
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
p {
  font-size: 60px;
}
</style>
