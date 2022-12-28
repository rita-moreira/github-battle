import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Battle from "./components/Battle";
import Popular from "./components/Popular";
import Results from "./components/Results";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";

class App extends React.Component {
  state = {
    theme: "light",
  };

  toogleTheme = () => {
    this.setState(({ theme }) => {
      return {
        theme: theme === "light" ? "dark" : "light",
      };
    });
  };
  render() {
    return (
      <Router>
        <div className={this.state.theme}>
          <div className="container">
            <Nav theme={this.state.theme} toogleTheme={this.toogleTheme} />
            <Routes>
              <Route path="/" element={<Popular />} />
              <Route path="/battle" element={<Battle />} />
              <Route path="/results" element={<Results />} />
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

const rootElement = document.getElementById("app");
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
