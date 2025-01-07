import { StateCreator } from 'zustand';

type UserState = {
  username: string;
  fullname: string;
  age: number;
  address: string;
};

type UserActions = {
  setAddress: (address: string) => void;
};

export type UserSlice = UserState & UserActions;

export const createUserSlice: StateCreator<
  UserSlice,
  [['zustand/immer', never]],
  [],
  UserSlice
> = (set) => ({
  username: '',
  fullname: '',
  age: 0,
  address: '',

  setAddress: (address) => set((state) => (state.address = address)),
});

// const useCountStore = create<{ nested: {count: number} ; increment: () => void}>(
//   (set) => ({
//     nested: { count: 0 },
//     increment: () => set((state) => ({ nested: {...state.nested, count: state.nested.count + 1 } })),
//   })
// )
