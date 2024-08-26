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
  const textValue = formData.get('text');
  const amountValue = formData.get('amount');

  // Validate Form Submission Data
  if (!textValue || textValue === '' || !amountValue || amountValue === '') {
    return { error: 'Invalid Form Input.\nPlease try again.' };
  }

  // Validate User
  const { userId } = auth();
  if (!userId) {
    return { error: 'No User Found' };
  }

  try {
    // Setup TransactionData
    const text: string = textValue.toString();
    const amount: number = parseFloat(amountValue.toString());

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
