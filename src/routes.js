import { Dashboard } from "./views/Dashboard";
import SignIn from "./views/signin";
import Registration from "./views/registration";
import ListRooms from "./views/ListRooms";
import LandingPage from "./views/LandingPage";
import Feedback from "./views/FeedBack";
const routes = [
  {
    path: "/admin",
    name: "Admin Dashboard",
    element: <Dashboard />,
  },
  {
    path: "/login",
    name: "Login",
    element: <SignIn />,
  },
  {
    path: "/",
    name: "Homepage",
    element: <LandingPage />,
  },
  {
    path: "/register",
    name: "Registration",
    element: <Registration />,
  },
  {
    path: "/rooms",
    name: "AllRooms",
    element: <ListRooms />,
  },
  {
    path: "/reviews",
    name: "Feedback",
    element: <Feedback />,
  },
];

export default routes;
