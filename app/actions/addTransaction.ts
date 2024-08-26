'use server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

interface TransactionData {
  text: string;
  amount: number;
}

interface TransactionResult {
  data?: TransactionData;
  error?: string;
}

async function addTransaction(formData: FormData): Promise<TransactionResult> {
  // Form Values:
  const textVal = formData.get('text') as string;
  const amountVal = formData.get('amount') as string;

  // Validate Form Submission Data
  let isAmountZero = parseFloat(amountVal) == 0 || amountVal.length == 0;

  if (!textVal || textVal.trim().length == 0 || !amountVal || isAmountZero) {
    return { error: 'Invalid Form Input.\nPlease try again.' };
  }

  // Validate User
  const { userId } = auth();
  if (!userId) {
    return { error: 'No User Found' };
  }

  try {
    // Setup TransactionData
    const text: string = textVal.toString();
    const amount: number = parseFloat(amountVal.toString());

    const submissionData = { text, amount, userId };
    const transactionData: TransactionData = await db.transaction.create({
      data: submissionData
    });

    revalidatePath('/'); // Force Page Refresh

    return { data: transactionData };
  } catch (err) {
    console.error('Problem when sending submissionData');
    return { error: 'Transaction not verified.' };
  }
}

export default addTransaction;
