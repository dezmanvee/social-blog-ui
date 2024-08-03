import { useQuery } from "@tanstack/react-query"
import { authUserStatusAPI } from "../../API/users/userAPIs"
import { Navigate } from "react-router-dom"
import AuthLoading from "../../../src/components/alerts/AuthLoading"


const ProtectedRoutes = ({children}) => {
    const { isLoading, data } = useQuery({

        queryKey: ['auth-user-status'],
        queryFn: authUserStatusAPI
    })

    //Loading
    if (isLoading) return <AuthLoading />

    //User authenticated
    if (!data) {
       return <Navigate to='/login' />
    }
    //User not authenticated
    
    if (data) {
        return children
    }
}
export default ProtectedRoutes