import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from '@lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userId = req.query.id

  if (req.method === 'DELETE') {
    const user = await prisma.user.delete({
      where: { userId: String(userId) }
    })
    res.json(user)
    res.status(200).json(user)
  } else {
    res.status(400).json({ message: 'The request could not be completed' })
  }
}