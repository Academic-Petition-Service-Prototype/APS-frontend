// Global
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import About from '../views/About.vue'
// Global

//User
import UserDashboard from '../views/User/Dashboard.vue'
import UserPetition from '../views/User/Petition.vue'
import UserProfile from '../views/User/Profile.vue'
import UserReport from '../views/User/Report.vue'
import UserReportTracking from '../views/User/Reporttracking.vue'
import UserTracking from '../views/User/Tracking.vue'
import UserSentpetition from '../views/User/Sentpetition.vue'
import UserRequest from '../views/User/Request.vue'
import UserRequestTracking from '../views/User/Requesttracking.vue'
import Trackingdetail from '../views/User/Trackingdetail.vue'



//User

//Officer
import OfficerDashboard from '../views/Officer/Dashboard.vue'
import OfficerPetitionManagement from '../views/Officer/PetitionManagement.vue'
import OfficerProfile from '../views/Officer/Profile.vue'
import OfficerTracking from '../views/Officer/Tracking.vue'
import OfficerCreatepetition from'../views/Officer/Createpetition.vue'
//Officer

//Chief
import ChiefCheckapprovedlist from '../views/Chief/Checkapprovedlist.vue'
import ChiefDashboard from '../views/Chief/Dashboard.vue'
import ChiefOfficerManagement from '../views/Chief/OfficerManagement.vue'
import ChiefPetitionManagement from '../views/Chief/PetitionManagement.vue'
import ChiefProfile from '../views/Chief/Profile.vue'
import ChiefReport from '../views/Chief/Report.vue'
import ChiefSecretaryManagement from '../views/Chief/SecretaryManagement.vue'
import ChiefTracking from '../views/Chief/Tracking.vue'
import ChiefReportDetail from '../views/Chief/ReportDetail.vue'
import Approvaldetaill from '../views/Chief/Approvaldetaill.vue'
import ChiefCreatepetition from'../views/Chief/Createpetition.vue'
import Approvedlist from'../views/Chief/Approvedlist.vue'
import ViweApprovedlist from'../views/Chief/ViweApprovedlist.vue'
import Disapprovedlist from'../views/Chief/Disapprovedlist.vue'
import ViweDisapprovedlist from'../views/Chief/ViweDisapprovedlist.vue'
import ChiefRequest from'../views/Chief/Request.vue'
import ChiefRequestDetail from'../views/Chief/Requestdetail.vue'

//Chief

//Secretary
import SecretaryDashboard from '../views/Secretary/Dashboard.vue'
import SecretaryProfile from '../views/Secretary/Profile.vue'
import SecretaryTracking from '../views/Secretary/Tracking.vue'
import SecretaryViewApproval from '../views/Secretary/ViewApproval.vue'
import SecretaryViewApprovaldetail from '../views/Secretary/ViewApprovaldetail.vue'
import SecretaryViewReport from '../views/Secretary/ViewReport.vue'
import Secretaryrequestlist from '../views/Secretary/Secretaryrequestlist.vue'
import Secretaryrequestlistdetail from '../views/Secretary/Secretaryrequestlistdetail.vue'
//Secretary

//Admin
import AdminChiefManagement from '../views/Admin/ChiefManagement.vue'
import AdminDashboard from '../views/Admin/Dashboard.vue'
import AdminOfficerManagement from '../views/Admin/OfficerManagement.vue'
import AdminProfile from '../views/Admin/Profile.vue'
import AdminSecretaryManagement from '../views/Admin/SecretaryManagement.vue'
import AdminTracking from '../views/Admin/Tracking.vue'
import AdminUserManagement from '../views/Admin/UserManagement.vue'
import AdminViewApproval from '../views/Admin/ViewAdminApproval.vue'
import AdminViewReport from '../views/Admin/ViewReport.vue'
import AdminAgencyManagement from '../views/Admin/AgencyManagement.vue'
import AdminViwerequestlist from '../views/Admin/AdminViwerequestlist.vue'
import AdminViewApprovaldetail from '../views/Admin/ViewAdminApprovaldetail.vue'

//Admin

//Other
import viewpentitiontrackingbyofficer from '../views/Other/viewpentitiontrackingbyofficer.vue'
//Other


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
    path: '/ChiefTracking',
    name: 'ติดตามสถานะคำร้อง',
    component: ChiefTracking 
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
    name: 'การร้องขอคำร้องที่ไม่มีในระบบ',
    component: ChiefRequest 
  },
  {
    path: '/ChiefRequestDetail/:id',
    name: 'ChiefRequestDetail',
    component: ChiefRequestDetail 
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
    name: 'การร้องขอคำร้องที่ไม่มีในระบบ',
    component: Secretaryrequestlist
  },
  {
    path: '/Secretaryrequestlistdetail/:id',
    name: 'รายละเอียดการร้องขอคำร้องที่ไม่มีในระบบ',
    component: Secretaryrequestlistdetail
  },
 
  //Secretary

  //Admin
  {
    path: '/AdminChiefManagement',
    name: 'AdminChiefManagement',
    component: AdminChiefManagement 
  },
  {
    path: '/AdminDashboard',
    name: 'AdminDashboard',
    component: AdminDashboard 
  },
  {
    path: '/AdminOfficerManagement',
    name: 'AdminOfficerManagement',
    component: AdminOfficerManagement 
  },
  {
    path: '/AdminProfile',
    name: 'AdminProfile',
    component: AdminProfile 
  },
  {
    path: '/AdminSecretaryManagement',
    name: 'AdminSecretaryManagement',
    component: AdminSecretaryManagement 
  },
  {
    path: '/AdminTracking',
    name: 'AdminTracking',
    component: AdminTracking 
  },
  {
    path: '/AdminUserManagement',
    name: 'AdminUserManagement',
    component: AdminUserManagement 
  },
 
  {
    path: '/AdminViewReport',
    name: 'AdminViewReport',
    component: AdminViewReport 
  },
  {
    path: '/AdminAgencyManagement',
    name: 'AdminAgencyManagement',
    component: AdminAgencyManagement 
  },
  {
    path: '/AdminViwerequestlist',
    name: 'AdminViwerequestlist',
    component: AdminViwerequestlist 
  },
  {
    path: '/AdminViewApproval',
    name: 'AdminViewApproval',
    component: AdminViewApproval 
  },
  {
    path: '/AdminViewApproval/:id',
    name: 'AdminViewApprovaldetail',
    component: AdminViewApprovaldetail 
  },
  
  
  //Admin

  //Other
  {
    path: '/viewpentitiontrackingbyofficer',
    name: 'viewpentitiontrackingbyofficer',
    component: viewpentitiontrackingbyofficer 
  },
  //Other

  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
