import axios from "axios";
import manageJWT from "./ManageToken";
import { errorMessages } from "vue/compiler-sfc";
import { ref } from "vue";


const URL_SERVICE= "https://auth-service-jwt-spring.onrender.com/auth-service"

const errorMessage= ref("");


const apiAuth = axios.create({
    baseURL: URL_SERVICE
})

apiAuth.interceptors.request.use(
    (config)=>{
        const token = manageJWT.getToken()
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
)

export default apiAuth


export const register = async (newUser) => {
  
    try{
        const response = await axios.post(URL_SERVICE+"/user-register",newUser)
        console.log("response:", response.data)
        alert("Usuario registrado con exito")
        return response.data
        
    }catch(error){

        if(error.response){
           // console.error("Error backend: ", error.response.data)
            throw error
        }
    }

    
}

export const login = async (credentials) => {
    
    try{
    const response = await axios.post(URL_SERVICE+"/user-login", credentials)
    console.log("Response login:", response.data)
    return response
    }catch(error){
        if(error.response){
            //console.error("Error login", error.response.data)
            throw error
        }
    }
}


