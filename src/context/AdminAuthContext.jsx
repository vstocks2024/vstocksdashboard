"use client";
import { createContext, useContext, useState } from "react";


export const AdminAuthContext = createContext();
export const useAdminAuthContext = () => {
  return useContext(AdminAuthContext);
};

export const AdminAuthContextProvider = ({ children }) => {
	let dashboard_admin="";
	if(typeof localStorage !=="undefined"){
         dashboard_admin=JSON.parse(localStorage.getItem("dashboard-admin"));
	}
	const [authAdmin, setAuthAdmin] = useState(dashboard_admin || null);

	return <AdminAuthContext.Provider value={{ authAdmin, setAuthAdmin }}>{children}</AdminAuthContext.Provider>;
};



