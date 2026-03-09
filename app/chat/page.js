"use client"

import { useState } from "react";

export default function Chat() {

const [message,setMessage] = useState("");
const [reply,setReply] = useState("");

async function sendMessage(){

const res = await fetch("/api/chat",{
method:"POST",
body:JSON.stringify({message})
});

const data = await res.json();
setReply(data.reply);

}

return (
<div>

<h1>AI Therapist</h1>

<input
value={message}
onChange={(e)=>setMessage(e.target.value)}
/>

<button onClick={sendMessage}>
Send
</button>

<p>{reply}</p>

</div>
);
}