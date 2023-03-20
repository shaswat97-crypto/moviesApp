import React, {useState} from 'react'

function useEffect1() {
    const [count, setCount] = useState(0);

    useState(()=>{
        console.log('useEffect');
        document.title = `sd ${count}`;
    }, [])
    console.log('render');
    return (
        <>
            <div>{count}</div>
            <button onClick={()=>setCount(count+1)}>+1</button>
        </>
    )
}

export default useEffect1