import { useAppSelector } from "../app/hooks"
import { selectCurrentToken } from "../features/auth/authSlice"
import jwtDecode, { JwtPayload } from "jwt-decode"

const useAuth = () => {
  const token = useAppSelector(selectCurrentToken)
  let isAdmin = false
  let status = "User"

  interface IJWTPayload {
    UserInfo: {
      username: string
      roles: [string]
    }
  }

  if (token) {
    const decoded = jwtDecode<JwtPayload>(token)
    const payload = decoded as IJWTPayload
    const { username, roles } = payload.UserInfo

    isAdmin = roles.includes("Admin")

    if (isAdmin) status = "Admin"

    return { username, roles, status, isAdmin }
  }

  return { username: "", roles: [], isAdmin, status }
}
export default useAuth
