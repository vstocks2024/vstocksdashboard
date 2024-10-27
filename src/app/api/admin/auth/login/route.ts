import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
// import { prisma } from "@/prismaClient";

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const { adminname, password } = body;
//     const admin = await prisma.adminProfiles.findUnique({
//       where: {
//         adminname,
//       },
//     });
//     if (!admin)
//       return NextResponse.json(
//         { message: "Invalid email or password" },
//         { status: 400 }
//       );

//     const isPasswordMatch = await bcryptjs.compare(password, admin.password);
//     if (!isPasswordMatch)
//       return NextResponse.json(
//         { message: "Invalid email or password" },
//         { status: 400 }
//       );

//     const tokenData = {
//       id: admin.id,
//       fullname: admin.fullname,
//       adminname: admin.adminname,
//       email: admin.email,
//       phone: admin.phone,
//       imageurl: admin.imageurl,
//     };
//     const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
//       expiresIn: "1d",
//     });
//     const res = NextResponse.json(
//       {
//         message: `Welcome back ${admin.adminname}`,
//         success: true,
//       },
//       { status: 200 }
//     );

//     res.cookies.set("token", token, { httpOnly: true });

//     return res;
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }


export async function POST(req:NextRequest){
  return NextResponse.json({status:200});
}