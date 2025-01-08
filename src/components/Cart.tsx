import { Popover, PopoverContent } from '@/components/ui/popover';
import { PopoverTrigger } from '@radix-ui/react-popover';
import { Button } from '@/components/ui/button';
import { CircleX, ShoppingCart, Trash2 } from 'lucide-react';
import { useCartStore, useUserStore } from '@/store/store';
import { useShallow } from 'zustand/shallow';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ChangeQuantityButton from './ChangeQuantityButton';

const Cart = () => {
  const { reset, products, removeProduct, total } = useCartStore(
    useShallow((state) => ({
      reset: state.reset,
      products: state.products,
      removeProduct: state.removeProduct,
      total: state.total,
    }))
  );
  const { address } = useUserStore(
    useShallow((state) => ({ address: state.address }))
  );

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant='secondary' size='icon'>
            <ShoppingCart />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='overflow-y-scroll space-y-2 w-96 bg-slate-50'>
          <div className='flex gap-2 text-lg items-center'>
            <h1>Cart: </h1>
            <Button onClick={reset} variant='destructive' size='icon'>
              <CircleX />
            </Button>
          </div>
          <div className='space-y-2'>
            {products.map((product) => (
              <Card
                className='flex flex-col items-center gap-2'
                key={product.id}
              >
                <CardHeader className='flex flex-row items-center gap-2'>
                  <CardTitle>{product.title}</CardTitle>
                  <Button
                    onClick={() => removeProduct(product.id)}
                    variant='destructive'
                    size='icon'
                  >
                    <Trash2 />
                  </Button>
                </CardHeader>
                <CardContent>{product.price}</CardContent>
                <CardFooter>
                  <ChangeQuantityButton productID={product.id} />
                </CardFooter>
              </Card>
            ))}
          </div>
          <p>Total: {total}$</p>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Cart;
