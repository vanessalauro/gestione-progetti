import Login from "./components/Login";
import AdminManager from "./components/AdminManager";
import Dashboard from "./components/Dashboard";
import UserProjects from "./components/UserProjects";
import EditProject from "./components/EditProject";
import Register from "./components/Register";
// import EditProfile from "./components/EditProfile";
// import VueRouter from 'vue-router';

import { createRouter, createWebHistory, RouterLink, RouterView } from 'vue-router';

const routes = [
  {
    path: "/",
    redirect: "/dashboard"
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true // Pagina che richiede autenticazione
    },
    children: [
      {
        path: "/user-projects",
        name: "UserProjects",
        component: UserProjects,
        meta: {
          requiresAuth: true // Pagina che richiede autenticazione
        }
      },
      {
        path: "/edit-project/:id",
        name: "EditProject",
        component: EditProject,
        meta: {
          requiresAuth: true // Pagina che richiede autenticazione
        }
      },
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      requiresAuth: false // Pagina senza autenticazione
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      requiresAuth: false // Pagina senza autenticazione
    }
  }
  /*{
    path: "/admin-manager",
    name: "AdminManager",
    component: AdminManager,
    meta: {
      requiresAuth: true // Pagina che richiede autenticazione
    }
  },*/
  /*{
    path: "/edit-profile",
    name: "EditProfile",
    component: EditProfile,
  },*/
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

/* router.beforeEach((to, from, next) => {
  // Check if the user is authenticated
  if (!localStorage.getItem("token")) {
    // Redirect to the login page
    next({ path: "/login" });
  } else {
    // The user is authenticated, so proceed to the dashboard
    next();
  }
});*/

export { RouterLink, RouterView };
export default router;