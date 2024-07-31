import ChatComponent from '@/components/ChatComponent'
import ChatSideBar from '@/components/ChatSideBar'
import PDFViewer from '@/components/PDFViewer'
import { db } from '@/lib/db'
import { chats } from '@/lib/db/schema'
import { checkSubscription } from '@/lib/subscription'
import { auth } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
    params: {
        chatId: string
    }
}

const ChatPage = async ({ params: { chatId } }: Props) => {
    const { userId } = await auth()
    if (!userId) {
        return redirect('/sign-in')
    }
    const _chats = await db.select().from(chats).where(eq(chats.userId, userId))
    if (!_chats) {
        return redirect('/')
    }
    if (!_chats.find(chat => chat.id === parseInt(chatId))) {
        return redirect('/')
    }

    const currentChat = _chats.find(chat => chat.id === parseInt(chatId))
    const isPro = await checkSubscription()

    console.log("PDF URL IN PAGE COMPONENT:", currentChat?.pdfUrl);

    return (
        <div className="flex h-screen overflow-hidden">
            <div className="hidden md:flex w-64 flex-shrink-0">
                <ChatSideBar chats={_chats} chatId={parseInt(chatId)} isPro={isPro} />
            </div>
            <div className="flex flex-col flex-grow overflow-hidden">
                <div className="flex flex-grow overflow-hidden">
                    <div className="w-1/2 overflow-y-auto">
                        <PDFViewer pdf_url={currentChat?.pdfUrl || ''} />
                    </div>
                    <div className="w-1/2 border-l border-gray-200 overflow-y-auto">
                        <ChatComponent chatId={parseInt(chatId)} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatPage