import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Navigation from "../src/pages/Navigation";
import AppRoutes from "../src/routs/AppRouts";
import ChatBot from "./components/AI/ChatBot";
import NotificationSystem from "./components/Notifications/NotificationSystem";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <NotificationSystem />
        <Navigation />
        <AppRoutes />
        <ChatBot />
      </Router>
    </Provider>
  );
};

export default App;
