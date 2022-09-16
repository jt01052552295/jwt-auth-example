import { atom, selector } from "recoil";
export const authAtom = atom({
  key: "authAtom", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export const nameState = atom({
  key: "nameState", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});
