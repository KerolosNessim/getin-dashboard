import { useUserStore } from "@/stores/UserStore";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { user } = useUserStore();

  // لو المستخدم مسجل دخول (عنده token)، نرجعه للصفحة الرئيسية
  if (user?.token) {
    return <Navigate to="/" replace />;
  }

  // لو مش مسجل، نعرض الصفحة (Login)
  return children;
};

export default PublicRoute;
