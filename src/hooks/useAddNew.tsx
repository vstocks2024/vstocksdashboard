// import { useState } from "react";
// import toast from "react-hot-toast";
// import { useAdminAuthContext } from "../context/AdminAuthContext";
// import {addNewAdminSchema} from "../utils/types";
// import {z} from "zod";

// const useAddNew = () => {
// 	const [loading, setLoading] = useState(false);
// 	const {authAdmin}=useAdminAuthContext();

// 	const addnewadmin = async (adminSchema:z.infer<typeof addNewAdminSchema>) => {
// 		if(!authAdmin){
			
// 		}
// 		setLoading(true);
// 		try {
// 			const res = await fetch("/api/auth/addnew", {
// 				method: "POST",
// 				headers: { "Content-Type": "application/json" },
// 				body: JSON.stringify(adminSchema),
// 			});

// 			const data = await res.json();
// 			if (data.error) {
// 				throw new Error(data.error);
// 			}
// 			localStorage.setItem("chat-user", JSON.stringify(data));
// 			setAuthAdmin(data);
// 		} catch (error) {
// 			toast.error(error.message);
// 		} finally {
// 			setLoading(false);
// 		}
// 	};

// 	return { loading, addnewadmin };
// };
// export default useSignup;

