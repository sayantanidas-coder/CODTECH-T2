const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const chatWindow = document.getElementById('chat-window');
let memory = {};

function displayMessage(message, type = 'user') {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', type === 'bot' ? 'bot-message' : 'user-message');
    messageElement.textContent = message;
    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function getBotResponse(userMessage) {
    const lowerCaseMessage = userMessage.toLowerCase();

    if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
        return 'Hello! How can I assist you today? 😊';
    } else if (lowerCaseMessage.includes('good morning')) {
        return 'Good morning and have a great day ahead 😊';
    } else if (lowerCaseMessage.includes('good night')) {
        return 'Good Night and sleep tight! 😊';
    } else if (lowerCaseMessage.includes('how are you')) {
        return 'I\'m just a bot, but I\'m functioning perfectly! How about you?';
    } else if (lowerCaseMessage.includes('help')) {
        return 'Sure! I can assist with your queries. Please specify what you need help with.';
    } else if (lowerCaseMessage.includes('bye')) {
        return 'Goodbye! Have a great day ahead! 👋';
    } else if (lowerCaseMessage.includes('thank you')) {
        return 'Welcome and mention not 😊';
    } else if (lowerCaseMessage.includes('ok')) {
        return 'Yes I can understand you are agreeing with me, Thank you 😊';
    } else if (lowerCaseMessage.includes('can you say my name') || lowerCaseMessage.includes('do you know my name')) {
        return 'Hi! I am bot but I am very sorry I don\'t know your name, can you please tell me?';
    } else if (lowerCaseMessage.startsWith('my name is') || lowerCaseMessage.startsWith('i am')) {
        const name = userMessage.split(' ').slice(-1)[0]; 
        memory.userName = name; 
        return `Oh! So your name is ${name}. I'll make sure to remember it! 😊`;
    } else if (lowerCaseMessage.includes('time')) {
        const currentTime = new Date().toLocaleTimeString();
        return `The current time is ${currentTime}.`;
    } else if (memory.userName && lowerCaseMessage.includes('what is my name')) {
        return `Your name is ${memory.userName}.`;
    } else {
        return 'I\'m not sure how to respond to that. Can you try rephrasing?';
    }
}  

function simulateBotResponse(userMessage) {
    const botTypingIndicator = document.createElement('div');
    botTypingIndicator.classList.add('message', 'bot-message');
    botTypingIndicator.textContent = 'Bot is typing...';
    chatWindow.appendChild(botTypingIndicator);
    chatWindow.scrollTop = chatWindow.scrollHeight;
    setTimeout(() => {
        chatWindow.removeChild(botTypingIndicator);
        const botReply = getBotResponse(userMessage);
        displayMessage(botReply, 'bot');
    }, 1000);
}

function handleSendMessage() {
    const message = messageInput.value.trim();

    if (message) {
        displayMessage(message); 
        simulateBotResponse(message); 
        messageInput.value = ''; 
    }
}  

sendButton.addEventListener('click', handleSendMessage);
messageInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        handleSendMessage();
    }
});
