import { currentUser } from '@clerk/nextjs/server';
import { db } from './db';

export const checkUser = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) {
    return null;
  }

  // Check if in Clerk lo
  // user exists in your NEON database
  const loggedInUser = await db.user.findUnique({
    where: {
      clerkUserId: clerkUser.id,
    },
  });

  if (loggedInUser) {
    return loggedInUser;
  }

  // If not, create a new user in your NEON database
  const newUser = await db.user.create({
    data: {
      clerkUserId: clerkUser.id,
      name: `${clerkUser.firstName} ${clerkUser.lastName}`,
      imageUrl: clerkUser.imageUrl,
      email: clerkUser.emailAddresses[0]?.emailAddress,
      // Add any other fields you need
    },
  });

  return newUser;
};
