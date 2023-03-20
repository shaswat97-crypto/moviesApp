import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
//selector ka kaam hai store ke states me se hume jo state chiye, use nikalna
import { increment, decrement, reset,incrementByAmount, decrementByAmount } from './counterSlice';

function Counter() {
  const [amount, setAmount] = useState(0);
  const amountChanged = (value)=>{
    setAmount(value);
  }
  const resetAll = ()=>{
    dispatch(reset());
    setAmount(0);
  }
  const count = useSelector((states) => states.counter.count);
  //states matlab store me jitna bhi states hai, sabko le aaya
  //.counter select kiye, to obj mile jo humne counterSlice me initialState se banaya tha
  //us obj me se count nikale

  const dispatch = useDispatch();

  return (
    <>
      <p>{count}</p>
      <div>
        <button onClick={() => dispatch(increment())}>+</button>
        {/* jab store me kuch change karna hai to, dispatch ke functions ko call karna hai */}
        {/* vo store me jaega(dispatch hoga) aur changes karega */}
        <button onClick={()=>dispatch(decrement())}>-</button>
        <button onClick={resetAll}>Reset</button>
        <button onClick={()=>dispatch(decrementByAmount(amount))}>-byAmount</button>
        <button onClick={()=>dispatch(incrementByAmount(amount))}>+byAmount</button>
        <input type="number" value={amount} onChange={(e)=>amountChanged(e.target.value)} />
      </div>
    </>
  )
}

export default Counter