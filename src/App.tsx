import { Button } from "@/components/ui/button";
import { create } from "zustand";

const useStore = create<{
  count: number;
  increment: () => void;
  decrement: () => void;
}>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

const App = () => {
  const store = useStore();
  return (
    <div>
      <Button onClick={store.increment}>+</Button>
      <div>{store.count}</div>
      <Button onClick={store.decrement}>-</Button>
    </div>
  );
};

export default App;
