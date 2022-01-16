import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header.component";
import Weather from "./pages/Weather.component";
import Help from "./pages/Help.component";
import NotFound from "./pages/NotFound.component";
function App() {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Weather} />
          <Route exact path="/help" component={Help} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
