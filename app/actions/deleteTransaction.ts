'use server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

async function deleteTransaction(transactionId: string): Promise<{
  message?: string;
  error?: string;
}> {
  try {
    // Validate User
    const { userId } = auth();
    if (!userId) {
      return { error: 'No User Found' };
    }

    const result = await db.transaction.delete({
      where: {
        id: transactionId,
        userId
      }
    });

    revalidatePath('/'); // Force Page Refresh

    return { message: `Deleted Transaction #${transactionId}` };
  } catch (err) {
    console.error('Problem with Deleting Transaction.');
    return { error: 'Problem with Deleting Transaction.' };
  }
}

export default deleteTransaction;
