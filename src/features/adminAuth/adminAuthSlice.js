import { createSlice  } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";


const initialState=[{
    adminAuth: {} 
}]

export const adminAuthSlice=createSlice({
    name:'adminAuth',
    initialState,
    reducers:{
        addAdmin:(state,action)=>{},
        removeAdmin:(state,action)=>{}

    }

})