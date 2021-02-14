# Database Schema

> ### Database Service - MongoDB
> ### Database Type - NoSQL

## Models

### Repository 

- videos (Collection)
    - `_id` - video ID
        - Type: String `"{video-id}"`
        - Example: `"az31cjdd98sz"`
    - `summary` - Summary of the video
        - Type: String `Text of the summarized video`
        - Example: "This is a summary of stack"
    - `transcript` - A text version of the video
        - Type: String `Transcript of the video`
        - Example: "This is a transcript of stack"
    - `hash` - A hash to map each video
        - Type: String `Hash of the video`
        - Example: "cbdhsdbvsdvcv"
    - `keywords` - The keywords extracted from the video
        - Type: Object[Keyword Schema]
        - Example:
            ```
            "keywords": {
                          "called": [
                              27.72,
                              31.4
                          ],
                          "data": [
                              9.56
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
                      }
            ```
 
 - keywords (Collection)
     - `keyword` - Keywords of video
        - Type: Array <Float>
        - Example: 
        ```
        "structure": [9.8]
        ```
     
   
