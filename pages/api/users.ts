import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '@lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await prisma.person.findMany({
    select: {
      personId: true,
      firstName: true,
      lastName: true,
      email: true
    }
  });

  res.status(200).json(user);
}