import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Navigation from "../src/pages/Navigation";
import AppRoutes from "../src/routs/AppRouts";
import ChatBot from "./components/AI/ChatBot";
import NotificationSystem from "./components/Notifications/NotificationSystem";
import PageBackBar from "./components/PageBackBar";
import CookieConsent from "./components/CookieConsent";
import api from "./service/api";

function CsrfBootstrap() {
  useEffect(() => {
    void api.get("/csrf").catch(() => {
      /* cookie may still be set on response */
    });
  }, []);
  return null;
}

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <CsrfBootstrap />
        <NotificationSystem />
        <Navigation />
        <PageBackBar />
        <AppRoutes />
        <ChatBot />
        <CookieConsent />
      </Router>
    </Provider>
  );
};

export default App;
