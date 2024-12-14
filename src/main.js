import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import UserDashboard from "./components/user/UserDashboard.vue";
import UserLogin from "./components/user/UserLogin.vue";
import UserRegister from "./components/user/UserRegister.vue";
import EmployeeList from "./components/employee/EmployeeList.vue";
import EmployeeAdd from "./components/employee/EmployeeAdd.vue";
import DefaultPageLayout from "./core/components/DefaultPageLayout.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { name: "user-login", path: "/user/login", component: UserLogin, meta: {} },
    {
      name: "user-register",
      path: "/user/register",
      component: UserRegister,
      meta: { allowedRoles: ["admin"] },
    },
    {
      name: "rota-default",
      path: "/",
      component: DefaultPageLayout,
      meta: {},
      children: [
        {
            name: "user-dashboard",
            path: "/user/dashboard",
            component: UserDashboard,
            meta: { allowedRoles: ["admin", "manager"] },
        },
        {
          name: "employee-list",
          path: "employee/list",
          component: EmployeeList,
          meta: { allowedRoles: ["admin", "manager"] },
        },
        {
          name: "employee-add",
          path: "employee/add",
          component: EmployeeAdd,
          meta: { allowedRoles: ["admin", "manager"] },
        },
      ],
    },
  ],
});

router.beforeEach((to, from) => {
  let currentUserRole = "admin";

  if (to.meta.allowedRoles && !to.meta.allowedRoles.includes(currentUserRole)) {
    return {
      name: "user-login",
    };
  }
});

const app = createApp(App);
app.use(router);
app.mount("#app");
