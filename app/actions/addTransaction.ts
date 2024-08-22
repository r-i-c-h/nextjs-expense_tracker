'use server';
import { auth } from '@clerk/nextjs/server';

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

  // Validate Submission Data
  if (!textValue || textValue === '' || !amountValue || amountValue === '') {
    return { error: 'Invalid Form Input. Please try again.' };
  }

  // Validate User
  const { userId } = auth();
  if (!userId) {
    return { error: 'No User Found' };
  }

  // Setup TransactionData
  const text: string = textValue.toString();
  const amount: number = parseFloat(amountValue.toString());
  const transactionData: TransactionData = { text, amount };

  return { data: transactionData };
}

export default addTransaction;
