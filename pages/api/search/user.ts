import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from '@lib/prisma'

// GET /api/search/user
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const email = String(req.query.email)
  const userId = String(req.query.uid)

  // Find if there is an user with the email pased via parameters that is any other than the current user
  if (userId && userId !== 'undefined') {
    const user = await prisma.user.findFirst({
      select: {
        userId: true
      },
      where: {
        email: email,
        NOT: {
          userId: userId
        },
      },
    })
    res.status(200).json(user)
  }

  // Find if there is an user with the email passed via parameters
  else {
    const user = await prisma.user.findFirst({
      select: {
        userId: true
      },
      where: {
        email: email
      }
    })
    res.status(200).json(user)
  }
}