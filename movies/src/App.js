import './App.css';
import Movies from './Components/Movies';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import Favourties from './Components/Favourties';
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" render={(props) => (
          <>
            <Banner {...props} />
            <Movies {...props} />
          </>
        )} />
        <Route path="/favourites"><Favourties /></Route>
      </Switch>
    </Router>

  );
}

export default App;
