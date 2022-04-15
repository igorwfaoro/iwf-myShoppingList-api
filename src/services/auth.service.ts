import { injectable } from "inversify";
import { NotFoundException } from "../common/exceptions/not-fount.exception";
import * as jwt from 'jsonwebtoken';
import { TokenPayload } from "../common/helpers/token.helper";
import { User } from "../models/entities/user";
import { UserViewModel } from "../models/view-models/user.view-model";
import { LoginInputModel } from "../models/input-models/login.input-model";
import * as bcrypt from 'bcryptjs';
import { ERROR_MESSAGES } from "../static/error-messages";
import { ENV_CONFIG } from "../env-config";
import { AuthException } from "../common/exceptions/auth.exception";
import { UserTokenViewModel } from "../models/view-models/user-token.view-model";

@injectable()
export class AuthService {

    public async login(input: LoginInputModel): Promise<UserTokenViewModel> {

        const user = await User.findOne({
            where: { email: input.email }
        });

        this.verifyPassword(input.password, user.password);

        return {
            user: UserViewModel.fromEntity(await this.getUser(user.id)),
            token: this.makeToken(user)
        };
    }

    public async refresh(userId: number) {

        const user = await this.getUser(userId);

        if (!user)
            throw new NotFoundException(ERROR_MESSAGES.USER_NOT_FOUND);

        const token = this.makeToken(user);

        return {
            user: UserViewModel.fromEntity(user),
            token
        };
    }

    private async getUser(id: number): Promise<User> {
        return await User.findOne({
            where: { id }
        });
    }

    public makeToken(user: User): string {

        const payload: TokenPayload = { userId: user.id };

        const token = jwt.sign(
            payload,
            ENV_CONFIG.JWT_SECRET,
            { expiresIn: "120h" }
        );

        return token;
    }

    private verifyPassword(inputPassword: string, userPassword: string): void {
        if (!bcrypt.compareSync(inputPassword, userPassword))
            throw new AuthException(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }
}