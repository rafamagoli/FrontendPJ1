import axios from "axios"
import { rh } from "../constants/apis"


export default class UserService{
    // 8080 // 401
    static async login (username,password){
        return await axios.post(
            `${rh}/api/users/login`,
            {
                username: username,
                password: password,
            }
        )
    }

    static async registe(username,password,name,nif,department,role) {
        
        return await axios.post(
            `${rh}/api/users/register-user`,
            {
                username: username,
                password: password,
                name: name,
                nif: nif,
                departmentName: department,
                role: role,
            }
        )
    }

    static async registeAdmin(username,password,name,nif,role) {

        return await axios.post(
            `${rh}/api/users/create-admin`,
            {
                username: username,
                password: password,
                name: name,
                nif: nif,
                role: role,
            },

        ).then(
            reason=> reason.response.data
        ).catch(
            reason=> reason.response.data
        )
    }

    static async getAll() {
        return await axios.get(`${rh}/api/users`)
    }

}
