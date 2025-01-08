import { StateCreator } from 'zustand';

type UserState = {
  username: string;
  fullname: string;
  age: number;
  address: string;
};

type UserActions = {
  setAddress: (address: string) => void;
  fetchUser: () => Promise<void>;
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
  fetchUser: async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set((state) => {
        state.username = 'user@gmail.com';
        state.fullname = 'User';
        state.age = 30;
        state.address = 'AgileTech VN';
      });
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  },
});

// const useCountStore = create<{ nested: {count: number} ; increment: () => void}>(
//   (set) => ({
//     nested: { count: 0 },
//     increment: () => set((state) => ({ nested: {...state.nested, count: state.nested.count + 1 } })),
//   })
// )
