'use client'

import { DrizzleChats } from '@/lib/db/schema'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { MessageCircle, PlusCircle, Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import axios from 'axios'
import SubscriptionButton from './SubscriptionButton'

type Props = {
    chats: DrizzleChats[],
    chatId: number,
    isPro: boolean
}

const ChatSideBar = ({chats, chatId, isPro}: Props) => {
    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const handleSubscription = async () => {
        try {
            setLoading(true)
            const response = await axios.get('/api/stripe')
            window.location.href = response.data.url
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const toggleSidebar = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <button 
                onClick={toggleSidebar} 
                className="fixed top-4 left-4 z-50 md:hidden bg-gray-800 p-2 rounded-md"
            >
                <Menu className="w-6 h-6 text-white" />
            </button>

            <div className={cn(
                'fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 text-gray-200 p-4 transform transition-transform duration-300 ease-in-out md:translate-x-0',
                {
                    'translate-x-0': isOpen,
                    '-translate-x-full': !isOpen
                }
            )}>
                <Link href='/'>
                    <Button className="w-full border-dashed border-white border">
                        <PlusCircle className='mr-2 w-4 h-4'/>
                        New Chat
                    </Button>
                </Link>

                <div className="flex flex-col gap-2 mt-4 overflow-y-auto max-h-[calc(100vh-200px)]">
                    {chats.map(chat => (
                        <Link key={chat.id} href={`/chat/${chat.id}`}>
                            <div className={
                                cn('rounded-lg p-3 text-slate-300 flex items-center', {
                                    'bg-blue-600 text-white': chat.id === chatId,
                                    'hover:text-white': chat.id !== chatId
                                })
                            }>
                                <MessageCircle className='mr-2 flex-shrink-0'/>
                                <p className="w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis">{chat.pdfName}</p>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 text-sm text-slate-500 flex-wrap">
                        <Link href='/'>Home</Link>
                        <SubscriptionButton isPro={isPro}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatSideBar