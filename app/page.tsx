import { currentUser } from '@clerk/nextjs/server';
import Guest from '../components/Guest';

const Hompage = async () => {

  const user = await currentUser();

  if (!user) return (<Guest />)

  return (
    <main>
      <h1>{user.firstName}&apos;s 💰💰💰 Tracker</h1>
    </main>
  );
}

export default Hompage;