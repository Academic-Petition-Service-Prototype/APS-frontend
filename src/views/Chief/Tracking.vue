
<template>
  <div id="Trackingofficer" class="bg-color">
    <NavbarChief />
    <v-card class="cardmargin">
      <h2 class="text-center pa-5">
        สถานะคำร้อง
        <v-divider></v-divider>
      </h2>

      <!-- วนเเสดงรายการสถาณะเอสาร -->

      <v-expansion-panels>
        <v-expansion-panel
          v-for="listtracking in listtracking"
          :key="listtracking.num"
        >
          <v-expansion-panel-header>
            {{ listtracking.title }}
            <!-- เเสดงชื่อเอกสาร -->
            <v-spacer></v-spacer>

            <!-- เเสดงขั้นนตอน-->
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <!-- เเสดงเนื้อหาข้างใน -->

            <v-container id="inspire">
              <v-stepper alt-labels v-model="listtracking.checktracking">
                <v-stepper-header>
                  <v-stepper-step 
                  :complete="listtracking.checktracking > 1"
                  step="1"
                  color="green"
                   > ส่งยื่นคำร้อง </v-stepper-step>

                  <v-divider></v-divider>

                  <v-stepper-step
                  :complete="listtracking.checktracking > 2"
                  step="2" 
                  color="green"
                  > รับคำร้องเข้าระบบ </v-stepper-step>

                  <v-divider></v-divider>

                  <v-stepper-step 
                  :complete="listtracking.checktracking > 3"
                  step="3"
                  color="green">
                    การอนุมัติคำร้อง
                  </v-stepper-step>

                  <v-divider></v-divider>

                  <v-stepper-step 
                  :complete="listtracking.checktracking > 4"
                  step="4"
                  color="green"> ยื่นคำร้องสำเร็จ </v-stepper-step>

                  
                </v-stepper-header>
                <v-stepper-items>
                  <v-stepper-content step="1">
                    <v-card class="mb-12" color="grey lighten-1" height="200px">
                      <h2 class="cardshow">รายละเอียด</h2>
                    </v-card>
                  </v-stepper-content>

                  <v-stepper-content step="2">
                    <v-card class="mb-12" color="grey lighten-1" height="200px">
                      <h2 class="cardshow">รายละเอียด</h2>
                    </v-card>
                  </v-stepper-content>

                  <v-stepper-content step="3">
                    <v-card class="mb-12" color="grey lighten-1" height="200px">
                      <h2 class="cardshow">รายละเอียด</h2>
                    </v-card>
                  </v-stepper-content>


                  <v-stepper-content step="4">
                    <v-card class="mb-12" color="grey lighten-1" height="200px">
                      <h2 class="cardshow">รายละเอียด</h2>
                    </v-card>
                  </v-stepper-content>


                </v-stepper-items>
              </v-stepper>
            </v-container>

            <!-- เเสดงเนื้อหาข้างใน -->
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </div>
</template>

<script>
import NavbarChief from "../../components/NavbarChief.vue";
export default {
  name: "TrackingChief",
  components: {
    NavbarChief,
  },
  data() {
    return {
      listtracking: [
        {
          num: 1,
          title: "เอกสารที่1",
          pointracking: 6,
          checktracking: 3,
          e1: 1,
        },
        {
          num: 2,
          title: "เอกสารที่2",
          pointracking: 2,
          checktracking: 3,
          e1: 1,
        },
        {
          num: 3,
          title: "เอกสารที่2",
          pointracking: 2,
          checktracking: 1,
          e1: 1,
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
</style>