import axios from "axios";
import { BASE_URL } from "../../utils/baseURL";
// const BASE_URL = "http://localhost:8000/api/v1";


//! Register user
export const registerAPI = async (userData) => {
  const response = await axios.post(
    `${BASE_URL}/users/register`,
    {
      username: userData.username,
      email: userData.email,
      password: userData.password,
    },
    {
      withCredentials: true,
    }
  );

  return response.data;
};


//! Login user
export const loginAPI = async (userData) => {
    const response = await axios.post(
      `${BASE_URL}/users/login`,
      {
        username: userData.username,
        password: userData.password,
      },
      {
        withCredentials: true,
      }
    );
  
    return response.data;
  };

    //! Authenticate user 
  //* http://localhost:8000/api/v1/users/user-auth-status

  export const authUserStatusAPI = async () => {
    const response = await axios.get(`${BASE_URL}/users/user-auth-status`, { withCredentials: true})

    return response.data
  }

  //! User profile 

  export const userProfileAPI = async () => {
    const response = await axios.get(`${BASE_URL}/users/profile`, { withCredentials: true })

    return response.data
  }

  //! Third User profile 

  export const thirdUserProfileAPI = async (userId) => {
    const response = await axios.get(`${BASE_URL}/users/${userId}`, { withCredentials: true })

    return response.data
  }

  //! Users List

  export const userListAPI = async () => {
    const response = await axios.get(`${BASE_URL}/users/list`, { withCredentials: true })

    return response.data
  }

  //! Logout user
  export const logoutAPI = async () => {
    const response = await axios.post(
      `${BASE_URL}/users/logout`, {},
      {
        withCredentials: true,
      }
    );

    return response.data;
  };

  //! Delete user
  export const deleteUserAPI = async (userId) => {
    const response = await axios.delete(
      `${BASE_URL}/users/${userId}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  };

  // ! Follow User
  export const userFollowAPI = async (userId) => {
    const response = await axios.put(`${BASE_URL}/users/following/${userId}`, {},
    {
      withCredentials: true,
    })

    return response.data;
  }

  // ! Unfollow User
  export const userUnfollowAPI = async (userId) => {
    const response = await axios.put(`${BASE_URL}/users/unfollowing/${userId}`, {},
    {
      withCredentials: true,
    })

    return response.data;
  }

  // ! Generate Email Token
  export const generateEmailTokenAPI = async () => {
    const response = await axios.put(`${BASE_URL}/users/generate-account-email-token`, {},
    {
      withCredentials: true,
    })

    return response.data;
  }

  // !  Verify Email Token
  export const verifyEmailTokenAPI = async (emailToken) => {
    const response = await axios.put(`${BASE_URL}/users/verify-account-email/${emailToken}`, {},
    {
      withCredentials: true,
    })

    return response.data;
  }

  // !  Update Account Email 
  export const updateEmailAPI = async (email) => {
    const response = await axios.put(`${BASE_URL}/users/update-account-email`, {email},
    {
      withCredentials: true,
    })

    return response.data;
  }

  // !  Upload Profile Photo 
  export const uploadPhotoAPI = async (formData) => {
    const response = await axios.put(`${BASE_URL}/users/upload-profile-photo`, formData,
    {
      withCredentials: true,
    })

    return response.data;
  }

  // ! Generate Password Reset Token
  export const passwordResetTokenAPI = async (userData) => {
    const response = await axios.post(`${BASE_URL}/users/forgot-password`, {email: userData.email},
    {
      withCredentials: true,
    })

    return response.data;
  }

  // ! Verify Password Reset Token
  export const verifyPasswordResetTokenAPI = async (userData) => {
    const response = await axios.post(`${BASE_URL}/users/verify-forgot-password/${userData?.resetToken?.resetToken}`, {password: userData?.password},
    {
      withCredentials: true,
    })

    return response.data;
  }

  // ! Block User Account
  export const blockOrUnBlockUserAPI = async (data) => {
    const response = await axios.put(data?.actionURL, {userId: data?.userId},
    {
      withCredentials: true,
    })

    return response.data;
  }