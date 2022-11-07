/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Box, Divider } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';

import { crawlSeeker } from '../../agent/agent';
import './Home.scss';

import { useState } from 'react';
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';

function Home() {
  const [url, setUrl] = useState('');
  const [valid, setValid] = useState(true);
  const [posts, setPosts] = useState([]);
  const id = uuidv4();
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCrawls = async () => {
      const response = await crawlSeeker.getHistory();

      // eslint-disable-next-line no-console
      setPosts(response);
    };
    // eslint-disable-next-line no-console
    getCrawls().catch(console.error);
  }, []);

  const handleChange = e => {
    setUrl(e.target.value);
    if (e.target.value <= 0) return null;
    return url.match(/((http|https):\/\/www\.)?.+\..+/) ? setValid(false) : setValid(true);
  };

  const handleSubmit = url => {
    crawlSeeker.crawl(url);
    setPosts([url]);
    setUrl('');
  };

  return (
    <Box>
      <div className='App'>
        <FormGroup className={'form_box'} sx={{ width: 1200, mx: 'auto' }}>
          <FormControl sx={{ mt: 2 }}>
            <InputLabel htmlFor='my-input'>Enter the URL</InputLabel>
            <Input type='text' name='url' value={url} onChange={handleChange} />
          </FormControl>
          <Button
            variant='contained'
            type='submit'
            sx={{ mt: 2, mx: 'auto', width: 300, height: 50 }}
            onClick={handleSubmit}
            disabled={valid}>
            Crawl
          </Button>
        </FormGroup>
      </div>
      <Divider />
      {!posts ? (
        <h2>Sorry, there is no history of the crawl fetch</h2>
      ) : (
        posts.forEach(crawl => (
          <Box>
            <h3>{crawl.url}</h3>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell align='right'>H1</TableCell>
                    <TableCell align='right'>H2</TableCell>
                    <TableCell align='right'>Links</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component='th' scope='row'>
                      {
                        <ul>
                          {crawl.title.map(e => (
                            <li key={e.indexOf}>{e}</li>
                          ))}
                        </ul>
                      }
                    </TableCell>
                    <TableCell align='right'>
                      {
                        <ul>
                          {crawl.h1.map(e => (
                            <li key={e.indexOf}>{e}</li>
                          ))}
                        </ul>
                      }
                    </TableCell>
                    <TableCell align='right'>
                      {
                        <ul>
                          {crawl.h2.map(e => (
                            <li key={e.indexOf}>{e}</li>
                          ))}
                        </ul>
                      }
                    </TableCell>
                    <TableCell align='right'>
                      {
                        <ul>
                          {crawl.links.map(e => (
                            <li key={e.indexOf}>{e}</li>
                          ))}
                        </ul>
                      }
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        ))
      )}
    </Box>
  );
}

export default Home;
