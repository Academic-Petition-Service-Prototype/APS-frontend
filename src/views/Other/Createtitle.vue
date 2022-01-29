<template>
  <!-- ส่วนจัดเเสดง -->
  <div id="Formmanagement">
    <NavbarOF />
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
          <v-stepper-content step="1">
            <v-card class="mb-12" color="#ECEFF1">
              <!-- หน้าสร้างหัวข้อ -->
              <v-row>
                <v-col>
                  <v-text-field
                    name="title"
                    v-model="forms.title"
                    label="ชื่อหัวข้อ"
                    class="cardshow"
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
                  {{ title }}
                </div>
              </v-row>

              <!-- หน้าสร้างหัวข้อ -->
            </v-card>

            <v-btn color="primary" @click="stepprocess = 2"> ต่อไป </v-btn>

            <v-btn text> ยกเลิก </v-btn>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card class="mb-12" color="#ECEFF1">
              <v-row>
                <v-col class="cardshow">
                  <h1>เพิ่มผู้อนุมัติ</h1>
                  เลื่อนเพิ่อเพิ่มผู้อนุมัติในคำร้องนี้
                  <v-switch v-model="forms.approver"></v-switch>
                </v-col>
              </v-row>

              <v-row v-if="forms.approver == true">
                <!-- ส่วนของเพิ่มหน้าผู้อนุมัติ -->
                <div>
                  <form v-on:submit.prevent="addapprovertitle">
                    <v-col class="cardshow" align="center">
                      <v-text-field
                        v-model="newapproverText"
                        label="ชื่อผู้อนุมัติ"
                        required
                        class="cardshow"
                      ></v-text-field>
                      <v-btn type="submit">เพิ่ม</v-btn>
                    </v-col>
                  </form>
                  <v-row
                    v-for="(listapprover, index) in listapprover"
                    :key="listapprover.id"
                  >
                    <v-col class="cardshow" align="center">
                      {{ listapprover.id }}
                    </v-col>
                    <v-col class="cardshow" align="center">
                      {{ listapprover.title }}
                    </v-col>
                    <v-col class="cardshow" align="center">
                      <v-btn @click="removeapprover(index)"> ลบ </v-btn>
                    </v-col>
                  </v-row>
                  {{ listapprover }}
                </div>
                <!-- ส่วนของเพิ่มหน้าผู้อนุมัติ -->
              </v-row>
            </v-card>

            <v-btn color="primary" @click="stepprocess = 3"> ต่อไป </v-btn>

            <v-btn text @click="stepprocess = 1"> ย้อนกลับ </v-btn>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card class="mb-12" color="#ECEFF1">
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
                        :rules="nameRules"
                        :counter="10"
                        label="ชื่อ"
                        required
                        disabled
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="4">
                      <v-text-field
                        v-model="profile.l_name"
                        :rules="nameRules"
                        :counter="10"
                        label="นามสกุล"
                        required
                        disabled
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="4">
                      <v-text-field
                        v-model="profile.gender"
                        :rules="emailRules"
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
                        :rules="emailRules"
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
                        :rules="emailRules"
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
                        :rules="emailRules"
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

                      {{ title }}
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
  </div>
  <!-- ส่วนจัดเเสดง -->
</template>

<script>
import NavbarOF from "../../components/NavbarOfficer.vue";
import axios from "axios";
export default {
  name: "Createtitle",
  components: {
    NavbarOF,
  },
  data() {
    return {
      stepprocess: 1,
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
    };
  },
  methods: {
    addNewtitle: function() {
      this.title.push({
        id: this.nextTodoId++,
        title: this.newtitleText,
      });
      this.newtitleText = "";
    },
    addapprovertitle: function() {
      this.listapprover.push({
        id: this.nextapproverId++,
        title: this.newapproverText,
      });
      this.newapproverText = "";
    },
    removetitle: function(index) {
      console.log(index);
      this.title.splice(index, 1);
    },
    removeapprover: function(index) {
      console.log(index);
      this.listapprover.splice(index, 1);
    },

    createpetition() {
      axios
        .post(process.env.VUE_APP_URL + "forms", {
          form_name: this.forms.title,
          form_specific: this.title,
          f_name: this.$store.getters.getUser.f_name,
          l_name: this.$store.getters.getUser.l_name,
          approval_name: this.listapprover,
        })
        .then((response) => {
          if (response.data == "กรุณากรอกชื่อคำร้อง") {
            alert("กรุณากรอกชื่อคำร้อง");
          } 
          else if (response.data == "ชื่อคำร้องนี้มีอยู่ในระบบแล้ว") {
            alert("ชื่อคำร้องนี้มีอยู่ในระบบแล้ว");
          } 
          else {
            this.textsnackbar = "รายงานปัญหาสำเร็จ";
            this.colorsnackbar = "#2E7D32";
            this.snackbar = true;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
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
