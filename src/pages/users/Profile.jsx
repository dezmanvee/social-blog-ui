import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { authUserStatusAPI } from "../../API/users/userAPIs";
import { isAuthenticated } from "../../redux/features/user/authSlice";
import { useEffect } from "react";

const Profile = () => {
    const dispatch = useDispatch()
    const {isError, isLoading,isSuccess, data, error} = useQuery({

        queryKey: ['auth-user-status'],
        queryFn: authUserStatusAPI
    })

    //Dispatching actions
    useEffect(() => {
        dispatch(isAuthenticated(data))
    }, [data])
    
  return (
    <div>Profile</div>
  )
}
export default Profile