import { currentUser } from '@clerk/nextjs/server';
import Guest from '../components/Guest';
import AddTransaction from '@/components/AddTransaction';

const Hompage = async () => {

  const user = await currentUser();

  if (!user) return (<Guest />)

  return (
    <main>
      <h1>{user.firstName}&apos;s 💰💰💰 Tracker</h1>
      <AddTransaction />
    </main>
  );
}

export default Hompage;