import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import UserService from "@/core/services/UserService";
import UserDashboard from "./components/user/UserDashboard.vue";
import UserLogin from "./components/user/UserLogin.vue";
import UserRegister from "./components/user/UserRegister.vue";
import EmployeeList from "./components/employee/EmployeeList.vue";
import EmployeeAdd from "./components/employee/EmployeeAdd.vue";
import EmployeeEdit from "./components/employee/EmployeeEdit.vue";
import EmployeeChangePassword from "./components/employee/EmployeeChangePassword.vue";
import DepartmentList from "./components/department/DepartmentList.vue";
import DepartmentAdd from "./components/department/DepartmentAdd.vue";
import DefaultPageLayout from "./core/components/DefaultPageLayout.vue";
import DepartmentEdit from "./components/department/DepartmentEdit.vue";
import DepartmentDetail from "./components/department/DepartmentDetail.vue";
import TaskList from "./components/task/TaskList.vue";
import TaskAdd from "./components/task/TaskAdd.vue";
import TaskEdit from "./components/task/TaskEdit.vue";
import IngredientList from "./components/ingredient/IngredientList.vue";
import IngredientAdd from "./components/ingredient/IngredientAdd.vue";
import IngredientEdit from "./components/ingredient/IngredientEdit.vue";
import PlateList from "./components/plate/PlateList.vue";
import PlateAdd from "./components/plate/PlateAdd.vue";
import PlateEdit from "./components/plate/PlateEdit.vue";
import ReservationAdd from "./components/reservation/ReservationAdd.vue";
import ReservationEdit from "./components/reservation/ReservationEdit.vue";
import ReservationList from "./components/reservation/ReservationList.vue";
import ReservationListAdmin from "./components/reservation/ReservationListAdmin.vue";
import axios from 'axios';

const token = localStorage.getItem("authToken");
if (token) {
  UserService.setAuthToken(token);
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "user-login",
      path: "/user/login",
      component: UserLogin,
      meta: {},
    },
    {
      name: "user-register",
      path: "/user/register",
      component: UserRegister,
      meta: {},
    },
    {
      name: "default-route",
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
          name: "employee-edit",
          path: "employee/edit/:username",
          component: EmployeeEdit,
          meta: { allowedRoles: ["admin", "HRmanager"] },
        },
        {
          name: "employee-change-password",
          path: "employee/changepassword",
          component: EmployeeChangePassword,
          /*meta: { allowedRoles: ["employee"] },*/
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
          path: "department/edit/:name",
          component: DepartmentEdit,
          meta: { allowedRoles: ["admin", "manager"] },
        },   
        {
          name: "department-detail",
          path: "/department/:id",
          component: DepartmentDetail,
          meta: { allowedRoles: ["admin", "manager"] },
        },
        {
          name: "task-list",
          path: "task/list",
          component: TaskList,
          meta: { allowedRoles: ["admin"] },
        },
        {
          name: "task-add",
          path: "task/add",
          component: TaskAdd,
          meta: { allowedRoles: ["admin"] },
        },
        {
          name: "task-edit",
          path: "task/edit/:id",
          component: TaskEdit,
          meta: { allowedRoles: ["admin"] },
        },
        {
          name: "ingredient-list",
          path: "ingredient/list",
          component: IngredientList,
          meta: { allowedRoles: ["admin", "manager"] },
        },
        {
          name: "ingredient-add",
          path: "ingredient/add",
          component: IngredientAdd,
          meta: { allowedRoles: ["admin", "manager"] },
        },
        {
          name: "ingredient-edit",
          path: "ingredient/edit/:id",
          component: IngredientEdit,
          meta: { allowedRoles: ["admin", "manager"] },
        },
        {
          name: "plate-list",
          path: "plate/list",
          component: PlateList,
          meta: { allowedRoles: ["admin", "manager"] },
        },
        {
          name: "plate-add",
          path: "plate/add",
          component: PlateAdd,
          meta: { allowedRoles: ["admin", "manager"] },
        },
        {
          name: "plate-edit",
          path: "plate/edit/:name",
          component: PlateEdit,
          meta: { allowedRoles: ["admin", "manager"] },
        },
        {
          name: "reservation-list",
          path: "reservation/list",
          component: ReservationList,
          meta: { allowedRoles: ["admin", "manager", "employee"] },
        },
        {
          name: "reservation-add",
          path: "reservation/add",
          component: ReservationAdd,
          meta: { allowedRoles: ["admin", "manager", "employee"] },
        },
        {
          name: "reservation-edit",
          path: "reservation/edit/:id",
          component: ReservationEdit,
          meta: { allowedRoles: ["admin", "manager", "employee"] },
        },
        {
          name: "reservation-all-list",
          path: "reservation/all",
          component: ReservationListAdmin,
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

axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  console.log(response.status);
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  
  if (error.response.status === 401){
    router.push({ name: "user-login" });
  }

  return Promise.reject(error);
});

const app = createApp(App);
app.use(router);
app.mount("#app");
