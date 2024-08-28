import { currentUser } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

// Check Clerk Login Status
export const checkUser = async () => {
  const user = await currentUser();

  // INVALID Clerk result:
  if (!user) {
    return null;
  }

  // VALID Clerk result ⫸⫸⫸
  // Look for the Clerk User in our Neon Database
  const loggedInUser = await db.user.findUnique({
    where: {
      clerkUserId: user.id
    }
  });

  // IF alreay in our db, return the user
  if (loggedInUser) {
    return loggedInUser;
  }

  // ELSE Create new a User in our Neon db from the Clerk `user` data

  // Default Name if there isn't a firstName and lastName in Clerk...
  const { firstName, lastName } = user; // <~~ The *Clerk* `user`
  const fName = firstName ?? 'Anonymous';
  const lName = lastName ?? 'User';

  const newUser = await db.user.create({
    data: {
      clerkUserId: user.id,
      name: `${fName} ${lName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress
    }
  });

  return newUser;
};
