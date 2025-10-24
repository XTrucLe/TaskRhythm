import { BrowserRouter } from "react-router-dom";
import AppRoute from "./routers/AppRoute";
import { ThemeProvider } from "./provider/ThemeProvider";
import NotificationContainer from "./components/ui/Notification";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppRoute />
        <NotificationContainer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
