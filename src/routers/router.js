import {RiHome5Fill, RiDatabase2Line, RiShip2Line} from "react-icons/ri";
import {LuGlobe} from "react-icons/lu";

const iconClassName = "text-2xl";
export const AppRoutes = {
  userRegister: {
    name: "Register",
    to: "/user/register",
    icon: <RiHome5Fill className={iconClassName}/>,
  },
  userLogin: {
    name: "Login",
    to: "/login",
    icon: <RiHome5Fill className={iconClassName}/>,
  },
  productionData: {
    name: "Production Data",
    to: "/production-data",
    icon: <RiDatabase2Line className={iconClassName}/>,
  },
  oilLosses: {
    name: "Oil Losses",
    to: "/oil-losses",
    icon: <RiHome5Fill className={iconClassName}/>,
  },
  actualOil: {
    name: "Actual Oil",
    to: "/actual-oil",
    icon: <RiHome5Fill className={iconClassName}/>,
  },
  actualGas: {
    name: "Actual Gas",
    to: "/actual-gas",
    icon: <RiHome5Fill className={iconClassName}/>,
  },
  vesselTracking: {
    name: "Vessel Tracking",
    to: "/vessel-tracking",
    icon: <RiShip2Line className={iconClassName}/>,
  },
}

export const DefaultUserRouter = AppRoutes.actualGas.to;

export const AppNavigation = [
  {
    component: "title",
    name: "MONITOR"
  },
  {
    component: "group",
    name: "Surveillance Map",
    to: "/base",
    icon: <LuGlobe className={iconClassName}/>,
    items: [
      {...AppRoutes.actualOil, component: "item"},
      {...AppRoutes.actualGas, component: "item"},
      {...AppRoutes.oilLosses, component: "item"},
    ]
  },
  {...AppRoutes.productionData, component: "item"},
  {...AppRoutes.vesselTracking, component: "item"},
  {
    component: "title",
    name: "ZARA TOOLS"
  },
  {
    component: "title",
    name: "DATA MANAGEMENT"
  },
  {
    component: "title",
    name: "SETTING"
  },
  {
    component: "title",
    name: "ABOUT"
  },
]