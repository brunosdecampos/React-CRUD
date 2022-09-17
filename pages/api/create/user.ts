import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@lib/prisma'

// POST /api/create/user
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { firstName, lastName, email } = req.body

  try {
    await prisma.user.create({
      data: {
        firstName,
        lastName,
        email
      }
    })
    res.status(200).json({ message: 'Success' })
  } catch (error) {
    res.status(400).json({ message: error })
  }
}