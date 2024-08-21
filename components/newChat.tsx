"use client"

import { db } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { LuPlus } from 'react-icons/lu'

function NewChat() {

    const router = useRouter();

    const {data: session} = useSession();

    const createNewChat = async() => {
        const doc = await addDoc(
            collection(db,"users", session?.user?.email!, "chats"),{
                messages: [],
                userId: session?.user?.email!,
                createdAt: serverTimestamp(),
        });

        router.push(`/chat/${doc.id}`);
    };

  return (
    <div onClick={createNewChat} className="border-gray-600 border chatRow">
        <LuPlus className="h-4 w-4" />
        <p>New Chat</p>
    </div>
  )
}

export default NewChat