import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

// Check Clerk Login Status
export const checkUser = async () => {
  const user = await currentUser();

  // INVALID Clerk result:
  if (!user) { return null; }

  // VALID Clerk result ⫸⫸⫸
  // Look for records in our Prisma / Neon Database
  const loggedInUser = await db.user.findUnique({
    where: {
      clerkUserId: user.id
    }
  })

  // IF alreay in db, return the user
  if (loggedInUser) { return loggedInUser }

  // ELSE Create new User from the clerk user data
  const newUser = await db.user.create({
    data: {
      clerkUserId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress
    }
  });

  return newUser
}