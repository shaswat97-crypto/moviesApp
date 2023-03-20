import {createSlice} from '@reduxjs/toolkit'
const initialState = {
    count:0
}

export const counterSlice = createSlice({
    name:'counter',
    initialState,
    reducers:{
        //yha pe saare actons daale
        //actions functions hai
        increment:(state)=>{
            state.count+=1;
        },
        decrement:(state)=>{
            state.count-=1;
        },
        reset:(state)=>{
            state.count=0;
        },
        incrementByAmount:(state, action)=>{
            state.count += Number(action.payload);
        },
        decrementByAmount:(state, action)=>{
            state.count -= Number(action.payload);
        }
    }

})

export const {increment, decrement, reset, incrementByAmount, decrementByAmount} = counterSlice.actions;
export default counterSlice.reducer;