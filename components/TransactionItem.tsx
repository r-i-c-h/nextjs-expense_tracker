'use client';

import { toast } from "react-toastify";
import deleteTransaction from "@/app/actions/deleteTransaction";
import { formatNumToDecimalString } from "@/lib/utils";
import { Transaction } from "@/types/Transaction";

const TransactionItem = ({ transaction }: { transaction: Transaction; }) => {
  const { amount, text, id } = transaction;

  const handleDeleteTransaction = async (transactionId: string) => {
    const isConfirmed = window.confirm('Are you sure you wish to delete this transaction?');
    if (!isConfirmed) { return null; }

    const { message, error } = await deleteTransaction(transactionId);
    if (error) {
      console.error(error);
      toast.error(error);
      return null;
    }
    toast.success(message);
    return null;
  };

  const colorClass = amount < 0 ? 'minus' : 'plus';
  const prefix = amount < 0 ? '-' : '+';
  const displayAmount = formatNumToDecimalString(Math.abs(amount)); // for pretty screen display formatting...

  return (
    <li className={colorClass}>
      {text}
      <span>{prefix}${displayAmount}</span>
      <button
        className="delete-btn"
        onClick={() => handleDeleteTransaction(id)}
      >
        X
      </button>
    </li>
  );
};
export default TransactionItem;