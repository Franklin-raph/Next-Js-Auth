import Link from "next/link";
import Logo from '../../../public/images/dojo-logo.png'
import Image from "next/image";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Navbar() {
    const session = await getServerSession(authOptions)

    // if(session) redirect("/dashboard")
  return (
    <nav>
        <Image 
            src={Logo}
            alt="Logo image"
            width={70}
            quality={100}
            placeholder="blur"
        />
        <h1>Next Authentication</h1>
        {session ? 
        <p className="text-black">User</p>
        : 
         <ul className="flex items-center gap-3 navlinks">
            <li>
                <Link href={"/login"}>Login</Link>
            </li>
            <li>
                <Link href={"/register"}>Register</Link>
            </li>
        </ul>
        }
       
    </nav>
  )
}
