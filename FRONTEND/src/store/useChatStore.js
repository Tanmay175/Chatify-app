import {create } from "zustand"
import { axiosInstance } from "../lib/axios";

export const useChatStore= create ((set,get)=>({
    allContacts:[],
    chats:[],
    messages:[],
    activeTab:"chats",
    selectedUser:null,
    isUserLoading:false,
    isMessageLoading:false,
    isSoundEnabled:localStorage.getItem("isSoundEnabled")===true,

    toggleSound:()=>{
        localStorage.setItem("isSoundEnabled",!get().isSoundEnabled)
        set({isSoundEnabled: !get().isSoundEnabled})
    },

    setActiveTab:(tab) => set({activeTab:tab}),
    setSelectedUser: (selectedUser)=> set({selectedUser}),

    getAllContacts:async()=>{
        set({isUserLoading:true});
        try {
            const res= await axiosInstance.get("/message/contacts")
            set({allContacts:res.data})
        } catch (error) {
            toast.error(error.response.data.messages); // s
        }finally{
            set({isUserLoading:false})
        }
    },
    getMyChatPartners:async ()=>{
        set({isUserLoading:true});
        try {
            const res= await axiosInstance.get("/message/chats")
            set({chats:res.data})
        } catch (error) {
            toast.error(error.response.data.messages); // s
        }finally{
            set({isUserLoading:false})
        }
    },

    getMessagesByUserId: async (userId)=>{
        set({isMessageLoading:true})
        try {
            const res= await axiosInstance.get(`/messages/${userId}`);
            set({messages:res.data})
        } catch (error) {
            toast.error(error.response?.data?.message || "something went wrong")
        }finally{
            set({isMessageLoading:false})
        }
    }
}))