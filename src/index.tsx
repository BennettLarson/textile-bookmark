import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Client, KeyInfo, ThreadID } from '@textile/hub';


const linkSchema = {
  $id: 'https://example.com/astronaut.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Links',
  type: 'object',
  required: ['_id'],
  properties: {
    _id: {
      type: 'string',
    },
    title: {
      type: 'string',
    },
    url: {
      type: 'string',
    },
    comment: {
      type: 'string',
    },
  },
}

const keyInfo: KeyInfo = {
  key: ' bxmefka6fpdign7z3is33q5xqpy',
  secret: 'bqsiqhd3o7jzozmpbdy4m3zbzk3pntz6ylxgaesy',
  type: 1,
}
const connect = async () => {
  return Client.withUserKey(keyInfo);
}
// const db = (async() => {await Client.withUserKey(keyInfo)})();

// NOTE: THREAD = DB | They are the same thing
(async () => {
  try {
    console.log('hello????');
    const client = await connect();
    var thread = await client.getThread('bookmark-db');

    if (thread === undefined) {
      console.log('undefined?');
      const threadId = ThreadID.fromRandom();
      await client.newDB(threadId, 'bookmark-db');
      await client.newCollection(threadId, 'Links', linkSchema);
      thread = await client.getThread('bookmark-db');
    } else {
      console.log('thread already exists: ' + thread.id);
    }
    ReactDOM.render(
      <React.StrictMode>
        <App client={client} thread={thread}/>
      </React.StrictMode>,
      document.getElementById('root')
    );
  } catch(e) {
    console.log("uh oh", e);
  }
})();






// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
