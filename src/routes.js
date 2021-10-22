import { Route, Switch } from "react-router-dom";
import { Home, List } from "./components";

const Routes = () => {
    
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/list" component={List} />
        </Switch>
    );
}

export default Routes