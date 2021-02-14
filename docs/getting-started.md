### File Structure

| Directory                                                                                         | Content                      |
| --------------------------------------------------------------------------------------------------| ---------------------------- |
| [frontend](https://github.com/sksuryan/summarize-me/tree/main/frontend) | contains frontend components |
| [backend](https://github.com/sksuryan/summarize-me/tree/main/backend)   | contains backend api         |
| [docs](https://github.com/sksuryan/summarize-me/tree/main/docs)         | contains all docs (schemas, api routes, usage) |

### Setup

- Fork and clone the repo

```
$ git clone https://github.com/sksuryan/summarize-me.git
$ cd summarize-me
```

#### Frontend:
- Install dependencies
```
$ cd frontend
$ npm install
```

- Run the server and react app

```
$ npm start
```

#### Backend:
- Install dependencies
```
$ cd backend
$ npm install
```
- Add the .env file

```
API_KEY = < YOUR_API_KEY>
REGION = <YOUR_REGION>
MONGO_DBNAME = <YOUR MONGO_DBNAME>
MONGO_URI = <YOUR_MONGO_URI>
```

- Run the server
```
$ npm start
```
