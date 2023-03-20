import React, { useState,useEffect} from 'react'
import { auth } from '../firebase';
function Fireauth() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [user, setUser] = useState('');

    let createUser = async ()=>{
        let res = await auth.createUserWithEmailAndPassword(email, pass);
        console.log(res);
    }

    useEffect(() => {
      let unsub = auth.onAuthStateChanged((user)=>{setUser(user)})
    
      return () => {
        unsub();//clean up
      }
    }, []);

    let logout = async()=>{
        await auth.signOut();
    }
    
    let signin = async()=>{
        await auth.signInWithEmailAndPassword(email,pass);
    }
    return (
        user==null?
        <>
            <label htmlFor="email"></label>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="text" name="email" />
            <label htmlFor="pass"></label>
            <input value={pass} onChange={(e)=>setPass(e.target.value)} type="password" name="pass" />
            <button onClick={createUser}>Create</button>
            <button onClick={signin}>SignIn</button>
        </>:
        <>
        <div>{user.email}</div>
        <button onClick={logout}>logout</button>
        </>
    )
}

export default Fireauth