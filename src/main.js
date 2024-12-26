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
import TaskAdd from "./components/task/TaskAdd.vue";
import TaskUpdate from "./components/task/TaskUpdate.vue";
import IngredientList from "./components/ingredient/IngredientList.vue";
import IngredientAdd from "./components/ingredient/IngredientAdd.vue";
import IngredientEdit from "./components/ingredient/IngredientEdit.vue";
import PlateList from "./components/plate/PlateList.vue";
import PlateAdd from "./components/plate/PlateAdd.vue";
import PlateEdit from "./components/plate/PlateEdit.vue";
import ReservationAdd from "./components/reservation/ReservationAdd.vue";
import ReservationEdit from "./components/reservation/ReservationEdit.vue";
import ReservationList from "./components/reservation/ReservationList.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { 
      name: "user-login", 
      path: "/user/login", 
      component: UserLogin, 
      meta: {} 
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
          name: "task-update",
          path: "task/update",
          component: TaskUpdate,
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
        }
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