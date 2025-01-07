import { CartProduct } from '@/types/cartProduct';
import { Product } from '@/types/product';
import { StateCreator } from 'zustand';

type CartState = {
  products: CartProduct[];
  total: number;
};

type CartActions = {
  addProduct: (product: Product) => void;
  removeProduct: (id: string) => void;
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
  getProductById: (id: string) => CartProduct | undefined;
  setTotal: (total: number) => void;
  reset: () => void;
};

export type CartSlice = CartState & CartActions;

const initialState: CartState = {
  products: [],
  total: 0,
};
export const createCartSlice: StateCreator<
  CartSlice,
  [['zustand/immer', never]],
  [],
  CartSlice
> = (set, get) => ({
  ...initialState,
  incrementQuantity: (id) =>
    set((state) => {
      const foundProduct = state.products.find((product) => product.id === id);
      if (foundProduct) {
        foundProduct.quantity++;
      }
    }),

  decrementQuantity: (id) =>
    set((state) => {
      const foundIndex = state.products.findIndex(
        (product) => product.id === id
      );
      if (foundIndex !== -1) {
        if (state.products[foundIndex].quantity === 1) {
          state.products.splice(foundIndex, 1);
        } else {
          state.products[foundIndex].quantity--;
        }
      }
    }),
  addProduct: (product) =>
    set((state) => {
      state.products.push({ ...product, quantity: 1 });
    }),
  removeProduct: (id) =>
    set((state) => {
      state.products.filter((product) => product.id !== id);
    }),
  getProductById: (id) => get().products.find((product) => product.id === id),
  setTotal: (total) => {
    set((state) => {
      state.total = total;
    });
  },
  reset: () => set(() => initialState),
});

// const useCountStore = create<{ nested: {count: number} ; increment: () => void}>(
//   (set) => ({
//     nested: { count: 0 },
//     increment: () => set((state) => ({ nested: {...state.nested, count: state.nested.count + 1 } })),
//   })
// )
