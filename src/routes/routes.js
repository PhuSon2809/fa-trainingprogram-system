import config from "~/config";
import CalendarDay from "~/pages/CalendarDay/CalendarDay";
import CalendarWeek from "~/pages/CalendarWeek/CalendarWeek";
import CreateClass from "~/pages/CreateClass/CreateClass";
import CreateProgram from "~/pages/CreateProgram/CreateProgram/CreateProgram";
import CreateProgramName from "~/pages/CreateProgram/CreateProgramName/CreateProgramName";
import CreateSyllabus from "~/pages/CreateSyllabus/CreateSyllabus";
import Home from "~/pages/Home/Home";
import LearningMaterials from "~/pages/LearningMaterials/LearningMaterials";
import TrainingCalendar from "~/pages/TrainingCalendar/TrainingCalendar";
import UserInformation from "~/pages/UserInformation/UserInformation";
import UserList from "~/pages/UserList/UserList";
import UserPermission from "~/pages/UserPermission/UserPermission";
import ViewClass from "~/pages/ViewClass/ViewClass";
import ViewListProgram from "~/pages/ViewListProgram/ViewListProgram";
import ViewListProgramDraft from "~/pages/ViewListProgramDraft/ViewListProgramDraft";
import ViewProgram from "~/pages/ViewProgram/ViewProgram";
import ViewProgramDetail from "~/pages/ViewProgramDetail/ViewProgramDetail";
import ViewSyllabus from "~/pages/ViewSyllabus/ViewSyllabus";
import viewSyllabusDetail from "~/pages/ViewSyllabusDetail";

const superAdminRoutes = [
  {
    path: config.routes.home,
    component: Home,
  },
  {
    path: config.routes.viewSyllabus,
    component: ViewSyllabus,
  },
  {
    path: config.routes.viewSyllabusDetail,
    component: viewSyllabusDetail,
  },
  {
    path: config.routes.createSyllabus,
    component: CreateSyllabus,
  },
  {
    path: config.routes.viewListProgram,
    component: ViewListProgram,
  },
  {
    path: config.routes.viewProgram,
    component: ViewProgram,
  },
  {
    path: config.routes.viewProgramDetail,
    component: ViewProgramDetail,
  },
  {
    path: config.routes.createProgram,
    component: CreateProgram,
  },
  {
    path: config.routes.createProgramName,
    component: CreateProgramName,
  },
  {
    path: config.routes.viewListProgramSyllabusDraft,
    component: ViewListProgramDraft,
  },
  {
    path: config.routes.viewClass,
    component: ViewClass,
  },
  {
    path: config.routes.creatClass,
    component: CreateClass,
  },
  {
    path: config.routes.trainingCalendar,
    component: TrainingCalendar,
  },
  {
    path: config.routes.userList,
    component: UserList,
  },
  {
    path: config.routes.userPermission,
    component: UserPermission,
  },
  {
    path: config.routes.userInformation,
    component: UserInformation,
  },
  {
    path: config.routes.learningMaterials,
    component: LearningMaterials,
  },
  {
    path: config.routes.calendarDay,
    component: CalendarDay,
  },
  {
    path: config.routes.calendarWeek,
    component: CalendarWeek,
  },
];

const classAdminRoutes = [];
const trainerRoutes = [];
const studentRoutes = [];

export { superAdminRoutes, classAdminRoutes, trainerRoutes, studentRoutes };

