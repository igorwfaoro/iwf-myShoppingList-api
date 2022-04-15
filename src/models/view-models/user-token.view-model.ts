import { UserViewModel } from "./user.view-model";

export class UserTokenViewModel {
    public user: UserViewModel;
    public token: string;

    public static create(user: UserViewModel, token: string): UserTokenViewModel {
        
        const userToken = new UserTokenViewModel();

        userToken.user = user;
        userToken.token = token;

        return userToken;
    }
}