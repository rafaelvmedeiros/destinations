import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Negociations from "../src/pages/Negociations";

function App() {
  return (
    <Router>
        <Switch>
            <Route path="/" component={Negociations} exact />
        </Switch>
    </Router>
  );
}

export default App;
