import axiosInstance from "../utils/axiosInstance";

export const registerUser = async(userData)=>{
    try{
        const response = await axiosInstance.post("api/auth/register",userData);
        return response.data;
    }catch(error){
        return error.response.data;
    }
}

export const loginUser = async(userData)=>{
    try{
        const response = await axiosInstance.post("api/auth/login",userData);
        return response.data;
    }catch(error){
        throw error.response.data;
    }
}

export const logoutUser = async () => {
    try {
      const response = await axiosInstance.get('/auth/logout');
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };
  