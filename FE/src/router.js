import AdminManager from "./components/AdminManager";
import Dashboard from "./components/Dashboard";
import UserProjects from "./components/UserProjects";
import EditProject from "./components/EditProject";
// import EditProfile from "./components/EditProfile";
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: "/",
      name: "Dashboard",
      component: Dashboard,
    },
    {
      path: "/admin-manager",
      name: "AdminManager",
      component: AdminManager,
    },
    {
      path: "/user-projects",
      name: "UserProjects",
      component: UserProjects,
    },
    {
      path: "/edit-project/:id",
      name: "EditProject",
      component: EditProject,
    },
    /*{
      path: "/edit-profile",
      name: "EditProfile",
      component: EditProfile,
    },*/
  ]
});

export default router;