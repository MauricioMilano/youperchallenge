let types = {
    options:"options", 
    response_only:"response_only",
    textarea: "textarea",
    condition:"condition"
}
let challenge = {
    "units": [
        {
            "id": 0,
            "type":"options",
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
            "type":"response only",
            "nextUnit": 3,
            "responses": [
                "That's great"
            ]
        },
        {
            "id": 2,
            "type":"response only",
            "nextUnit": 3,
            "responses": [
                "Oh, that is bad. I can help you to feel better"
            ]
        },
        {
            "id": 3,
            "type":"textarea",
            "nextUnit": 4,
            "responses": [
                "What do you have in your mind?"
            ]
        },
        {  
            "type":"condition",
            "condition": [
                {
                    "expression": "input.length <= 20",
                    "expressionFn": (length)=>{
                        return length <= 20
                    },
                    "nextUnit": 5
                },
                {
                    "expression": "input.length > 20",
                    "expressionFn": (length)=>{
                        return length > 20
                    },
                    "nextUnit": 6
                }
            ],
            "id": 4
        },
        {
            "id": 5,
            "nextUnit": 6,
            "type":"response only",
            "responses": [
                "You could say more, but..."
            ]
        },
        {
            "id": 6,
            "type":"response only",
            "responses": [
                "Have a good day!"
            ]
        }
    ]
}
let messages = []
let unitNow = 0;

function getUnits(id){
    console.log("teste")
    return challenge.units[id]
  }
function processUnity(unit){
    console.log("entrou aqui", unit.type)
    if(unit.type === types.options) this.processOption(unit);
    if(unit.type === types.response_only) this.processResponseOnly(unit);
    if(unit.type === types.textarea) this.processTextarea(unit);
    if(unit.type === types.condition) this.processCondition(unit);
  }
function response_only(unit){
    let message = {
        author: "Bot",
        response: unit.responses[0]
    }
    printMessage(message);
    processUnity(getUnits(unit.nextUnit));
}
function processOption(units){
    let input = angular.element( document.querySelector( '#input' ) );
    let message = {
        author:"Bot",
        response: units.responses[0]
    }
    // messages.push(message);
    printMessage(message);
    units.options.forEach(function (element){
        const elementTreated = element.label.replace(".","\'");
        input.append(`<a class="button" onclick="processOptionChoosed('${element.label}')" >${elementTreated}</button>`)
    });

}
function processOptionChoosed(label, nextUnit){
    if (!label){
        console.log("returns")
    }
    let message = {
        author:"User", 
        response: label
    }
    printMessage(message)
}
function printMessage(message){
    let input = angular.element( document.querySelector( '#content' ) );
    const responseTreated = message.response.replace(".","\'");
    if(message.author==="Bot"){
        input.append(`<li class="bot-msg">${responseTreated}<span class="date">00:00</span></li>`);
    }
    if(message.author==="User"){
        input.append(`<li class="user-msg">${responseTreated}<span class="date">00:00</span></li>`);
    }

}
setTimeout(function(){
    processUnity(getUnits(unitNow));
},3000)