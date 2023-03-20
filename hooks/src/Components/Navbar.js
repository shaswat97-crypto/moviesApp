import React from 'react'
//yha hum context api ka use karna chah rahe hai
//pehile uske ek hook import kare
import {useContext, useEffect, useState} from 'react'

//useke baad context api ko import kare
import context from './Context'

function Navbar() {
    
    const [theme, setTheme] = useState(false);
    let val = useContext(context) //ye tarika hai context se value nikalne ka
    
    console.log(val);
    setTheme(val);
    useEffect(() => {
        let clas='';
        if(theme){
          clas = 'dark'
        }
        else{
          clas = 'light'
        }
      }, [theme])
    
  return (
    <div className={clas}>Navbar</div>
  )
}

export default Navbar