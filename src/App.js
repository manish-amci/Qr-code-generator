import "./App.css";
import SimpleContainer from "./components/simpleContainer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={SimpleContainer} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
