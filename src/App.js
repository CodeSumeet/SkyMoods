import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./Components/Home";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={<Navigate to="/mumbai" />}
          />
          <Route
            exact
            path="/:city"
            element={<Home />}
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
