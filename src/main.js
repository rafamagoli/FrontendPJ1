import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import UserDashboard from "./components/user/UserDashboard.vue";
import UserLogin from "./components/user/UserLogin.vue";
import UserRegister from "./components/user/UserRegister.vue";
import EmployeeList from "./components/employee/EmployeeList.vue";
import EmployeeAdd from "./components/employee/EmployeeAdd.vue";
import DepartmentList from "./components/department/DepartmentList.vue";
import DepartmentAdd from "./components/department/DepartmentAdd.vue";
import DefaultPageLayout from "./core/components/DefaultPageLayout.vue";
import DepartmentEdit from "./components/department/DepartmentEdit.vue";
import DepartmentDetail from "./components/department/DepartmentDetail.vue";
import TaskList from "./components/task/TaskList.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { name: "user-login", path: "/user/login", component: UserLogin, meta: {} },
    {
      name: "user-register",
      path: "/user/register",
      component: UserRegister,
      meta: { },
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
        {
          name: "department-list",
          path: "department/list",
          component: DepartmentList,
          meta: { allowedRoles: ["admin", "manager"] },
        },
        {
          name: "department-add",
          path: "department/add",
          component: DepartmentAdd,
          meta: { allowedRoles: ["admin", "manager"] },
        },
        {
          name: "department-edit",
          path: "department/edit",
          component: DepartmentEdit,
          meta: { allowedRoles: ["admin", "manager"] },
        },
        {
          name: "department-detail",
          path: "/department/:id",
          component:DepartmentDetail,
          meta: { allowedRoles: ["admin", "manager"] },
        },
        
        {
          name: "task-list",
          path: "task/list",
          component: TaskList,
          meta: { allowedRoles: ["admin"] },
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
