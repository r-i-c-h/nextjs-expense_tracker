import { toast } from "react-toastify";
import { formatNumToDecimalString } from "@/lib/utils";
import { Transaction } from "@/types/Transaction";

const TransactionItem = ({ transaction }: { transaction: Transaction; }) => {
  const { amount, text, id } = transaction;

  const colorClass = amount < 0 ? 'minus' : 'plus';
  const prefix = amount < 0 ? '-' : '+';
  const displayAmount = formatNumToDecimalString(Math.abs(amount)); // for pretty screen display formatting...

  return (
    <li className={colorClass}>
      {text}
      <span>{prefix}{displayAmount}</span>
    </li>
  );
};
export default TransactionItem;