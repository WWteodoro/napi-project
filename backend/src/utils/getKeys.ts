import { User } from "../entities/user";
import { IUser } from "../interfaces.ts/IUserInterface";

export function getUserKeys() {
  let toReturn: Array<keyof IUser> = [];
  type PropsArray = Array<keyof IUser>;
  const propsArray: PropsArray = Object.keys(new User({} as IUser)) as PropsArray;

  for (const prop of propsArray) {
    if (prop === 'password' || prop === 'updatedAt' || prop === 'createdAt') continue;
    toReturn.push(prop);
  }
  return toReturn;
}