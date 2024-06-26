import { getCurrentUser } from '@/db/apiAuth';
import useFetch from '@/hooks/useFetch';
import React, { createContext, useContext, useEffect } from 'react'

  const UrlContext =   createContext();
  const UrlProvider =({children})=>{

  const {data:user, loading, fn:fetchUser}=useFetch(getCurrentUser)
  const isAuthenticated = user?.role==="authenticated";


   useEffect(() => {
    fetchUser();
  
   }, [])
   
   
   return <UrlContext.Provider value={{user, fetchUser, loading, isAuthenticated}}>
        {children}
    </UrlContext.Provider>
  }
export const UrlsState = ()=>{
  return useContext(UrlContext);
} 
export default UrlProvider;