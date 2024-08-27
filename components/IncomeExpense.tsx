import getIncomeExpense from "@/app/actions/getIncomeExpense";

import { formatNumToDecimalString } from "@/lib/utils";
import { toast } from "react-toastify";


const IncomeExpense = async () => {
  try {
    const { income, expense, error } = await getIncomeExpense()
    if (error) {
      console.error(error);
      toast.error(error);
      return null;
    } else {
      let clientIncomeTotal;
      let clientExpensesTotal;
      if (typeof income === "number" && income === income) {
        clientIncomeTotal = formatNumToDecimalString(income);
      }
      if (typeof expense === "number" && expense === expense) {
        clientExpensesTotal = formatNumToDecimalString(expense);
      }
      return (
        <div className="inc-exp-container">
          <div>
            <h4>Income</h4>
            <p className="money plus">${clientIncomeTotal}</p>
          </div>
          <div>
            <h4>Expenses</h4>
            <p className="money minus">(${clientExpensesTotal})</p>
          </div>
        </div>
      );
    }
  } catch (error) {
    console.error(error)
  }
}
export default IncomeExpense;