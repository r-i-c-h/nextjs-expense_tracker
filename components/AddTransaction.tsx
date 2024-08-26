"use client"
import addTransaction from "@/app/actions/addTransaction" // db functions
import { formatNumToDecimalString } from "@/lib/utils";
import { useRef } from "react"; // for Form clearing
import { toast } from 'react-toastify';

const AddTransaction = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const clientAction = async (formData: FormData) => {
    const { data, error } = await addTransaction(formData);

    if (error) {
      console.error(error)
      let msg = error.toString();

      toast.error(() => <span style={{ whiteSpace: "pre-wrap" }}>{msg}</span>);
    } else {

      formRef.current?.reset(); // clear <form>

      // Change Toast Message based on ± Transaction
      let toastMessage = ''
      let baseString = `${data?.text} for ` // // `🆗 ${data?.text} @	➖$(${data?.amount})`
      const num = data?.amount ?? 0;
      const prettyNum = formatNumToDecimalString(num)
      if (num < 0) {
        toastMessage = `➖🙁💸  ${baseString}$(${prettyNum})`; //
      } else {
        toastMessage = `👍💰➕: ${baseString}$${prettyNum}`; // // 🤑💰
      }
      toast.success(toastMessage); // <~~ GREEN
    }
  }

  return (<>
    {/* <h3>Transactions</h3>  */}
    <form action={clientAction} ref={formRef} >
      <fieldset role="group" aria-labelledby="fieldLegend">
        <legend id="fieldLegend">Create New Transaction</legend>
        <div className="form-control">
          <label htmlFor="text">Description:</label>
          <input type="text" name="text" id="text" placeholder="Transaction Description..." />
        </div>
        <div className="form-control">
          <label htmlFor="amount">Amount:
            <span className="amount-label-comment">
              (Enter Expenses as Negative Numbers, Payments as Positive Numbers)
            </span>
          </label>
          <input
            type="number"
            name="amount"
            id="amount"
            placeholder="Enter Transaction Amount"
            // * The "step" setting on the number input allows for 2-decimal places-
            step="0.01"
          />

          <button className="btn">Add New Transaction</button>
        </div>
      </fieldset>
    </form>
  </>)
}

export default AddTransaction;