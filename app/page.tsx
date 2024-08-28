import { currentUser } from '@clerk/nextjs/server';
import Guest from '../components/Guest';
import AddTransaction from '@/components/AddTransaction';
import Balance from '@/components/Balance';
import IncomeExpense from '@/components/IncomeExpense';
import TransactionList from '@/components/TransactionList';

const Hompage = async () => {

  const user = await currentUser();

  if (!user) return (<Guest />)

  return (
    <main>
      <h2>{user.firstName}&apos;s 💰💰💰 Tracker</h2>
      <Balance />
      <IncomeExpense />
      <AddTransaction />
      <TransactionList />
    </main>
  );
}

export default Hompage;