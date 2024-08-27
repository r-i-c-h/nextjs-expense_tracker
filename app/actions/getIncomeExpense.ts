'use server';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { jsDecimalSum } from '@/lib/utils';

interface IncomeExpenseResponse {
  income?: number;
  expense?: number;
  error?: string;
}

async function getIncomeExpense(): Promise<IncomeExpenseResponse> {
  try {
    const { userId } = auth();
    if (!userId) {
      return { error: 'No User Found' };
    }

    const transactions = await db.transaction.findMany({
      where: { userId }
    });

    const transactionHistory = transactions.map((transaction) => transaction.amount);

    const incomeTotal = transactionHistory
      .filter((item) => item > 0)
      .reduce((sum, item) => jsDecimalSum(sum, item), 0);

    const expensesTotal = transactionHistory
      .filter((item) => item < 0)
      .reduce((sum, item) => jsDecimalSum(sum, item), 0);

    return { income: incomeTotal, expense: expensesTotal };
  } catch (error) {
    return { error: 'Database Error Getting Income Expense Entries' };
  }
}

export default getIncomeExpense;
