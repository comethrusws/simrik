import ChatINHome from "@/components/ChatINHome";
import { AiTwotoneExperiment } from "react-icons/ai";
import { LuAlertTriangle } from "react-icons/lu";
import { MdOutlineBolt } from "react-icons/md";

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-between px-2 p-24 text-black dark:text-white">
      <div className="mb-20">
        <h1 className="text-5xl font-bold">SIMRIK</h1>
        <p className="text-[9px] text-gray-400">Powered by GEM-1o</p>
      </div>

      <div className="flex  flex-col md:flex-row space-x-3 text-center">
        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            <AiTwotoneExperiment className="h-6 w-6 mt-2" />
            <h2>Examples</h2>
          </div>
          <div className="space-y-2">
            <p className="infoText">"Write the story of humpty dumpty with an alternative ending."</p>
            <p className="infoText">"What is the distance between the earth and keplar-22b?"</p>
            <p className="infoText">"What is the color of the sun?"</p>
          </div>
        </div>

        <div>
          <div className="flex flex-col items-center justify-center mb-5">
          <MdOutlineBolt className="h-6 w-6 mt-2" />
            <h2>Capabilities</h2>
          </div>
          <div className="space-y-2">
            <p className="infoText">Explore SAGE-2 for SIMRIK</p>
            <p className="infoText">Messages are stored in Firebase's Firestore</p>
            <p className="infoText">Toasts when SIMRIK is thinking!</p>
          </div>
        </div>

        <div>
          <div className="flex flex-col items-center justify-center mb-5">
          <LuAlertTriangle className="h-6 w-6 mt-2" />
            <h2>Hallucinations</h2>
          </div>
          <div className="space-y-2">
            <p className="infoText">May occasionally generate incorrect information.</p>
            <p className="infoText">May occasionally produce grammatically incorrect phrases.</p>
            <p className="infoText">Knowledge limited to Literatures and Corpuses only.</p>
          </div>
        </div>
      </div>
      <ChatINHome/>
    </main>
  );
}
