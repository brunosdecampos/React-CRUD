import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '@lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  // console.log('Debug');
  // console.log(id);
  // const person = await prisma.person.findMany({
  //   select: {
  //     personId: true
  //   }
  // });
  // console.log(person);
  // res.status(200).json(person);

  const user = await prisma.person.findMany({
    select: {
      personId: true,
      firstName: true,
      lastName: true,
      email: true
    }
  });

  res.status(200).json(user);

  // const email = req.query.email;

  // const person = await prisma.person.findFirst({
  //   where: {
  //     email: email,
  //   },
  // })

  // res.status(200).json(person);




  // const person = await prisma.person.findFirst({
  //   where: { email: String(email) }
  // });

  // res.status(200).json(person);
}





// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === "GET") {
//     const profiles = await prisma.profiles.findMany();

//     res.status(200).json(profiles);
//   }

//   if (req.method === "POST") {
//     const { name, email } = req.body;

//     const profile = await prisma.profiles.create({
//       data: {
//         name: name,
//         // @ts-ignore
//         email: email,
//       },
//     });

//     res.status(201).json({ profile });
//   }

//   res.status(200).json({ name: "John Doe" });
// }