<template>
  <!-- ส่วนจัดเเสดง -->
  <div id="UserDashboard">
    <NavbarUser />
    <div class="cardmargin">
      <v-row>
        <v-col id="#">
          <v-btn text width="auto" height="auto" class="cardmargin">
            <h1>#การรายงานปัญาหาแบบไม่ระบุตัวตน</h1>
          </v-btn>
          <v-divider class="dividermagin"></v-divider>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <h4 id="1">
            <v-btn text width="auto" height="auto"> <h1>1.</h1> </v-btn
            >เมื่อผู้ใช้งานต้องการที่จะ รายงานปัญหา! ไปที่เมนู  <br> "รายงานปัญหาไม่ระบุตัวตน"
          </h4>
        </v-col>
        <v-col align="center">
          <v-img
            src="../../assets/guidereport1.png"
            width="500px"
            height="300px"
          >
          </v-img>
        </v-col>
      </v-row>

      <v-divider class="dividermagin"></v-divider>

      <v-row>
        <v-col align="center">
          <v-img
            src="../../assets/guidereport2.png"
            width="500px"
            height="350px"
          >
          </v-img>
        </v-col>
        <v-col>
          <h4 id="2">
            <v-btn text width="auto" height="auto"> <h1>2.</h1> </v-btn>
            กรอกชื่อรายงานปัญาหาของท่าน
            <br />
          </h4>
        </v-col>
      </v-row>

      <v-divider class="dividermagin"></v-divider>

      <v-row>
        <v-col>
          <h4 id="3">
            <v-btn text width="auto" height="auto"> <h1>3.</h1> </v-btn
            > เลือก วัน เดือน ปี ที่เกิดเหตุ
          </h4>
        </v-col>
        <v-col align="center">
          <v-img
            src="../../assets/guidereport3.png"
            width="500px"
            height="300px"
          >
          </v-img>
        </v-col>
      </v-row>

      <v-divider class="dividermagin"></v-divider>

      <v-row>
        <v-col align="center">
          <v-img
            src="../../assets/guidereport4.png"
            width="500px"
            height="350px"
          >
          </v-img>
        </v-col>
        <v-col>
          <h4 id="4">
            <v-btn text width="auto" height="auto"> <h1>4.</h1> </v-btn>
            หลังจากเลือก วัน เดือน ปี ก็เลือก ช่วงเวลาที่เกิดเหตุ
            <br />
          </h4>
        </v-col>
      </v-row>

      <v-divider class="dividermagin"></v-divider>

      <v-row>
        <v-col>
          <h4 id="5">
            <v-btn text width="auto" height="auto"> <h1>5.</h1> </v-btn
            >กรอกรายละเอียดถึงปััญาหาที่เกิดขขึ้น
            
          </h4>
        </v-col>
        <v-col align="center">
          <v-img
            src="../../assets/guidereport5.png"
            width="500px"
            height="300px"
          >
          </v-img>
        </v-col>
      </v-row>

      <v-divider class="dividermagin"></v-divider>

      <v-row>
        <v-col>
          <h4 id="6">
            <v-btn text width="auto" height="auto"> <h1>#การติดตามการรายงาน <br> ปัญหาที่รายงานไป</h1> </v-btn>
            
            
            
          </h4>
        </v-col>
      </v-row>

      <v-divider class="dividermagin"></v-divider>
      <v-row>
        <v-col align="center">
          <v-img
            src="../../assets/guidereport6.png"
            width="500px"
            height="350px"
          >
          </v-img>
        </v-col>
        <v-col>
          <h4 id="6">
            <v-btn text width="auto" height="auto"> <h1>6.</h1> </v-btn>
            สามารถติดตามการรายงานปัญาหาปบบไม่ระบุตัวตนได้
            <p>
              โดยไปที่แทบเมนู เลือก  <br> "ติดตามสถานะรายงานแบบไม่ระบุตัวตน"
            </p>
          </h4>
        </v-col>
      </v-row>

      <v-divider class="dividermagin"></v-divider>

       <v-row>
        <v-col>
          <h4 id="7">
            <v-btn text width="auto" height="auto"> <h1>7.</h1> </v-btn
            >จะทราบได้ยังไงว่าปัญหาได้รับทราบเเล้ว ?
            <p>
              ในหน้าต่างการรายงานปัญาหา จะมีสถานะบอกว่า <br />
              กำลังอยู่ในขั้นตอนที่หัวหน้ารับทราบเเล้วหรือยังบอก <br />
              เเล้วมีราบละเอียดที่เรากรอกไป ประกอบอยู่ด้วย
            </p>
          </h4>
        </v-col>
        <v-col align="center">
          <v-img
            src="../../assets/guidereport7.png"
            width="500px"
            height="300px"
          >
          </v-img>
        </v-col>
      </v-row>

      <v-divider class="dividermagin"></v-divider>

       <v-row>
        
        <v-col align="center">
          Copyright © Academic Petition Service 2022 All Right Reserved
        </v-col>
      </v-row>
    </div>
    <div>
      <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
      <v-btn fab color="#FFAB40" 
      fixed 
      bottom  
      right 
      large 
      elevated="1"
      v-bind="attrs"
      v-on="on"
      href="#"
      >
        <v-icon>mdi-arrow-up</v-icon>
        
      </v-btn>
      </template>

      

      </v-menu>
    </div>
  </div>
</template>

<script>
import NavbarUser from "../../components/NavbarUser.vue";
export default {
  name: "UserDashboard",
  components: {
    NavbarUser,
  },
  data() {
    return {
      
      profile: [
        {
          f_name: this.$store.getters.getUser.f_name,
          l_name: this.$store.getters.getUser.l_name,
          gender: this.$store.getters.getUser.gender,
          email: this.$store.getters.getUser.email,
          tel_num: this.$store.getters.getUser.tel_num,
          address: this.$store.getters.getUser.address,
          role: this.$store.getters.getUser.role,
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
.dividermagin {
  margin: 5%;
}

.box-margin {
  margin: 5%;
}
h1 {
  font-size: 50px;
}
h3 {
  color: #f0f0f0;
  padding: 2% 0% 0% 0%;
}
h4 {
  font-size: 20px;
  text-align: center;
  padding: 80px 0;
}
.red {
  background-color: red;
}
p {
  font-size: 15px;
}
h5 {
  color: red;
}
.fixbtn {
  z-index: 6;
  margin-bottom: 0px;
  transform-origin: center center;
}
.green{
  color: green;
}
</style>

