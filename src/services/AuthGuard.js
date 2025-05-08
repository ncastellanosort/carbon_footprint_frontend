import { useRouter } from "vue-router";

import manageToken from "./ManageToken";

export const authGuard = (to, from, next) => {
    const token = manageToken.getToken()
    if(token){
        next()
    }else{
        next("/login")
    }

}