import { atom } from "jotai";

interface IUser {
  email: string;
  profilePicture: string;
}

export const isLoggedInAtom = atom<boolean>(false);
export const user = atom<IUser>({
  email: "",
  profilePicture: "",
});
export const allFIRAtom = atom<any>([]);
export const firToEditAtom = atom<any>({});
export const firToViewAtom = atom<any>({});
