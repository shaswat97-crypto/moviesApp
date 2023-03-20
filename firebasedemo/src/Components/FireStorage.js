import React,{useState} from 'react'
import { storage } from '../firebase'

function FireStorage() {
    const [file, setFile] = useState('');
    const upload = ()=>{
        const uploadTask = storage.ref(`./data/${file.name}`).put(file);
        uploadTask.on('state changed', fn1, fn2, fn3);
        function fn1(snapshot){
          let prog = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
          console.log(prog);
        }
        function fn2(err){
          console.log('error', err);
        }
        function fn3(){
          uploadTask.snapshot.ref.getDownloadURL().then(url =>{console.log(url)});
        }
    }
  return (
    <>
        <label htmlFor="file">Upload file</label>
        <input type="file" accept='image/' value='' onChange={(e)=>{setFile(e.target.files[0])}} />
        <button onClick={upload}>Upload</button>
    </>
  )
}

export default FireStorage