import { CartSlice } from '@/store/cartSlice';
import { UserSlice } from '@/store/userSlice';

export type Store = UserSlice & CartSlice;

// export type Store = {
//   user: UserSlice;
//   cart: CartSlice;
// };
