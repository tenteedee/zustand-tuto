import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { createUserSlice } from '@/store/userSlice';
import { createCartSlice } from '@/store/cartSlice';
import { Store } from '@/types/store';

export const useStore = create<Store>()(
  immer((...a) => ({
    ...createUserSlice(...a),
    ...createCartSlice(...a),
  }))
);
