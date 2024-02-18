import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const response=NextResponse.json({
            success:true,
            message:"LogOut SuccessFully !!!"
        })
        response.cookies.set("token", "", {httpOnly:true,expires:new Date(0)});
        return response
        } catch (error:any) {
        return NextResponse.json({message:"error while logout",error:error.message},{status:500})
    }
}