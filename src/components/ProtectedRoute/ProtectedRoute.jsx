import { useUserStore } from "@/stores/UserStore";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {
  const { user } = useUserStore();
  if(!user?.token){
    return <Navigate to="/login" />
  }
  return (

    children
  )
}

export default ProtectedRoute