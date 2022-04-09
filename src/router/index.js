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
import requestlist from'../views/Chief/requestlist.vue'
import requestlistdetail from'../views/Chief/requestlistdetail.vue'

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
import AdminViewApproval from '../views/Admin/ViewApproval.vue'
import AdminViewReport from '../views/Admin/ViewReport.vue'
import AdminAgencyManagement from '../views/Admin/AgencyManagement.vue'

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
    name: 'UserDashboard',
    component: UserDashboard
  },
  {
    path: '/UserPetition',
    name: 'UserPetition',
    component: UserPetition
  },
  {
    path: '/UserProfile',
    name: 'UserProfile',
    component: UserProfile
  },
  {
    path: '/UserReport',
    name: 'UserReport',
    component: UserReport
  },
  {
    path: '/UserReportTracking',
    name: 'UserReportTracking',
    component: UserReportTracking
  },
  {
    path: '/UserTracking',
    name: 'UserTracking',
    component: UserTracking
  },
  {
    path: '/UserSentpetition/:id',
    name: 'UserSentpetition',
    component: UserSentpetition 
  },
  {
    path: '/UserRequestTracking',
    name: 'UserRequestTracking',
    component: UserRequestTracking 
  },
  {
    path: '/UserRequest',
    name: 'UserRequest',
    component: UserRequest 
  },
  {
    path: '/Trackingdetail',
    name: 'Trackingdetail',
    component: Trackingdetail 
  },
  {
    path: '/Trackingdetail/:id',
    name: 'Trackingdetail',
    component: Trackingdetail 
  },
  
  
  //User

  //Officer
  
  {
    path: '/OfficerDashboard',
    name: 'OfficerDashboard',
    component: OfficerDashboard
  },
  {
    path: '/OfficerPetitionManagement',
    name: 'OfficerPetitionManagement',
    component: OfficerPetitionManagement
  },
  {
    path: '/OfficerProfile',
    name: 'OfficerProfile',
    component: OfficerProfile 
  },
  {
    path: '/OfficerTracking',
    name: 'OfficerTracking',
    component: OfficerTracking 
  },
  {
    path: '/OfficerCreatepetition',
    name: 'OfficerCreatepetition',
    component: OfficerCreatepetition 
  },
  //Officer

  //Chief
  {
    path: '/ChiefCheckapprovedlist',
    name: 'ChiefCheckapprovedlist',
    component: ChiefCheckapprovedlist 
  },
  {
    path: '/Approvedlist',
    name: 'Approvedlist',
    component: Approvedlist 
  },
  {
    path: '/ViweApprovedlist',
    name: 'ViweApprovedlist',
    component: ViweApprovedlist 
  },
  {
    path: '/ChiefDashboard',
    name: 'ChiefDashboard',
    component: ChiefDashboard 
  },
  {
    path: '/ChiefOfficerManagement',
    name: 'ChiefOfficerManagement',
    component: ChiefOfficerManagement 
  },
  {
    path: '/ChiefPetitionManagement',
    name: 'ChiefPetitionManagement',
    component: ChiefPetitionManagement 
  },
  {
    path: '/ChiefProfile',
    name: 'ChiefProfile',
    component: ChiefProfile 
  },
  {
    path: '/ChiefReport',
    name: 'ChiefReport',
    component: ChiefReport 
  },
  {
    path: '/ChiefSecretaryManagement',
    name: 'ChiefSecretaryManagement',
    component: ChiefSecretaryManagement 
  },
  {
    path: '/ChiefTracking',
    name: 'ChiefTracking',
    component: ChiefTracking 
  },
  {
    path: '/ChiefReportDetail/:id',
    name: 'ChiefReportDetail',
    component: ChiefReportDetail 
  },
  {
    path: '/Approvaldetaill/:id',
    name: 'Approvaldetaill',
    component: Approvaldetaill 
  },
  {
    path: '/ViweApprovedlist/:id',
    name: 'ViweApprovedlist',
    component: ViweApprovedlist 
  },
  {
    path: '/ChiefCreatepetition',
    name: 'ChiefCreatepetition',
    component: ChiefCreatepetition 
  },
  {
    path: '/Disapprovedlist',
    name: 'Disapprovedlist',
    component: Disapprovedlist 
  },
  {
    path: '/ViweDisapprovedlist/:id',
    name: 'ViweDisapprovedlist',
    component: ViweDisapprovedlist 
  },
  {
    path: '/requestlist',
    name: 'requestlist',
    component: requestlist 
  },
  {
    path: '/requestlistdetail/',
    name: 'ViweDisapprovedlist',
    component: requestlistdetail 
  },
  {
    path: '/requestlistdetail/:id',
    name: 'ViweDisapprovedlist',
    component: requestlistdetail 
  },
  

  //Chief

  //Secretary
  {
    path: '/SecretaryDashboard',
    name: 'แดชบอร์ด',
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
    name: 'SecretaryViewApprovaldetail',
    component: SecretaryViewApprovaldetail
  },
  {
    path: '/Secretaryrequestlist',
    name: 'รายงานการร้องขอ',
    component: Secretaryrequestlist
  },
  {
    path: '/Secretaryrequestlistdetail/:id',
    name: 'Secretaryrequestlistdetail',
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
    path: '/AdminViewApproval',
    name: 'AdminViewApproval',
    component: AdminViewApproval 
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
