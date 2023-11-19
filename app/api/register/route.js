import { connectMongoDb } from "@/lib/mongo"
import { NextResponse } from "next/server"
import bcrypt from 'bcryptjs'
import User from "@/models/user"

export async function POST(req){
    try {
        // Connecting to MongoDb
        await connectMongoDb()

        // Getting the user input
        const {username, email, password} = await req.json()

        // Hashing the users password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Checking if the email already exists
        const existingEmail = await User.findOne({email})
        if(existingEmail) return NextResponse.json({message:"Email already exists"}, {status:400})

        // Creating the User
        await User.create({username, email, password:hashedPassword})
        return NextResponse.json({message:"User registred"}, {status:201})
    } catch (error) {
        return NextResponse.json({message:"Error occured"},{status:500})
    }
}