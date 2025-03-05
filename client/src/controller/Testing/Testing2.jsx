import { useEffect } from "react";

const JoyzChatbot = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://joyz.ai/lib/chatbot.bundle.js";
    script.setAttribute("eid", "67c1ed8495c1d470506af034");
    script.setAttribute("chatbotId", "aeb4cb92-70ec-4553-b15b-3103d604ad90");
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script); // Cleanup to prevent duplicate scripts
    };
  }, []);

  return null; // No UI component needed, just loading the script
};

export default JoyzChatbot;
