import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { createUserSlice } from '@/store/userSlice';
import { createCartSlice } from '@/store/cartSlice';
import { CartStore, UserStore } from '@/types/store';
import { devtools } from 'zustand/middleware';
import { subscribeWithSelector } from 'zustand/middleware';

export const useUserStore = create<UserStore>()(
  devtools(
    subscribeWithSelector(
      immer((set, get, api) => ({
        ...createUserSlice(set, get, api),
      }))
    )
  )
);

export const useCartStore = create<CartStore>()(
  devtools(
    subscribeWithSelector(
      immer((set, get, api) => ({
        ...createCartSlice(set, get, api),
      }))
    )
  )
);
