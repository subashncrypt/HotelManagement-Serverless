// import "bootstrap/dist/css/bootstrap.min.css";
// import "../src/pages/Login.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  BrowserRouter,
  Navigate,
  Route,
  Router,
  Routes,
} from "react-router-dom";
import routes from "./routes";
import { useState } from "react";
import { Dashboard } from "./views/Dashboard";
import SignIn from "./views/signin";
import LandingPage from "./views/LandingPage";
import Registration from "./views/registration";
import ForgotPassword from "./pages/ForgotPassword";
import VisualizationCharts from "./pages/VisualizationCharts";
import Reports from "./pages/Reports";
import Register from "./pages/Register";
import { AuthContext, useAuth } from "./context";
import { RoomBookingToast } from "./components/ToastNotifications";
import ReportsQuickSight from "./pages/ReportsQuickSight";
import KommunicateChat from './chat'

function App() {
  const [isLogin, setLogin] = useState(false);
  const mdTheme = createTheme({});

  return (
    <><div>
      <KommunicateChat />
    </div><ThemeProvider theme={mdTheme}>
        <AuthContext.Provider value={{ isLogin, setLogin }}>
          <BrowserRouter>
            <Routes>
              {/* <Route path="/" element={<SignIn />}></Route> */}
              <Route path="/login" element={<SignIn />}></Route>
              <Route path="/register" element={<Registration />}></Route>
              <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
              <Route path="/" element={<LandingPage />}></Route>
              {/* <Route path="/dashboard" element={<Dashboard />}>
    {routes.map((props) => (
      <Route path={props.path} element={props.element} />
    ))}
  </Route> */}
              {/* <RequireAuth> */}
              {routes.map((props) => (
                <Route
                  key={props.name}
                  path={props.path}
                  element={props.element} />
              ))}
              {/* </RequireAuth> */}
              <Route
                path="/visualization"
                element={<VisualizationCharts />}
              ></Route>
              <Route path="/reports" element={<Reports />}></Route>
              <Route path="/reportsquicksight" element={<ReportsQuickSight />}></Route>
            </Routes>
          </BrowserRouter>
        </AuthContext.Provider>
      </ThemeProvider></>
    
  );
}

const RequireAuth = ({ children }) => {
  const { isLogin } = useAuth();

  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default App;
