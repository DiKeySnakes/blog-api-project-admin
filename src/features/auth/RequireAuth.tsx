import { useLocation, Navigate, Outlet } from "react-router-dom"
import useAuth from "../../hooks/useAuth"

const RequireAuth = ({ allowedRoles }: { allowedRoles: any }) => {
  const location = useLocation()
  const { roles } = useAuth()

  const content = roles.some((role) => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" state={{ from: location }} replace />
  )

  return content
}
export default RequireAuth
