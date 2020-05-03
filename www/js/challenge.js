
module.exports = {
    "units": [
        {
            "id": 0,
            "type":"options",
            "options": [
                {
                    "label": "Im okay",
                    "nextUnit": 1
                },
                {
                    "label": "Im not okay",
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