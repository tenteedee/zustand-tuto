import { useCartStore } from '@/store/store';
import { useShallow } from 'zustand/shallow';
import { Button } from './ui/button';
import { Minus, Plus } from 'lucide-react';
import { useEffect } from 'react';

type Props = { productID: string };
const ChangeQuantityButton = ({ productID }: Props) => {
  const { getProductById, decrementQuantity, incrementQuantity, setTotal } =
    useCartStore(
      useShallow((state) => ({
        getProductById: state.getProductById,
        decrementQuantity: state.decrementQuantity,
        incrementQuantity: state.incrementQuantity,
        setTotal: state.setTotal,
      }))
    );

  const product = getProductById(productID);

  useEffect(() => {
    const unSub = useCartStore.subscribe(
      (state) => state.products,
      (products) => {
        setTotal(
          products.reduce(
            (acc, product) => acc + product.price * product.quantity,
            0
          )
        );
      },
      { fireImmediately: true }
    );
    return unSub;
  }, [setTotal]);

  return (
    <>
      {product && (
        <div className='flex gap-2 items-center'>
          <Button onClick={() => decrementQuantity(product.id)} size='icon'>
            <Minus />
          </Button>
          <p>{product.quantity}</p>
          <Button onClick={() => incrementQuantity(product.id)} size='icon'>
            <Plus />
          </Button>
        </div>
      )}
    </>
  );
};

export default ChangeQuantityButton;
