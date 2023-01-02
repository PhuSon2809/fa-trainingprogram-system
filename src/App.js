import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import config from "./config";
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
import Authenticated from "./pages/Authenticated/Authenticated";
import ChangePassword from "./pages/Authenticated/ChangePassword/ChangePassword";
import ForgotPassword from "./pages/Authenticated/ForgotPassword/ForgotPassword";
import VerificationOTP from "./pages/Authenticated/VerificationOTP/VerificationOTP";
import { superAdminRoutes } from "./routes";

function App() {
  const token = useSelector((state) => state.login.token);

  return (
    <div className="App">
      <Routes>
        {!token ? (
          <>
            <Route path="/" element={<Authenticated />} />
            <Route
              path={config.routes.forgotpassword}
              element={<ForgotPassword />}
            />
            <Route
              path={config.routes.verificationOTP}
              element={<VerificationOTP />}
            />
            <Route
              path={config.routes.changePasswod}
              element={<ChangePassword />}
            />
          </>
        ) : (
          superAdminRoutes.map((route, index) => {
            const Page = route.component;

            let Layout = DefaultLayout;

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })
        )}
      </Routes>
    </div>
  );
}

export default App;
