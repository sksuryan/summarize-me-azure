## Route: POST "/videos/create"

Fetch created sprints a user from the database

### Request:
| Name	| Type 	    | In  	| Description  	                       |
|---	|---	    |---	|---	                               |
| video	| file   	|form data 	|video to transcribe |

### Response:
```
[
    keyowrds: Object of Lists,
    transcript: String,
    summary: String,
]
```

### Example:

Request: POST 'https://summarize.me/videos/create'

Response object:
```
{
    "keywords": {
        "called": [
            27.72,
            31.4
        ],
        "data": [
            9.56
        ],
        "either": [
            24.3
        ],
        "everyone": [
            4.82
        ],
        "hi": [
            4.4
        ],
        "index": [
            26.32,
            28.02
        ],
        "insert": [
            17.22
        ],
        "last": [
            12.12,
            25.68,
            28.02
        ],
        "linear": [
            9.27
        ],
        "pop": [
            32.3
        ],
        "push": [
            28.02
        ],
        "structure": [
            9.8
        ]
    },
    "summary": "  Hi everyone, today we're going to understand the concept of stacks. It is a linear data structure. It follows the concept of last in first out that is lethal. Considered a stack of coins we can only insert or remove a coin from the top. Similarly, when an array is used as a stack, we can either insert an element at the last index of the array that is called push or remove an element from the last index of the error called pop.",
    "transcript": " Hi everyone, today we're going to understand the concept of stacks. It is a linear data structure. It follows the concept of last in first out that is lethal. Considered a stack of coins we can only insert or remove a coin from the top. Similarly, when an array is used as a stack, we can either insert an element at the last index of the array that is called push or remove an element from the last index of the error called pop."
}
```
