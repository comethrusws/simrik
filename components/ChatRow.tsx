"use client"
import { db } from '../firebase';
import { collection, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, {  useEffect, useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore';
import {  HiOutlineTrash } from 'react-icons/hi2';

type Props = {
    id: string;
  }

function ChatRow({id}: Props) {

    const pathname = usePathname();
    const router = useRouter();
    const {data: session} = useSession();
    const [active, setActive] = useState(false);

    const [messages] = useCollection(
        collection(db, "users", session?.user?.email!, "chats", id, "messages")
    )

    useEffect(() => {
        if (!pathname) return;
        setActive(pathname.includes(id))
    },[pathname]);

    const removeChat = async()=>{
        await deleteDoc(doc(db, "users", session?.user?.email!, "chats", id));
        router.replace("/")
    }

  return (
    <Link className={`chatRow justify-center ${active && `bg-neutral-500/50 dark:bg-neutral-600/50`}`} href={`chat/${id}`}>
        <p className="flex-1 hidden md:inline-flex truncate">
            {messages?.docs[messages.docs.length - 1]?.data().text || "New Chat"}
        </p>
        <HiOutlineTrash onClick={removeChat} className="h-5 w-5 hover:text-red-500" />
    </Link>
  )
}

export default ChatRow