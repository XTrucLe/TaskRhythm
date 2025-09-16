import { BrowserRouter } from "react-router-dom";
import AppRoute from "./routers/AppRoute";
import { ThemeProvider } from "./provider/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppRoute />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
