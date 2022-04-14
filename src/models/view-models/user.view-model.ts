import { DateHelper } from "../../common/helpers/date.helper";
import { User } from "../entities/user";

export class UserViewModel {

    public id: number;
    public name: string;
    public email: string;
    public password: string;
    public createdAt: string;

    public static fromEntity(u: User): UserViewModel {

        if(!u) return null;

        const user = new UserViewModel();
        user.id = u.id;
        user.name = u.name;
        user.email = u.email;
        user.createdAt = DateHelper.toStringViewModel(u.createdAt);

        return user;
    }

    public static fromEntities(users: User[]): UserViewModel[] {
        if(!users) return null;
        return users.map(UserViewModel.fromEntity);
    }
}