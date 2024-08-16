"use client"

const AddTransaction = () => {
  const clientAction = async (formData: FormData) => {
    console.log('formData>> ', formData.get('text'), formData.get('amount'));
  }

  return (<>
    <h3>Transactions</h3>
    <form action={clientAction}>
      <fieldset role="group" aria-labelledby="fieldLegend">
        <legend id="fieldLegend">Add Transaction</legend>
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