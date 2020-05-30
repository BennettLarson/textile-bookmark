// import React from 'react';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from "react";

const useStyles = makeStyles({
  root: {
    marginTop: '5%',
    border: '1px solid black',
    borderRadius: '0.5',
    boxShadow: 'none',
  }
});
type Link = {
  id: number,
  url: string,
  // folder: string,
  notes: string,
  name: string,
}

export default function App() {
  const classes = useStyles();
  const [form, setForm] = useState({
    url: '',
    // folder: '',
    notes: '',
    name: '',
  });

  const [links, setLinks] = useState<Link[]>([]);

  const addLink = (evt:any) => {
    evt.preventDefault();
    
    setLinks([
      ...links,
      {
        id: links.length,
        url: form.url,
        // folder: form.folder,
        notes: form.notes,
        name: form.name,
      }
    ]);

    setForm({
      url: '',
      // folder: '',
      notes: '',
      name: '',
    })
  };

  return (
    <Container >
      <Card className={classes.root}>
        <CardContent>
          <form>
            <label>
              Name:
              <input type="text" name="name" value={form.name} onChange={e => setForm({...form, name: e.target.value})}/>
            </label>
            <br/>
            <label>
              URL:
              <input type="text" name="url" value={form.url} onChange={e => setForm({...form, url: e.target.value})}/>
            </label>
            <br/>
            {/* <label>
              Folder:
              <input type="text" name="folder" value={form.folder} onChange={e => setForm({...form, folder: e.target.value})}/>
            </label>
            <br/> */}
            <label>
              Notes:
              <input type="text" name="notes" value={form.notes} onChange={e => setForm({...form, notes: e.target.value})}/>
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
                <CardContent>
                  name: {item.name}<br/>
                  url: <a href={item.url} target="_blank">{item.url}</a><br/>
                  notes: {item.notes}<br/>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      ): null}  
    </Container>
  );
}
