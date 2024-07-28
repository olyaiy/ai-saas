
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import {ArrowBigRight, ArrowRight, LogIn} from 'lucide-react'
import FileUpload from "@/components/FileUpload";
import { checkSubscription } from "@/lib/subscription";
import SubscriptionButton from "@/components/SubscriptionButton";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { chats } from "@/lib/db/schema";

export default async function Home() {
  const {userId} = await auth()
  const isAuth = !!userId
  const isPro = await checkSubscription()
  let firstChat;
  if (userId) {
    firstChat = await db.select().from(chats).where(eq(chats.userId, userId))
    if (firstChat) {
      firstChat = firstChat[0]
    }

  }


  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 text-5xl font-semibold"> Chat with any PDF</h1>
            <UserButton/>
          </div>

          <div className="flex mt-2">

            {/* if the user is authenticated, show the button to go to chats */}
            {isAuth && firstChat && 
            <Link href={`chat/${firstChat.id}`}>
              <Button>Go To Chats
                <ArrowRight className="ml-2"/>
              </Button> 
            </Link>
            }
            <div className="ml-3">
              <SubscriptionButton isPro={isPro}/>
            </div>

          </div>

         <p className="max-w-xl mt-1 text-lg text-slate-600">
          Join millions of students, researchers, and professionals to instantly answer 
          questions and understand complex PDF documents with AI.
          </p> 

        <div className="w-full mt-4">
          {isAuth ? (
            <FileUpload />
          ):(
            <Link href='/sign-in'>
              <Button> Login to get started
                <LogIn className="w-4 h-4 ml-2" />
              </Button>

            </Link>
          )}
        </div>

        </div>
      </div>
    </div>
  )
}