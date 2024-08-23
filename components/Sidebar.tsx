"use client"
import React, { useState } from 'react';
import NewChat from './newChat';
import { signOut, useSession } from 'next-auth/react';
import { PiStarFourFill } from 'react-icons/pi';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '@/firebase';
import { collection, orderBy, query } from 'firebase/firestore';
import ChatRow from './ChatRow';
import { TbLayoutSidebar } from 'react-icons/tb';
import { MdVerifiedUser } from 'react-icons/md';

function Sidebar() {
    const { data: session } = useSession();
    const [chats, loading, error] = useCollection(
        session && query(collection(db, "users", session.user?.email!, "chats"), orderBy("createdAt", "desc"))
    );

    const [isMinimized, setIsMinimized] = useState(false);

    const toggleSidebar = () => {
        setIsMinimized(!isMinimized);
    };

    return (
        <div className={`bg-neutral-400 dark:bg-neutral-900 h-screen overflow-y-auto ${isMinimized ? 'w-16' : 'max-w-xs md:min-w-[20rem]'} transition-all duration-300`}>
            <div className="p-2 flex flex-col min-h-screen">
                <div className="flex-1">
                    <div className="flex content-center items-center justify-between px-2">
                        <TbLayoutSidebar 
                            className="w-6 h-6 text-neutral-600 cursor-pointer dark:hover:text-neutral-400 hover:text-neutral-500"
                            onClick={toggleSidebar} // Add this onClick handler
                        />
                        {!isMinimized && (
                            <MdVerifiedUser className="w-5 h-5 text-neutral-600 cursor-not-allowed" />
                        )}
                    </div>
                    {!isMinimized && (
                        <>
                            <p className="flex text-[10px] mb-3 mt-1 dark:text-neutral-400 text-neutral-600 items-center justify-center">SIMRIK: powered on GEM-1o(Aug)</p>
                            <div>
                                {/* New chat here btw */}
                                <NewChat />

                                <div>
                                    {/* Model Selection */}
                                </div>

                                {/* map thru Chat rows */}
                                {chats?.docs.map(chat => (
                                    <ChatRow key={chat.id} id={chat.id} />
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {session && !isMinimized && (
                    <span onClick={() => signOut()} className="flex text-balance items-center">
                        <img className="h-10 w-10 flex cursor-pointer mb-2 hover:opacity-50 rounded-full align-middle" src={session.user?.image!} alt="" />
                        <p className="flex cursor-pointer mx-3 align-middle text-neutral-950 dark:text-gray-300">{session.user?.name!}</p> 
                        <PiStarFourFill className="h-4 -ml-2 w-4" />
                    </span>
                )}
            </div>
        </div>
    );
}

export default Sidebar;
