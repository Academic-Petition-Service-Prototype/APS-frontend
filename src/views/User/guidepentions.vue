<template>
  <!-- ส่วนจัดเเสดง -->
  <div id="UserDashboard">
    <NavbarUser />
    <div class="cardmargin">
      <v-row>
        <v-col id="#">
          <v-btn text width="auto" height="auto" class="cardmargin">
            <h1>#การส่งคำร้อง</h1>
          </v-btn>
          <v-divider class="dividermagin"></v-divider>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <h4 id="1">
            <v-btn text width="auto" height="auto"> <h1>1.</h1> </v-btn
            >เมื่อผู้ใช้งานต้องการที่จะยื่นคำร้อง ! ไปที่เมนู "ส่งคำร้อง"
          </h4>
        </v-col>
        <v-col align="center">
          <v-img
            src="../../assets/gudesenpentions1.png"
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
            src="../../assets/gudesenpentions2.png"
            width="500px"
            height="350px"
          >
          </v-img>
        </v-col>
        <v-col>
          <h4 id="2">
            <v-btn text width="auto" height="auto"> <h1>2.</h1> </v-btn>
            เลือกแบบคำร้อง ที่ท่านต้องการยื่นคำร้องที่มีภายในระบบของท่าน
            <br />
          </h4>
        </v-col>
      </v-row>

      <v-divider class="dividermagin"></v-divider>

      <v-row>
        <v-col>
          <h4 id="3">
            <v-btn text width="auto" height="auto"> <h1>3.</h1> </v-btn
            >ท่านสามารถเลือกการค้นหาคำร้องโดยช่องค้นหาตามหมวดหมู่
          </h4>
        </v-col>
        <v-col align="center">
          <v-img
            src="../../assets/gudesenpentions3.png"
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
            src="../../assets/gudesenpentions4.png"
            width="500px"
            height="350px"
          >
          </v-img>
        </v-col>
        <v-col>
          <h4 id="4">
            <v-btn text width="auto" height="auto"> <h1>4.</h1> </v-btn>
            กรอกข้อมูลตามรายละเอียดคำร้องที่ท่านเลือก
            <br />
          </h4>
        </v-col>
      </v-row>

      <v-divider class="dividermagin"></v-divider>

      <v-row>
        <v-col>
          <h4 id="5">
            <v-btn text width="auto" height="auto"> <h1>5.</h1> </v-btn
            >ท่านสามารถติดตามคำร้องหลังจากท่านทำการส่งคำร้องไปแล้ว
            <p>
              หลังจากส่งคำร้องไปยังผู้อนุมัติแล้ว <br />
              ท่านสามารถทรายสถานะเอกสารของท่านได้โดยแถบเมนู <br />
              "ติดตามสถานะคำร้อง"
            </p>
          </h4>
        </v-col>
        <v-col align="center">
          <v-img
            src="../../assets/gudesenpentions5.png"
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
            src="../../assets/gudesenpentions6.png"
            width="500px"
            height="350px"
          >
          </v-img>
        </v-col>
        <v-col>
          <h4 id="6">
            <v-btn text width="auto" height="auto"> <h1>6.</h1> </v-btn>
            เมื่อคำร้องของท่าน
            <h5>ไม่ถูกอนุมัติ !</h5>
            <br />
            <p>
              เมื่อคำร้องของท่านถูกผู้อนุมัติปฏิเสธการยื่นคำร้องระบบจะมีการเเต้งเตือนพร้อมแสดงรายละเอียดจากผู้อนุมัติโดยตรงเพื่อแก้ไข
            </p>
          </h4>
        </v-col>
      </v-row>

      <v-divider class="dividermagin"></v-divider>

       <v-row>
        <v-col>
          <h4 id="7">
            <v-btn text width="auto" height="auto"> <h1>7.</h1> </v-btn
            >เมื่อได้รับการอนุมัติหมดเแล้ว ?
            <p>
              หลังจากส่งคำร้องไปยังผู้อนุมัติแล้ว <br />
              เเล้วผ่านการอนุมัติทั้งหมดในรายละเอียดจะเเสดง <br />
              รายละเอียดคำร้องของท่านว่าผ่านการอนุมัติแล้ว
            </p>
          </h4>
        </v-col>
        <v-col align="center">
          <v-img
            src="../../assets/gudesenpentions7.png"
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

