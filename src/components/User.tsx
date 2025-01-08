import { Popover, PopoverContent } from '@/components/ui/popover';
import { PopoverTrigger } from '@radix-ui/react-popover';
import { Button } from '@/components/ui/button';
import { CircleX, ShoppingCart, Trash2, UserIcon } from 'lucide-react';
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
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useEffect } from 'react';

const User = () => {
  const { fullname, username, address, setAddress, fetchUser } = useUserStore(
    useShallow((state) => ({
      fullname: state.fullname,
      username: state.username,
      address: state.address,
      setAddress: state.setAddress,
      fetchUser: state.fetchUser,
    }))
  );

  useEffect(() => {
    const fetchData = async () => {
      await fetchUser();
    };
    fetchData();
  }, [fetchUser]);

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant='secondary' size='icon'>
            <UserIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='overflow-y-scroll space-y-2 w-96 bg-slate-50'>
          <div className='flex gap-2 text-lg justify-between items-center'>
            <p>{fullname}</p>
            <p className='text-sm'>{username}</p>
          </div>
          <div>
            <Label htmlFor='address'>Address:</Label>
            <Input
              id='address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default User;
