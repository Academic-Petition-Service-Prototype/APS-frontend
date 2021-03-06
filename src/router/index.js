// Global
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import About from '../views/About.vue'
import PageNotFound from '../views/PageNotFound.vue'
// Global

//User
import UserDashboard from '../views/User/Dashboard.vue'
import UserPetition from '../views/User/Petition.vue'
import UserProfile from '../views/User/Profile.vue'
import UserReport from '../views/User/Report.vue'
import UserReportTracking from '../views/User/Reporttracking.vue'
import UserTracking from '../views/User/Tracking.vue'
import UserSentpetition from '../views/User/Sentpetition.vue'
import UserEditSentpetition from '../views/User/Editsentpetition.vue'
import UserRequest from '../views/User/Request.vue'
import UserRequestTracking from '../views/User/Requesttracking.vue'
import Trackingdetail from '../views/User/Trackingdetail.vue'
import guidepentions from '../views/User/guidepentions.vue'
import guidereport from '../views/User/guidereport.vue'
import guiderequest from '../views/User/guiderequest.vue'
//User

//Officer
import OfficerDashboard from '../views/Officer/Dashboard.vue'
import OfficerPetitionManagement from '../views/Officer/PetitionManagement.vue'
import OfficerEditPetition from '../views/Officer/Editpetition.vue'
import OfficerProfile from '../views/Officer/Profile.vue'
import OfficerTracking from '../views/Officer/Tracking.vue'
import OfficerTrackingdetail from '../views/Officer/Trackingdetail.vue'
import OfficerCreatepetition from'../views/Officer/Createpetition.vue'
//Officer

//Chief
import ChiefCheckapprovedlist from '../views/Chief/Checkapprovedlist.vue'
import ChiefDashboard from '../views/Chief/Dashboard.vue'
import ChiefOfficerManagement from '../views/Chief/OfficerManagement.vue'
import ChiefOfficerEdit from '../views/Chief/Editofficer.vue'
import ChiefPetitionManagement from '../views/Chief/PetitionManagement.vue'
import ChiefProfile from '../views/Chief/Profile.vue'
import ChiefReport from '../views/Chief/Report.vue'
import ChiefSecretaryManagement from '../views/Chief/SecretaryManagement.vue'
import ChiefSecretaryEdit from '../views/Chief/Editsecretary.vue'
import ChiefTagMenagement from '../views/Chief/TagManagement.vue'
import ChiefTagEdit from '../views/Chief/Edittag.vue'
import ChiefTracking from '../views/Chief/Tracking.vue'
import ChiefReportDetail from '../views/Chief/ReportDetail.vue'
import Approvaldetaill from '../views/Chief/Approvaldetaill.vue'
import ChiefCreatepetition from'../views/Chief/Createpetition.vue'
import ChiefEditpetition from'../views/Chief/Editpetition.vue'
import Approvedlist from'../views/Chief/Approvedlist.vue'
import ViweApprovedlist from'../views/Chief/ViweApprovedlist.vue'
import Disapprovedlist from'../views/Chief/Disapprovedlist.vue'
import ViweDisapprovedlist from'../views/Chief/ViweDisapprovedlist.vue'
import ChiefRequest from'../views/Chief/Request.vue'
import ChiefRequestDetail from'../views/Chief/Requestdetail.vue'
import ChiefTrackingdetail from'../views/Chief/Trackingdetail.vue'

//Chief

//Secretary
import SecretaryDashboard from '../views/Secretary/Dashboard.vue'
import SecretaryProfile from '../views/Secretary/Profile.vue'
import SecretaryTracking from '../views/Secretary/Tracking.vue'
import SecretaryTrackingdetail from '../views/Secretary/Trackingdetail.vue'
import SecretaryViewApproval from '../views/Secretary/ViewApproval.vue'
import SecretaryViewApprovaldetail from '../views/Secretary/ViewApprovaldetail.vue'
import SecretaryViewReport from '../views/Secretary/ViewReport.vue'
import Secretaryrequestlist from '../views/Secretary/Secretaryrequestlist.vue'
import Secretaryrequestlistdetail from '../views/Secretary/Secretaryrequestlistdetail.vue'
//Secretary

//Admin
import AdminChiefManagement from '../views/Admin/ChiefManagement.vue'
import AdminAdminManagement from '../views/Admin/AdminManagement.vue'
import AdminChiefEdit from '../views/Admin/Editchief.vue'
import AdminDashboard from '../views/Admin/Dashboard.vue'
import AdminOfficerManagement from '../views/Admin/OfficerManagement.vue'
import AdminOfficerEdit from '../views/Admin/Editofficer.vue'
import AdminProfile from '../views/Admin/Profile.vue'
import AdminSecretaryManagement from '../views/Admin/SecretaryManagement.vue'
import AdminSecretaryEdit from '../views/Admin/Editsecretary.vue'
import AdminTracking from '../views/Admin/Tracking.vue'
import AdminUserManagement from '../views/Admin/UserManagement.vue'
import AdminUserEdit from '../views/Admin/Edituser.vue'
import AdminViewApproval from '../views/Admin/ViewAdminApproval.vue'
import AdminViewReport from '../views/Admin/ViewReport.vue'
import AdminAgencyManagement from '../views/Admin/AgencyManagement.vue'
import AdminAgencyEdit from '../views/Admin/Editagency.vue'
import AdminViwerequestlist from '../views/Admin/AdminViwerequestlist.vue'
import AdminViewApprovaldetail from '../views/Admin/ViewAdminApprovaldetail.vue'
import AdminTagManagement from '../views/Admin/TagManagement.vue'
import AdminTagEdit from '../views/Admin/Edittag.vue'
//Admin

Vue.use(VueRouter)

const routes = [
  // Global
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/About',
    name: 'About',
    component: About
  },

  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  // Global

  //User
  {
    path: '/UserDashboard',
    name: 'หน้าแรก',
    component: UserDashboard
  },
  {
    path: '/UserPetition',
    name: 'ส่งคำร้อง',
    component: UserPetition
  },
  {
    path: '/UserProfile',
    name: 'โปรไฟล์',
    component: UserProfile
  },
  {
    path: '/UserReport',
    name: 'รายงานปัญหาไม่ระบุตัวตน',
    component: UserReport
  },
  {
    path: '/UserReportTracking',
    name: 'ติดตามสถานะรายงานปัญหาไม่ระบุตัวตน',
    component: UserReportTracking
  },
  {
    path: '/UserTracking',
    name: 'ติดตามสถานะคำร้อง',
    component: UserTracking
  },
  {
    path: '/UserSentpetition/:id',
    name: 'ส่งคำร้อง',
    component: UserSentpetition 
  },
  {
    path: '/UserEditSentpetition/:id',
    name: 'แก้ไขการส่งคำร้อง',
    component: UserEditSentpetition 
  },
  {
    path: '/UserRequestTracking',
    name: 'ติดตามสถานะการร้องขอคำร้องเพิ่มเติม',
    component: UserRequestTracking 
  },
  {
    path: '/UserRequest',
    name: 'การร้องขอคำร้องเพิ่มเติม',
    component: UserRequest 
  },
  {
    path: '/Trackingdetail/:id',
    name: 'รายละเอียดคำร้อง',
    component: Trackingdetail 
  },
  {
    path: '/guidepentions',
    name: 'วิธีใช้งาน การส่งคำร้อง',
    component: guidepentions 
  },
  {
    path: '/guidereport',
    name: 'วิธีใช้งาน การรายงานปัญหา ',
    component: guidereport 
  },
  {
    path: '/guiderequest',
    name: 'วิธีใช้งาน การร้องขอคำร้องเพิ่มเติม ',
    component: guiderequest 
  },
  
  
  
  
  //User

  //Officer
  
  {
    path: '/OfficerDashboard',
    name: 'หน้าแรก',
    component: OfficerDashboard
  },
  {
    path: '/OfficerPetitionManagement',
    name: 'จัดการคำร้อง',
    component: OfficerPetitionManagement
  },
  {
    path: '/OfficerEditPetition/:id',
    name: 'แก้ไขคำร้อง',
    component: OfficerEditPetition 
  },
  {
    path: '/OfficerProfile',
    name: 'โปรไฟล์',
    component: OfficerProfile 
  },
  {
    path: '/OfficerTracking',
    name: 'ติดตามสถานะคำร้อง',
    component: OfficerTracking 
  },
  {
    path: '/OfficerTrackingdetail/:id',
    name: 'รายละเอียดสถานะคำร้อง',
    component: OfficerTrackingdetail 
  },
  {
    path: '/OfficerCreatepetition',
    name: 'สร้างคำร้อง',
    component: OfficerCreatepetition 
  },
  
  //Officer

  //Chief
  {
    path: '/ChiefCheckapprovedlist',
    name: 'คำร้องที่รอการอนุมัติ',
    component: ChiefCheckapprovedlist 
  },
  {
    path: '/Approvedlist',
    name: 'คำร้องที่อนุมัติแล้ว',
    component: Approvedlist 
  },
  {
    path: '/ChiefDashboard',
    name: 'หน้าแรก',
    component: ChiefDashboard 
  },
  {
    path: '/ChiefOfficerManagement',
    name: 'จัดการพนักงาน',
    component: ChiefOfficerManagement 
  },
  {
    path: '/ChiefOfficerEdit/:id',
    name: 'แก้ไขพนักงาน',
    component: ChiefOfficerEdit
  },
  {
    path: '/ChiefPetitionManagement',
    name: 'จัดการคำร้อง',
    component: ChiefPetitionManagement 
  },
  {
    path: '/ChiefProfile',
    name: 'โปรไฟล์',
    component: ChiefProfile 
  },
  {
    path: '/ChiefReport',
    name: 'การรายงานปัญหา',
    component: ChiefReport 
  },
  {
    path: '/ChiefSecretaryManagement',
    name: 'จัดการเลขานุการ',
    component: ChiefSecretaryManagement 
  },
  {
    path: '/ChiefSecretaryEdit/:id',
    name: 'แก้ไขเลขานุการ',
    component: ChiefSecretaryEdit
  },
  {
    path: '/ChiefTracking',
    name: 'ติดตามสถานะคำร้อง',
    component: ChiefTracking 
  },
  
  {
    path: '/ChiefTrackingdetail/:id',
    name: 'รายละเอียดสถานะคำร้อง',
    component: ChiefTrackingdetail 
  },
  {
    path: '/ChiefReportDetail/:id',
    name: 'รายละเอียดการรายงานปัญหา',
    component: ChiefReportDetail 
  },
  {
    path: '/Approvaldetaill/:id',
    name: 'รายละเอียดคำร้องที่อนุมัติแล้ว',
    component: Approvaldetaill 
  },
  {
    path: '/ViweApprovedlist/:id',
    name: 'รายละเอียดคำร้อง',
    component: ViweApprovedlist 
  },
  {
    path: '/ChiefCreatepetition',
    name: 'สร้างคำร้อง',
    component: ChiefCreatepetition 
  },
  {
    path: '/ChiefEditpetition/:id',
    name: 'แก้ไขคำร้อง',
    component: ChiefEditpetition,
  },
  {
    path: '/Disapprovedlist',
    name: 'คำร้องที่ไม่อนุมัติ',
    component: Disapprovedlist 
  },
  {
    path: '/ViweDisapprovedlist/:id',
    name: 'รายละเอียดคำร้องที่ไม่อนุมัติ',
    component: ViweDisapprovedlist 
  },
  {
    path: '/ChiefRequest',
    name: 'การร้องขอคำร้องเพิ่มเติม',
    component: ChiefRequest 
  },
  {
    path: '/ChiefRequestDetail/:id',
    name: 'รายละเอียดการร้องขอคำร้องเพิ่มเติม',
    component: ChiefRequestDetail 
  },
  {
    path: '/ChiefTagMenagement',
    name: 'จัดการหมวดหมู่คำร้อง',
    component: ChiefTagMenagement 
  },
  {
    path: '/ChiefTagEdit/:id',
    name: 'แก้ไขหมวดหมู่คำร้อง',
    component: ChiefTagEdit 
  },

  //Chief

  //Secretary
  {
    path: '/SecretaryDashboard',
    name: 'หน้าแรก',
    component: SecretaryDashboard
  },
  {
    path: '/SecretaryProfile',
    name: 'โปรไฟล์',
    component: SecretaryProfile
  },
  {
    path: '/SecretaryTracking',
    name: 'ติดตามสถานะคำร้อง',
    component: SecretaryTracking
  },
  {
    path: '/SecretaryViewApproval',
    name: 'การอนุมัติคำร้อง',
    component: SecretaryViewApproval
  },
  {
    path: '/SecretaryViewReport',
    name: 'การรายงานปัญหา',
    component: SecretaryViewReport
  },
  {
    path: '/ViewApprovaldetail/:id',
    name: 'รายละเอียดคำร้อง',
    component: SecretaryViewApprovaldetail
  },
  {
    path: '/Secretaryrequestlist',
    name: 'การร้องขอคำร้องเพิ่มเติม',
    component: Secretaryrequestlist
  },
  {
    path: '/Secretaryrequestlistdetail/:id',
    name: 'รายละเอียดการร้องขอคำร้องเพิ่มเติม',
    component: Secretaryrequestlistdetail
  },
  {
    path: '/SecretaryTrackingdetail/:id',
    name: 'รายละเอียดสถานะคำร้อง',
    component: SecretaryTrackingdetail
  },

  
 
  //Secretary

  //Admin
  {
    path: '/AdminChiefManagement',
    name: 'จัดการหัวหน้าหน่วยงาน',
    component: AdminChiefManagement 
  },
  {
    path: '/AdminChiefEdit/:id',
    name: 'แก้ไขหัวหน้าหน่วยงาน',
    component: AdminChiefEdit 
  },
  {
    path: '/AdminAdminManagement',
    name: 'จัดการผู้ดูแลระบบ',
    component: AdminAdminManagement 
  },
  {
    path: '/AdminDashboard',
    name: 'หน้าแรก',
    component: AdminDashboard 
  },
  {
    path: '/AdminOfficerManagement',
    name: 'จักการพนักงาน',
    component: AdminOfficerManagement 
  },
  {
    path: '/AdminOfficerEdit/:id',
    name: 'แก้ไขเลขานุการ',
    component: AdminOfficerEdit 
  },
  {
    path: '/AdminProfile',
    name: 'โปรไฟล์',
    component: AdminProfile 
  },
  {
    path: '/AdminSecretaryManagement',
    name: 'จัดการเลขานุการ',
    component: AdminSecretaryManagement 
  },
  {
    path: '/AdminSecretaryEdit/:id',
    name: 'แก้ไขเลขานุการ',
    component: AdminSecretaryEdit 
  },
  {
    path: '/AdminTracking',
    name: 'ติดตามสถานะคำร้อง',
    component: AdminTracking 
  },
  {
    path: '/AdminUserManagement',
    name: 'จัดการผู้ยื่นคำร้อง',
    component: AdminUserManagement 
  },
  {
    path: '/AdminUserEdit/:id',
    name: 'แก้ไขผู้ยื่นคำร้อง',
    component: AdminUserEdit 
  },
  {
    path: '/AdminViewReport',
    name: 'การรายงานปัญหา',
    component: AdminViewReport 
  },
  {
    path: '/AdminAgencyManagement',
    name: 'จัดการหน่วยงาน',
    component: AdminAgencyManagement 
  },
  {
    path: '/AdminAgencyEdit/:id',
    name: 'แก้ไขหน่วยงาน',
    component: AdminAgencyEdit 
  },
  {
    path: '/AdminViwerequestlist',
    name: 'การร้องขอคำร้องเพิ่มเติม',
    component: AdminViwerequestlist 
  },
  {
    path: '/AdminViewApproval',
    name: 'การอนุมัติคำร้อง',
    component: AdminViewApproval 
  },
  {
    path: '/AdminViewApproval/:id',
    name: 'AdminViewApprovaldetail',
    component: AdminViewApprovaldetail 
  },
  {
    path: '/AdminTagManagement',
    name: 'แก้ไขหมวดหมู่คำร้อง',
    component: AdminTagManagement 
  },
  {
    path: '/AdminTagEdit/:id',
    name: 'จัดการหมวดหมู่คำร้อง',
    component: AdminTagEdit 
  },
  //Admin

  //Other
  {
    path: "/:pathMatch(.*)*",
    name: 'Page not found 404',
    component: PageNotFound
  },
  //Other
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
