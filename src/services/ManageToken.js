export default {
    saveToken(token){
        localStorage.setItem("token", token)
    },

    getToken(){
        return localStorage.getItem("token")
    },

    removeToken(){
        localStorage.removeItem("token")
    },

    isAuthenticated(){
        return !!localStorage.getItem("token")
    }

}