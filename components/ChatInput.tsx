
"use client";
import { db } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import React, { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { BsPaperclip } from 'react-icons/bs';
import { RxPaperPlane } from 'react-icons/rx';

type Props = {
  chatID: string;
};

function ChatInput({ chatID }: Props) {
  const [prompt, setPrompt] = useState("");
  const { data: session } = useSession();
  const model = "Llama-3.1-Storm-8B";

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) return;

    const input = prompt.trim();
    setPrompt("");

    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar: session?.user?.image! || `https://ui-avatars.com/api/?name=${session?.user?.name}`,
      }
    };

    try {
      await addDoc(
        collection(db, "users", session?.user?.email!, "chats", chatID, "messages"),
        message
      );

      const notification = toast.loading('SIMRIK is thinking...');

      const response = await fetch('/api/askQuestion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: input,
          chatID,
          session
        }),
      });

      const data = await response.json();

      toast.success('Successful!', {
        id: notification,
      });

      if (response.ok) {
        const aiMessage: Message = {
          text: data.answer || "SIMRIK was unable to find an answer for that",
          createdAt: serverTimestamp(),
          user: {
            _id: "SIMRIK",
            name: "SIMRIK",
            avatar: "/login.png",
          }
        };

        await addDoc(
          collection(db, "users", session?.user?.email!, "chats", chatID, "messages"),
          aiMessage
        );
      } else {
        toast.error('Failed to get a response from SIMRIK.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error sending message!');
    }
  };

  return (
    <div className="bg-neutral-400/50 rounded-3xl text-sm text-gray-300 mb-2 mx-3">
      <form onSubmit={sendMessage} className="p-2 space-x-7 flex mx-3">
        <button type="button" disabled={!session}>
          <BsPaperclip className="w-5 h-5 dark:text-gray-300 text-black" />
        </button>
        <input
          type="text"
          className="bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-400"
          disabled={!session}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your message here..."
        />
        <button
          type="submit"
          disabled={!prompt || !session}
          className="hover:opacity-40 font-bold disabled:cursor-not-allowed"
        >
          <RxPaperPlane className="h-4 -rotate-45 w-4 dark:text-gray-300 text-black" />
        </button>
      </form>
    </div>
  );
}
  export default ChatInput