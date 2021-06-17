import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react'; 
import {Vault} from "ansible-vault"
import {TextField, Button, TextareaAutosize, Typography, Checkbox, FormControlLabel, Card} from '@material-ui/core';
import base64 from "base-64"
import utf8 from "utf8"

function App() {
  const [password, setPassword]=useState("")
  const [plaintext, setPlaintext] = useState("")
  const [cryptext, setCryptext] = useState("")
  const [base64Text, setBase64Text] = useState("")
  const [willBase64, setWillBase64] = useState(false)
  const runEncrypt = () => {
    const v = new Vault({password: password})
    if(willBase64) {
      const bytes = utf8.encode(plaintext);
      const encoded = base64.encode(bytes);
      setBase64Text(encoded)
      v.encrypt(encoded).then(setCryptext)
    } else{
      v.encrypt(plaintext).then(setCryptext)
    }
  }
  return (
    <div className="App">
      <form>
      <TextField required variant="outlined" type="password" label="Password" value={password} onChange={e => setPassword(e.target.value)}/>
      <TextField required variant="outlined" label="Plaintext" type="text" value={plaintext} onChange={e => setPlaintext(e.target.value)}/>
      <div>
      <FormControlLabel
        control={<Checkbox
          checked={willBase64}
          onChange={e => setWillBase64(e.target.checked)}
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />}
        label="Base64 encode before encrypting"
      />
        <Button onClick={() => runEncrypt()} color="primary">Encrypt</Button>
       </div>
       <Card>
         <h2>
           Base64:
         </h2>
        <Typography>
          {base64Text}
        </Typography>
        </Card>
        <h2>
           Encrypted:
         </h2>
        <TextareaAutosize value={cryptext}/>
        
          
      </form>
    </div>
  );
}

export default App;
