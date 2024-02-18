import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { sendMail } from "@/helpers/mailer";
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log(token);
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt:new Date()},
    });
    console.log(user)
    if (!user) {
      return NextResponse.json({ message: "Invalid token" }, { status: 400 });
    }
    console.log(user);
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();
    return NextResponse.json(
      { message: "Email Verified SuccessFully", success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
