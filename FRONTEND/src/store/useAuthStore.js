import { create } from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast"

export const useAuthStore = create((set) => ({
  authUser: null,
  ischeckingAuth: true,
  isSigningUp:false,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check")
      set({ authUser: res.data })
    } catch (error) {
      console.log("Error in authcheck", error)
      set({ authUser: null })
    } finally {
      set({ ischeckingAuth: false })
    }
  },

  signup: async(data)=>{
      console.log("Signup data:", data);  
    set({isSigningUp:true})
    try {
        const res= await axiosInstance.post("/auth/signup",data);
        set({authUser:res.data});

        toast.success("Account Created Successfully!")
    } catch (error) {
    console.log(error.response.data);
    toast.error(error.response?.data?.message || "Signup failed");
}finally{
        set({isSigningUp:false})
    }
  },

    login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });

      toast.success("Logged in successfully");

      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

}))