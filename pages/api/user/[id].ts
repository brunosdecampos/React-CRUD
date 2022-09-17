import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from '@lib/prisma'

// GET /api/user/:id
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = String(req.query.id)

  const user = await prisma.user.findFirst({
    select: {
      userId: true,
      firstName: true,
      lastName: true,
      email: true
    },
    where: {
      userId: id
    }
  })

  res.status(200).json(user)
}