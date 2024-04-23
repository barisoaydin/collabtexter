const socket = io.connect("http://localhost:5173");

const userName = document.getElementById("userName");
const output = document.getElementById("output");
const newMessage = document.getElementById("newMessage");
const submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", () => {
  if (newMessage.value.trim() !== "") {
    socket.emit("message", {
      text: newMessage.value,
      sender: userName.value,
    });
    newMessage.value = "";
  }
});