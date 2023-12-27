import type { SignupCommand } from "./command/index.js";

class Service {
    async handleSignup(command: SignupCommand.SignupCommand): Promise<void> {

    }

    async handleSignIn(): Promise<void> {

    }
}

export interface IdentityService extends Service {

}

export const identityService = (): IdentityService => new Service()