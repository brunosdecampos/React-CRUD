import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from '@lib/prisma'

// GET /api/users
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await prisma.user.findMany({
    select: {
      userId: true,
      firstName: true,
      lastName: true,
      email: true
    },
    orderBy: [
      { firstName: 'asc' },
      { lastName: 'asc' },
      { email: 'asc' }
    ],
  })

  res.status(200).json(user)
}