import { connectMongoDb } from "@/lib/mongo";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req){
    try {
        await connectMongoDb()

        const {username, password} = await req.json()

        // checking if user exists
        const user = await User.findOne({username})

        if(!user) return NextResponse.json({message:"Invalid login credentials"}, {status:400})
    } catch (error) {
        
    }
}