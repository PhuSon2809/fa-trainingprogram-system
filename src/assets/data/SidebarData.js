import {
  ArrowDownIcon,
  ArrowLeftIcon,
  BiotechIcon,
  BookOpenIcon,
  CalendarToDayIcon,
  FolderIcon,
  GroupIcon,
  HomeIcon,
  SchoolIcon,
  SettingsIcon,
} from "~/components/Icons";
import config from "~/config";

export const SidebarData = [
  {
    title: "Home",
    path: config.routes.home,
    icon: <HomeIcon />,
    forStudent: true,
  },
  {
    title: "Syllabus",
    path: config.routes.syllabus,
    icon: <BookOpenIcon />,
    iconClosed: <ArrowDownIcon />,
    iconOpened: <ArrowLeftIcon />,

    subNav: [
      {
        title: "View Syllabus",
        path: config.routes.viewSyllabus,
      },
      {
        title: "Create Syllabus",
        path: config.routes.createSyllabus,
      },
    ],
  },
  {
    title: "Training program",
    path: config.routes.trainingProgram,
    icon: <BiotechIcon />,
    iconClosed: <ArrowDownIcon />,
    iconOpened: <ArrowLeftIcon />,

    subNav: [
      {
        title: "View program",
        path: config.routes.viewListProgram,
      },
      {
        title: "Create program",
        path: config.routes.createProgramName,
      },
    ],
  },
  {
    title: "Class",
    path: config.routes.class,
    icon: <SchoolIcon />,
    iconClosed: <ArrowDownIcon />,
    iconOpened: <ArrowLeftIcon />,

    subNav: [
      {
        title: "View class",
        path: config.routes.viewClass,
      },
      {
        title: "Create class",
        path: config.routes.creatClass,
      },
    ],
  },
  {
    title: "Training calendar",
    path: config.routes.calendarDay,
    icon: <CalendarToDayIcon />,
  },
  {
    title: "User management",
    path: config.routes.user,
    icon: <GroupIcon />,
    iconClosed: <ArrowDownIcon />,
    iconOpened: <ArrowLeftIcon />,

    subNav: [
      {
        title: "User list",
        path: config.routes.userList,
      },
      {
        title: "User permission",
        path: config.routes.userPermission,
      },
    ],
  },
  // {
  //   title: "Learning materials",
  //   path: config.routes.learningMaterials,
  //   icon: <FolderIcon />,
  //   forStudent: true,
  // },
  {
    title: "Setting",
    path: config.routes.setting,
    icon: <SettingsIcon />,
    iconClosed: <ArrowDownIcon />,
    iconOpened: <ArrowLeftIcon />,

    subNav: [
      {
        title: "User information",
        path: config.routes.userInformation,
      },
    ],
  },
];
