import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendMail } from "@/helpers/mailer";
connect().then(function(){
  console.log("Database Connected");
});
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    console.log(reqBody);

    //check
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        {
          message: "User Already Exist",
        },
        { status: 400 }
      );
    }
    //hashPassword
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

  const newUser=  new User({ username, email, password: hashedPassword });
  const savedUser=await newUser.save();

  console.log(savedUser);
  //send verification Email
  await sendMail({ email, userId: savedUser._id, emailType: "VERIFY" } as any); 
  return NextResponse.json({
    message:"User Created SuccessFully !!",
    success:true,
    savedUser
  })
  
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Some Went Wrong while Saving",
      },
      { status: 500 }
    );
  }
}
