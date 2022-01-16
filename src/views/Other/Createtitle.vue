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
                    v-model="forms.title"
                    label="ชื่อหัวข้อ"
                    required
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
                <v-row v-for="numspecifics in numspecifics" :key="numspecifics">
                  <v-col class="cardshow" align="center">
                    <v-text-field
                      v-model="forms.numspecifics"
                      label="ชื่อหัวข้อเฉพาะ"
                      id="v-model"
                      required
                      class="cardshow"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="cardshow" align="center">
                    <v-btn @click="submit">กดเพื่อเพิ่มหัวข้อเฉพาะ</v-btn>
                    {{ forms.title }}
                    {{ forms.specifics }}
                    {{ numspecifics }}
                  </v-col>
                </v-row>
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
                <v-row v-for="numspecifics in numspecifics" :key="numspecifics">
                  <v-col class="cardshow" align="center">
                    <v-text-field
                      v-model="forms.numspecifics"
                      label="อีเมล์ผู้อนุมัติ"
                      id="v-model"
                      required
                      class="cardshow"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="cardshow" align="center">
                    <v-btn @click="submit">กดเพื่อเพิ่มหัวข้อเฉพาะ</v-btn>
                    {{ forms.title }}
                    {{ forms.specifics }}
                    {{ numspecifics }}
                  </v-col>
                </v-row>
              </v-row>
            </v-card>

            <v-btn color="primary" @click="stepprocess = 3"> ต่อไป </v-btn>

            <v-btn text @click="stepprocess = 1"> ย้อนกลับ </v-btn>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card class="mb-12" color="#ECEFF1">
              <!-- ส่วนเเสดงหน้าการเเสดงตัวอย่าง -->
              <h1>
                {{forms.title}} 
              </h1>
              <v-form v-model="valid" v-for="profile in profile" :key="profile">
                <v-container>
                  <v-row>
                    <v-col cols="12" md="4">
                      <v-text-field
                        v-model="profile.Fname"
                        :rules="nameRules"
                        :counter="10"
                        label="ชื่อ"
                        required
                        disabled
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="4">
                      <v-text-field
                        v-model="profile.Lname"
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
                        v-model="profile.tell"
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
                        v-model="profile.addess"
                        :rules="emailRules"
                        label="ที่อยู่"
                        required
                        disabled
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row v-for="heard in heard" :key="heard">
                    <v-col align="center" v-if="heard.hasSpecificsDetail">
                      <v-row v-for="specifics in specifics" :key="specifics">
                        <v-col>
                          {{ specifics.titleheard }}
                          <v-text-field
                            v-model="specifics.specificsdetail"
                            :rules="emailRules"
                            label="ใส่ข้อมูลลงที่นี้"
                            required
                          >
                          </v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
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

            <v-btn color="primary"> ต่อไป </v-btn>

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
          Fname: "ณัฐภูมิ",
          Lname: "ผาจิต",
          gender: "ชาย",
          email: "62015011@kmit.ac.th",
          tell: "0856937521",
          addess:
            "เลขที่ 1 ซอยฉลองกรุง 1แขวงลาดกระบัง เขตลาดกระบังกรุงเทพฯ 10520",
        },
      ],
      forms: [
        {
          title: "",
          specifics: true,
          approver: true,
        },
      ],
      
    };
  },
  methods: {
    addForm: function () {
      let form = {
        name: this.name,
      };
      this.forms.push(form);
    },
    submit: function () {
      this.numspecifics = this.numspecifics + 1;
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
