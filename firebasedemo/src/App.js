import logo from './logo.svg';
import './App.css';
import Fireauth from './Components/Fireauth';
import Firebase from './Components/Firebase';
import FireStorage from './Components/FireStorage';

function App() {
  return (
    <>
      <Fireauth />
      {/* <Firebase/> */}
      <FireStorage></FireStorage>
    </>
  );
}

export default App;
