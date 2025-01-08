import Cart from './components/Cart';
import ChangeQuantityButton from './components/ChangeQuantityButton';
import { Button } from './components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from './components/ui/card';
import User from './components/User';
import { PRODUCTS_DATA } from './lib/mockData';
import { useUserStore, useCartStore } from '@/store/store';

export default function App() {
  const addProduct = useCartStore((state) => state.addProduct);
  const cartProducts = useCartStore((state) => state.products);

  return (
    <>
      <main className='space-y-2 dark h-screen max-w-sm mx-auto mt-2'>
        <div className='flex justify-between items-center'>
          <User />
          <Cart />
        </div>
        <h1 className='text-2xl'>Products: </h1>
        <div className='space-y-2 px-5'>
          {PRODUCTS_DATA.map((product) => (
            <Card key={product.id}>
              <CardHeader className=' text-lg'>{product.title}</CardHeader>
              <CardContent>{product.price}$</CardContent>
              <CardFooter>
                {cartProducts.find((el) => el.id === product.id) ? (
                  <ChangeQuantityButton productID={product.id} />
                ) : (
                  <Button
                    onClick={() => {
                      addProduct(product);
                    }}
                    variant='default'
                  >
                    Add to cart
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </>
  );
}
