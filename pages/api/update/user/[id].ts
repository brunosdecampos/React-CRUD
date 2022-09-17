import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from '@lib/prisma'

// PUT /api/update/user/:id
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userId = String(req.query.id)
  const { firstName, lastName, email } = req.body

  if (req.method === 'PUT') {
    const user = await prisma.user.update({
      where: {
        userId: userId
      },
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email
      }
    })
    res.status(200).json(user)
  } else {
    res.status(400).json({ message: 'The request could not be completed' })
  }
}