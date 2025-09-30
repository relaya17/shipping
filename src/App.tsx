import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Navigation from "../src/pages/Navigation";
import AppRoutes from "../src/routs/AppRouts";
import ChatBot from "./components/AI/ChatBot";
import NotificationSystem from "./components/Notifications/NotificationSystem";
import { NotificationProvider } from "./components/Notifications/FloatingNotifications";
import AccessibilityWidget from "./components/Accessibility/AccessibilityWidget";

const App = () => {
  return (
    <Provider store={store}>
      <NotificationProvider>
        <Router>
          <NotificationSystem />
          <Navigation />
          <AppRoutes />
          <ChatBot />
          <AccessibilityWidget />
        </Router>
      </NotificationProvider>
    </Provider>
  );
};

export default App;
