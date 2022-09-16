import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { firstName, lastName, email } = req.body

  try {
    await prisma.person.create({
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