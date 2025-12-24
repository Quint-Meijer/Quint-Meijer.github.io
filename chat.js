(function () {
  // Create widget container
  const box = document.createElement("div");
  box.innerHTML = `
    <div style="
      position:fixed;
      bottom:20px;
      right:20px;
      width:300px;
      background:white;
      border:1px solid #ccc;
      border-radius:10px;
      font-family:Arial, sans-serif;
      z-index:9999;
    ">
      <div style="
        background:#111;
        color:white;
        padding:10px;
        font-weight:bold;
        border-radius:10px 10px 0 0;
      ">
        AI Gym Assistant
      </div>
      <div id="chat"
        style="height:200px; overflow:auto; padding:10px; font-size:14px;">
      </div>
      <input
        id="msg"
        placeholder="Ask a question..."
        style="width:100%; padding:8px; border:none; border-top:1px solid #ccc;"
      />
    </div>
  `;

  document.body.appendChild(box);

  const chat = document.getElementById("chat");
  const input = document.getElementById("msg");

  input.addEventListener("keydown", async function (e) {
    if (e.key === "Enter" && input.value.trim() !== "") {
      const message = input.value;
      input.value = "";

      chat.innerHTML += `<div><b>You:</b> ${message}</div>`;

      try {
        const res = await fetch("https://quintm.app.n8n.cloud/webhook/0c7cb2b0-bff2-46e7-9bf9-8e42f7e420f2/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ message })
        });

        const data = await res.json();
console.log("FULL RESPONSE:", data);
chat.innerHTML += `<div><b>Bot:</b> ${JSON.stringify(data)}</div>`;
        chat.scrollTop = chat.scrollHeight;

      } catch (err) {
        chat.innerHTML += `<div style="color:red;">Error connecting to server</div>`;
      }
    }
  });
})();
