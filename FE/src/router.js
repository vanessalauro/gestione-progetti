import Login from "./components/Login";
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
      path: "/login",
      name: "Login",
      component: Login,
      meta: {
        requiresAuth: false // Pagina senza autenticazione
      }
    },
    {
      path: "/",
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
        }
      ]
    },
    {
      path: "/admin-manager",
      name: "AdminManager",
      component: AdminManager,
      meta: {
        requiresAuth: true // Pagina che richiede autenticazione
      }
    },
    /*{
      path: "/edit-profile",
      name: "EditProfile",
      component: EditProfile,
    },*/
  ]
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = checkAuth(); // Funzione che controlla se l'utente è autenticato

  if (to.meta.requiresAuth && !isAuthenticated) {
    // L'utente non è autenticato, reindirizza alla pagina di login
    next('/login');
  } else {
    // L'utente è autenticato o la pagina non richiede autenticazione
    next();
  }
});

function checkAuth() {
  // Implementa la logica per verificare se l'utente è autenticato
  // Restituisci true se l'utente è autenticato, false altrimenti
  // Puoi utilizzare localStorage, cookie o chiamate API per verificare l'autenticazione
  // In questo esempio, la funzione restituisce sempre false per simulare l'utente non autenticato
  return false;
}

export default router;