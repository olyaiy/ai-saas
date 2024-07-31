import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { ArrowRight, LogIn } from 'lucide-react'
import FileUpload from "@/components/FileUpload";
import { checkSubscription } from "@/lib/subscription";
import SubscriptionButton from "@/components/SubscriptionButton";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { chats } from "@/lib/db/schema";

export default async function Home() {
  const { userId } = await auth()
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
    <div className="w-full min-h-screen bg-gradient-to-tr from-slate-900 to-sky-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center flex-wrap justify-center gap-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white">Chat with any PDF</h1>
            <UserButton afterSignOutUrl="/"/>
          </div>

          <div className="flex flex-col mt-6 w-full max-w-md">
            <div className="flex flex-col sm:flex-row gap-4 mb-4 justify-center">
              {isAuth && firstChat && (
                <Link href={`chat/${firstChat.id}`}>
                  <Button className="w-full sm:w-auto">
                    Go To Chats
                    <ArrowRight className="ml-2 w-4 h-4"/>
                  </Button> 
                </Link>
              )}
              {isAuth ? (
                <SubscriptionButton isPro={isPro}/>
              ) : (
                <Link href='/sign-up' className="w-full sm:w-auto">
                  <Button className="w-full">
                    Sign-up or Login
                    <LogIn className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              )}
              {/* {!isAuth && <SubscriptionButton isPro={isPro}/>} */}
            </div>
            
            {isAuth && (
              <div className="w-full">
                <FileUpload/>
              </div>
            )}
          </div>

          <p className="max-w-xl mt-6 text-base sm:text-lg text-slate-300">
            Join students, researchers, and professionals to instantly answer 
            questions and understand complex PDF documents with AI.
          </p> 
        </div>
      </div>
    </div>
  )
}