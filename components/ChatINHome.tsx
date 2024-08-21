"use client"
import { useSession } from 'next-auth/react';
import React, { useState } from 'react'
import { BsPaperclip } from 'react-icons/bs';
import { RxPaperPlane } from 'react-icons/rx';

type Props={
  chatID: string;
}


function ChatINHome({ chatID }: Props) {
    const [prompt, setPrompt] = useState("");
    const {data: session} = useSession();
    return (
      <div className="bg-neutral-400/50 rounded-3xl text-sm text-gray-300 mb-2 mx-3 mt-5">
        <form action="" className="p-2 space-x-12 md:space-x-80 flex mx-3">
          <button><BsPaperclip className="w-5 h-5 dark:text-gray-300 text-black" /></button>
          <input type="text"
            className="w-full bg-transparent md:space-x-60 focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-400"
            disabled={!session}
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder="Enter your message here..."
          />
          <button type="submit" disabled={!prompt || !session} className="hover:opacity-40 font-bold disabled:cursor-not-allowed"><RxPaperPlane className="h-4 -rotate-45 w-4 dark:text-gray-300 text-black" /></button>
        </form>
      </div>
)
}

export default ChatINHome