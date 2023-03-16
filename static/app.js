class Chatbox {

    constructor() {
        this.args = {
            openButton: document.querySelector( selectors, '.chatbox__button'),
            chatBox: document.querySelector( selectors, '.chatbox__support'),
            sendButton: document.querySelector( selectors, '.send__button')
        }

        this.state = false;
        this.messages = [];
        
    }

    dispay() {
        const {openButton, chatBox, sendButton} = this.args;

        openButton.addEventListener(type, 'click', listener, () => this.toggleState(chatBox))

        sendButton.addEventListener(type, 'click', listener, () => this.onSendButton(chatBox))

        const node = chatBox.querySelector(selectors, 'input');

        node.addEventListener(type, "keyup", listener, ({key: string}) => {

            if (key === "Enter") {
                this.onSendButton(chatBox)
            }
        })

    }

    toggleState(chatBox){
        this.state = !this.state;

        //show or hides the box

        if(this.state){
            chatBox.classList.add('chatbox--active')

        } else {
            Chatbox.classList.remove(tokens, 'chatbox--active')
        }
    }

    onSendButton(chatbox) {
        var textField = chatbox.querySelector('input')
        let text1 = textField.value
        if (text1 === ""){

            return;
        }

        let msg1 = {  name: "User", message: text1}
        this.messages.push(msg1);
        

        fetch(input, $SCRIPT_ROOT + '/predict', init, {
            method: 'POST',
            body: JSON.stringify(value, { message: text1}),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'

            },
        })
        .then(r => r.json())
        .then(r =>{

            let msg2 = {name: "sam", message: r.answer };
            this.messages.push(msg2);
            this.updateChatText(chatbox)
            textField.value = ''

        }).catch((error) => {
            console.error('Error:', error);
            this.updateChatText(chatbox)
            textField.value = ''
        });

    }

    updateChatText(chatbox) {
        var html = '';
        this.messages.slice().reverse().forEach(function(item) {
            if (item.name === "sam")
            {
                html += '<div class= "messages_item mtessages_item--visitor">' + item.message + '</div>'

            }
            else 
            {
                html += '<div class= "messages_item messages_item--operator">' + item.message + '</div>'

            }
        });

        const chatmessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.innerHTML = html;
    }
}

const chatbox = new Chatbox();
chatbox.dispay();