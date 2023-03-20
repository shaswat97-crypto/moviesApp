import './App.css';
import Hooks from './Components/Hooks'
import UseEffect1 from './Components/UseEffect1'

//hum yaha pe context api use karna chah rahe hai, kyouki yha pe a0z saare pages hai
import context from './Components/Context';
import {useState, useEffect} from 'react'
import Navbar from './Components/Navbar';
import Parent1 from './Components/Parent1';
import Parent2 from './Components/Parent2';

function App() {
  const [dark, setDark] = useState(false);
  return (
    //saare pages context.provider me wrapped rahenge, inko pta rhega ki ek golbal storage hai hamare paas
    <context.Provider value={dark}>
      <button onClick={async (e) => {
        await setDark(!dark);
        e.target.innerHTML=dark?'off':'on';
          console.log(dark);
      }}>on</button>
      
      <Navbar />
      <Parent1 />
      <Parent2 />
    </context.Provider>
  );
}

export default App;
