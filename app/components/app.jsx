import React from 'react';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import Paragraphs from './paragraphs';
import ShowResults from './results';


class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <nav className="nav">
                        <Link to="/fb/results"> RESULTS</Link>
                    </nav>
                    <Switch>
                        <Route exact path="/fb/" component={Paragraphs} />
                        <Route path="/fb/results" component={ShowResults}/>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default App;