import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react'; 
import {Vault} from "ansible-vault"
import {TextField, Button, TextareaAutosize, FormGroup, Checkbox, FormControlLabel} from '@material-ui/core';


function App() {
  const [password, setPassword]=useState("")
  const [plaintext, setPlaintext] = useState("")
  const [cryptext, setCryptext] = useState("")
  const [base64, setBase64] = useState(false)
  const runEncrypt = () => {
    const v = new Vault({password: password})
    v.encrypt(plaintext).then(setCryptext)
  }
  return (
    <div className="App">
      <form>
      <TextField required variant="outlined" type="password" label="Password" value={password} onChange={e => setPassword(e.target.value)}/>
      <TextField required variant="outlined" label="Plaintext" type="text" value={plaintext} onChange={e => setPlaintext(e.target.value)}/>
      <div>
      <FormControlLabel
        control={<Checkbox
          checked={base64}
          onChange={e => setBase64(e.target.checked)}
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />}
        label="Base64 encode before encrypting"
      />
       
             <Button onClick={() => runEncrypt()} color="primary">Encrypt</Button>
       </div>
      <FormGroup>
      <TextareaAutosize rows="5" type="text" disabled value={cryptext}/>
      </FormGroup>
      </form>
    </div>
  );
}

export default App;
