let types = {
    options: "options",
    response_only: "response only",
    textarea: "textarea",
    condition: "condition"
}
let challenge = {
    "units": [
        {
            "id": 0,
            "type": "options",
            "options": [
                {
                    "label": "I.m okay",
                    "nextUnit": 1
                },
                {
                    "label": "I.m not okay",
                    "nextUnit": 2
                }
            ],
            "responses": [
                "Hello. I'm Youper.",
                "How are you?"
            ]
        },
        {
            "id": 1,
            "type": "response only",
            "nextUnit": 3,
            "responses": [
                "That's great"
            ]
        },
        {
            "id": 2,
            "type": "response only",
            "nextUnit": 3,
            "responses": [
                "Oh, that is bad. I can help you to feel better"
            ]
        },
        {
            "id": 3,
            "type": "textarea",
            "nextUnit": 4,
            "responses": [
                "What do you have in your mind?"
            ]
        },
        {
            "type": "condition",
            "condition": [
                {
                    "expression": "input.length <= 20",
                    "expressionFn": (input) => {
                        return input.length <= 20
                    },
                    "nextUnit": 5
                },
                {
                    "expression": "input.length > 20",
                    "expressionFn": (input) => {
                        return input.length > 20
                    },
                    "nextUnit": 6
                }
            ],
            "id": 4
        },
        {
            "id": 5,
            "nextUnit": 6,
            "type": "response only",
            "responses": [
                "You could say more, but..."
            ]
        },
        {
            "id": 6,
            "type": "response only",
            "responses": [
                "Have a good day!"
            ]
        }
    ]
}
let lastUserMessage = "";

function getUnits(id) {
    return challenge.units[id]
}
function processUnity(unit) {
    console.log("entrou aqui", unit)
    if (unit.type === types.options) this.processOption(unit);
    if (unit.type === types.response_only) this.processResponseOnly(unit);
    if (unit.type === types.textarea) this.processTextarea(unit);
    if (unit.type === types.condition) this.processCondition(unit);
}

// process responses 
function processResponseOnly(unit) {
    printMessage(unit, "Bot");
    processUnity(getUnits(unit.nextUnit));
}
function processTextarea(unit) {
    printMessage(unit, "Bot")
    printTextarea(unit)
}
function sendTextAreaMessage(nextUnit) {
    let input = angular.element(document.querySelector('#textarea'));
    lastUserMessage = input[0].value
    printMessage(null, "User", lastUserMessage);
    cleanInputs();
    processUnity(getUnits(nextUnit));
}
function processCondition(unit) {
    console.log("chegou condição", unit);
    unit.condition.forEach(condition => {
        if (condition.expressionFn(lastUserMessage)) processUnity(getUnits(condition.nextUnit));
    })
}
function processOption(units) {
    printMessage(units, "Bot");
    units.options.forEach(function (element) {
        printButton(element);
    });

}
function processOptionChoosed(label, nextUnit) {
    printMessage(null, "User", label)
    processUnity(getUnits(nextUnit))
}

// Functions to print message 
function printMessage(units, author, messageText = null) {
    let message = { author: author }
    if (units) {
        units.responses.forEach(function (element) {
            message.response = element;
            pushMessage(message);
        })
    }
    if (!units) {
        message.response = messageText;
        pushMessage(message);
    }
    chatScroll()
    cleanInputs();

}
// chat functions
function printButton(element) {
    let input = angular.element(document.querySelector('#input'));
    const elementTreated = element.label.replace(".", "\'");
    input.append(`<a id="btn" class="button button-options" onclick="processOptionChoosed('${element.label}','${element.nextUnit}')" >${elementTreated}</button>`)
}
function printTextarea(unit) {
    let input = angular.element(document.querySelector('#input'));
    input.append(`<input type='textarea' id="textarea"  class='input' onkeypressed="onButtonPressed(event,'${unit.nextUnit}')"> `)
    input.append(`<button class="button btn-send" onclick="sendTextAreaMessage('${unit.nextUnit}')">Send</button>`)
}
function pushMessage(message) {
    let input = angular.element(document.querySelector('#content'));
    const responseTreated = message.response.replace(".", "\'");
    if (message.author === "Bot") {
        setTimeout(function (){
            input.append(`<li class="bot-msg">${responseTreated}<span class="date">00:00</span></li>`);
        },1000)
    }
    if (message.author === "User") {
        setTimeout(function (){
            input.append(`<li class="user-msg">${responseTreated}<span class="date">00:00</span></li>`);
        },500)
    }
}
function cleanInputs() {
    let input = angular.element(document.querySelector('#textarea'));
    let btnSend = angular.element(document.querySelector('.btn-send'));
    let buttons = angular.element(document.getElementsByClassName('button-options'));
    btnSend.remove();
    input.remove();
    buttons.remove()
}
// function to scroll chat 
function chatScroll() {
    setTimeout(() => {
        const objDiv = document.getElementById("content");
        if (objDiv)
            objDiv.scrollTop = objDiv.scrollHeight;
    }, 1300);
    setTimeout(() => {
        const objDiv = document.getElementById("content");
        if (objDiv)
            objDiv.scrollTop = objDiv.scrollHeight;
    }, 1600);

}
setTimeout(function () {
    processUnity(getUnits(0));
}, 2000)