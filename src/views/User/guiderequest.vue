<template>
  <!-- ส่วนจัดเเสดง -->
  <div id="UserGuideRequest">
    <NavbarUser />
    <div class="cardmargin">
      <v-row>
        <v-col id="#">
          <v-btn text width="auto" height="auto" class="cardmargin">
            <h1>#การร้องขอคำร้องเพิ่มเติม</h1>
          </v-btn>
          <v-divider class="dividermagin"></v-divider>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <h4 id="1">
            <v-btn text width="auto" height="auto"> <h1>1.</h1> </v-btn
            >เมื่อผู้ใช้งานต้องการที่จะยื่นคำร้องเพิ่มเติม ไปที่เมนู <br />
            "การร้องขอคำร้องเพิ่มเติม"
          </h4>
        </v-col>
        <v-col align="center">
          <v-img
            src="../../assets/guiderequest1.png"
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
            src="../../assets/guiderequest2.png"
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
            src="../../assets/guiderequest3.png"
            width="500px"
            height="300px"
          >
          </v-img>
        </v-col>
      </v-row>

      <v-divider class="dividermagin"></v-divider>

      <v-row>
        <v-col>
          <h4 id="4">
            <v-btn text width="auto" height="auto">
              <h1>
                #การติดตามการร้องขอ <br />
                คำร้องเพิ่มเติม
              </h1>
            </v-btn>
            <br />
          </h4>
        </v-col>
      </v-row>

      <v-divider class="dividermagin"></v-divider>

      <v-row>
        <v-col>
          <h4 id="4">
            <v-btn text width="auto" height="auto"> <h1>4.</h1> </v-btn
            >สามารถติดตามการร้องขอคำร้องเพิ่มเติม
            <p>
              โดยไปที่แทบเมนู เลือก <br />
              "ติดตามสถานะการร้องขอคำร้องเพิ่มเติม"
            </p>
          </h4>
        </v-col>
        <v-col align="center">
          <v-img
            src="../../assets/guiderequest4.png"
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
            src="../../assets/guiderequest5.png"
            width="500px"
            height="350px"
          >
          </v-img>
        </v-col>
        <v-col>
          <h4 id="5">
            <v-btn text width="auto" height="auto"> <h1>5.</h1> </v-btn>
            จะทราบได้ยังไงว่าการร้องขอเพิ่มเติมได้รับทราบเเล้ว ?
            <p>
              ในหน้าต่างการร้องขอเพิ่มเติม จะมีสถานะบอกว่า <br />
              กำลังอยู่ในขั้นตอนที่หัวหน้ารับทราบเเล้วหรือยังบอก <br />
              เเล้วมีราบละเอียดที่เรากรอกไป ประกอบอยู่ด้วย
            </p>
          </h4>
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
          <v-btn
            fab
            color="#FFAB40"
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
  name: "UserGuideRequest",
  components: {
    NavbarUser,
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
.green {
  color: green;
}
</style>
