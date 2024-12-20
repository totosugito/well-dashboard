import {RiHome5Fill, RiDatabase2Line, RiShip2Line} from "react-icons/ri";

const iconClassName = "text-2xl";
export const AppRoutes = {
  root: {
    name: "Root",
    to: "/",
    href: "/",
  },
  userRegister: {
    name: "Register",
    to: "/register",
    href: "/register",
    icon: <RiHome5Fill className={iconClassName}/>,
  },
  userLogin: {
    name: "Login",
    to: "/login",
    href: "/login",
    icon: <RiHome5Fill className={iconClassName}/>,
  },
  productionData: {
    name: "Production Data",
    to: "/production-data",
    href: "/production-data",
    icon: <RiDatabase2Line className={iconClassName}/>,
  },
  oilLosses: {
    name: "Oil Losses",
    to: "/oil-losses",
    href: "/oil-losses",
    icon: <RiHome5Fill className={iconClassName}/>,
  },
  actualOil: {
    name: "Actual Oil",
    to: "/actual-oil",
    href: "/actual-oil",
    icon: <RiHome5Fill className={iconClassName}/>,
  },
  actualGas: {
    name: "Actual Gas",
    to: "/actual-gas",
    href: "/actual-gas",
    icon: <RiHome5Fill className={iconClassName}/>,
  },
  vesselTracking: {
    name: "Vessel Tracking",
    to: "/vessel-tracking",
    href: "/vessel-tracking",
    icon: <RiShip2Line className={iconClassName}/>,
  },
  dailyReport: {
    name: "Daily Report",
    to: "/daily-report",
    href: "/daily-report",
    icon: <RiHome5Fill className={iconClassName}/>,
  },
  potentialOil: {
    name: "Potential Oil",
    to: "/potential-oil",
    href: "/potential-oil",
    icon: <RiHome5Fill className={iconClassName}/>,
  },
  potentialGas: {
    name: "Potential Gas",
    to: "/potential-gas",
    href: "/potential-gas",
    icon: <RiHome5Fill className={iconClassName}/>,
  },
  emailMsgList: {
    name: "Email Message List",
    to: "/email-msg-list",
    href: "/email-msg-list",
    icon: <RiHome5Fill className={iconClassName}/>,
  },
  wellProd2024: {
    actualOil: {
      name: "Actual Oil",
      to: "/well-prod2024/actual-oil",
      href: "/well-prod2024/actual-oil",
      icon: <RiHome5Fill className={iconClassName}/>,
    },
    actualGas: {
      name: "Actual Gas",
      to: "/well-prod2024/actual-gas",
      href: "/well-prod2024/actual-gas",
      icon: <RiHome5Fill className={iconClassName}/>,
    },
    actualWater: {
      name: "Actual Water",
      to: "/well-prod2024/actual-water",
      href: "/well-prod2024/actual-water",
      icon: <RiHome5Fill className={iconClassName}/>,
    },
  }
}

export const DefaultUserRouter = AppRoutes.actualGas.to;