// import React from 'react';
import { Button, Container } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from "react";

import { Client, ThreadID } from '@textile/hub'
import { Where } from '@textile/threads-client';

const useStyles = makeStyles({
  root: {
    marginTop: '5%',
    border: '1px solid black',
    borderRadius: '0.5',
    boxShadow: 'none',
  }
});
type Link = {
  _id: string,
  url: string,
  comment: string,
  title: string
}

type Thread = {
  id: Uint8Array | string,
  name: string,
  isdb: boolean
}

type AppProps = {
  client: Client,
  thread: Thread,
}

export default function App(props: AppProps) {
  const client = props.client;
  const thread = props.thread;
  const classes = useStyles();
  const [form, setForm] = useState({
    url: '',
    comment: '',
    title: '',
  });
  const [links, setLinks] = useState<Link[]>([]);
  const threadId = ThreadID.fromString(thread.id);

  const getAllLinks = async() => {
    const query = new Where('_id').ne('');
    const request =  await client.find(threadId, 'Links', query);
    var links = request.instancesList.map((instance: any) => {
      var link:Link = {
        _id: instance._id,
        url: instance.url,
        comment: instance.comment,
        title: instance.title
      }
      return link;
    });
    setLinks(links);
  }

  useEffect(() => {
    getAllLinks();
  }, [links]);

  const addLink = async (evt:any) => {
    evt.preventDefault();
    var newLink = {
      _id: '',
      url: form.url,
      comment: form.comment,
      title: form.title,
    };
    
    await client.create(threadId, 'Links', [newLink]);

     setLinks([
      ...links,
     newLink
    ]);

    setForm({
      url: '',
      comment: '',
      title: '',
    });
  };

  const deleteLink = async (id:any) => {
    
    await client.delete(threadId, 'Links', [id]);

    var updatedLinks = links.filter((item) => { return item._id !== id });
    console.log(updatedLinks);
    setLinks(updatedLinks);

  }



  return (
    <Container >
      <Card className={classes.root}>
        <CardContent>
          <form>
            <label>
              Title:
              <input type="text" name="title" value={form.title} onChange={e => setForm({...form, title: e.target.value})}/>
            </label>
            <br/>
            <label>
              URL:
              <input type="text" name="url" value={form.url} onChange={e => setForm({...form, url: e.target.value})}/>
            </label>
            <br/>
            <label>
              Comment:
              <input type="text" name="comment" value={form.comment} onChange={e => setForm({...form, comment: e.target.value})}/>
            </label>
            <br/>
            <button onClick={addLink}>Submit</button>
          </form>
        </CardContent>
      </Card>
      {links.length > 0 ? (
        <Card className={classes.root}>
          <CardContent>
            {links.slice(0).reverse().map((item, key) => (
              <Card className={classes.root} key={key}>
                <Button onClick={() => deleteLink(item._id)}>Delete</Button>
                <CardContent>
                  title: {item.title}<br/>
                  url: <a href={item.url} target="_blank" rel="noopener noreferrer">{item.url}</a><br/>
                  comment: {item.comment}<br/>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      ): null}  
    </Container>
  );
}
