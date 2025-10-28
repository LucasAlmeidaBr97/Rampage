import CrudService from "./CRUDService";

class UserService extends CrudService {
    static _instance = null;
    constructor(){
        super("/auth")

        if(UserService._instance)
            return UserService._instance;

        UserService._instance = this;
    }

    getUserById= async(id) => {
        return await this.doGetById("/get-user", id)
    }

    async editUser(user){
        return await this.doPut("/edit-user-site", user);
    }
}

const userService = new UserService();
export default userService;