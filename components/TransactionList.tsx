import getTransactions from "@/app/actions/getTransactions";
import { Transaction } from "@/types/Transaction";
import { toast } from "react-toastify";

const TransactionList = async () => {
  const { transactions, error } = await getTransactions();
  if (error) {
    console.error(error);
    toast.error(error);
    return <p className="error">{error}</p>;
  }
  return (<>
    <h3>Transaction History</h3>
    <ul className="list">
      {transactions && transactions.map((transaction: Transaction) => {
        return (<><p>{transaction.text}</p></>)
      })}
    </ul>
  </>
  )
    ;
}
export default TransactionList;