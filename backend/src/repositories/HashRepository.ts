import * as argon2 from "argon2";
import { IHashRepository } from "../interfaces.ts/IHashRepository";

export class HashRepository implements IHashRepository {
    async cryptographie(password: string): Promise<string> {
        return await argon2.hash(password);
    }

    async uncryptographie(password: string, cryptographicPassword: string): Promise<boolean> {
        return await argon2.verify(cryptographicPassword, password);
    }
}
