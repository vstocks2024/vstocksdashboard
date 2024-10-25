import {useState} from "react";

const useLogOut=()=>{
    const [loading,setLoading]=useState(false);
    const logout=async()=>{
        setLoading(true);
    }
}