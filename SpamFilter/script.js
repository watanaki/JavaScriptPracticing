const messageInput = document.getElementById('message-input');
const result = document.getElementById('result');
const checkMessageButton = document.getElementById('check-message-btn');

const helpRegex = /please help|assist me/i;
const dollarRegex = /[0-9]+ (hundred|thousand|million|billion)? dollars/i;
const freeRegex = /(?:\s|^)fr[e3][e3] m[o0]n[e3]y(?:\s|$)/i;
const stockRegex = /(?:\s|^)[5s][7t][o0][c{[(]k [a4@]l[e3]r[7t](?:\s|$)/i;
const dearRegex = /(?:^|\s)d[e3][a4@]r fr[i1|][e3]nd(?:$|\s)/i;

const denyList = [helpRegex, dollarRegex, freeRegex, stockRegex, dearRegex];

const isSpam = (msg) => denyList.some((regex) => regex.test(msg));

const checkIt = () => {
  if (messageInput?.value === '') {
    alert('Please enter a message.');
    return;
  }
  result.textContent = isSpam(messageInput.value) ?
    'Oh no! This looks like a spam message.' :
    'This message does not seem to contain any spam.';
  messageInput.value = '';
};

checkMessageButton?.addEventListener("click", checkIt);

messageInput.addEventListener("keydown", e => {
  if (e.key === "Enter")
    checkIt();
}
);
