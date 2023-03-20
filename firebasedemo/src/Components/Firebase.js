// import React,{useState} from 'react'
// import { database } from '../firebase';

// function Firebase() {
//     const [name, setName] = useState('');
//     const [age, setAge] = useState('');

//     let create = async()=>{
//         let res = await database.users.addDoc(users, {name, age});
//         console.log(res)
//     }
//   return (
//     <>
//         <div>
//             <label htmlFor="name">Name</label>
//             <input type="text" name="name" value={name} onChange={(e)=>setName(e.target.value)} />
//             <label htmlFor="age">Age</label>
//             <input type="text" name="age" value={age} onChange={(e)=>setAge(e.target.value)} />
//             <button onClick={create}>Create</button>
//         </div>
//     </>
//   )
// }

// export default Firebase