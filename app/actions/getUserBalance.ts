'use server';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { jsDecimalSum } from '@/lib/utils';

interface BalanceResponse {
  balance?: number;
  error?: string;
}

async function getUserBalance(): Promise<BalanceResponse> {
  try {
    const { userId } = auth();
    if (!userId) {
      return { error: 'No User Found' };
    }

    const transactions = await db.transaction.findMany({
      where: { userId }
    });

    const balance = transactions.reduce((sum, transaction) => {
      return jsDecimalSum(sum, transaction.amount);
    }, 0);

    return { balance };
  } catch (error) {
    return { error: 'Database Error Getting Balance' };
  }
}

export default getUserBalance;
