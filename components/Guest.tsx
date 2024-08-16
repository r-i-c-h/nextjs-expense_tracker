import { SignInButton } from "@clerk/nextjs";

const Guest = () => {
  return (
    <div className="guest">
      <h1>Welcome to the Money Tracker</h1>
      <p>Please sign in to manage your finances.</p>
      <SignInButton />
    </div>
  );
}

export default Guest;