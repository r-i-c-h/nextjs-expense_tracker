import getUserBalance from "@/app/actions/getUserBalance";
import { formatNumToDecimalString } from "@/lib/utils";

const Balance = async () => {
  const { balance, error } = await getUserBalance();
  if (error) {
    console.error(error);
    return (
      <>
        <h2>Unkown Error:</h2>
        <h3 style={{ color: 'red' }}>{error}</h3>
      </>
    );
  }

  const accountBal = balance ? formatNumToDecimalString(balance) : 0;

  return (
    <>
      <h4>Account Balance</h4>
      <h2
        style={(!balance || balance < 0) ? { color: 'red' } : {}}
      >
        ${accountBal}
      </h2>
    </>
  );
}
export default Balance;