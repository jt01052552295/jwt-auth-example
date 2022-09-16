import { selector } from "recoil";
import { recoilPersist } from "recoil-persist";
import { authAtom, nameState } from "../atom/userAtom";

export const userJwtState = selector({
  key: "userJwtState", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const user = get(authAtom);
    return user;
  },
});

export const lengthState = selector({
  key: "lengthState", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const name = get(nameState);
    const lengthOfName = name.length;
    return lengthOfName;
  },
});
