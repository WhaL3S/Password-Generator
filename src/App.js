import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const [password, setPassword] = useState('')
  const [passwordLength, setPasswordLength] = useState(20)
  const [includeUppercase, setIncludeUppercase] = useState(false)
  const [includeLowercase, setIncludeLowercase] = useState(false)
  const [includeNumbers, setIncludeNumbers] = useState(false)
  const [includeSymbols, setIncludeSymbols] = useState(false)

  const numbers = '0123456789'
  const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lowerCase = 'abcdefghijklmnopqrstuvwxyz'
  const symbols = "!#$%&'()*+,-./:;<=>?@[]^_`{|}~"

  const handleGeneratePassword = (e) => {
    if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
      notify('You must select at least one option', true)
    }

    let characterList = ''
    var password = ''
    let counter = 0

    if (includeLowercase) {
      characterList = characterList + lowerCase
      password = password + lowerCase.charAt(Math.round(Math.random() * lowerCase.length))
      counter++
    }

    if (includeUppercase) {
      characterList = characterList + upperCase
      password = password + upperCase.charAt(Math.round(Math.random() * upperCase.length))
      counter++
    }

    if (includeSymbols) {
      characterList = characterList + symbols
      password = password + symbols.charAt(Math.round(Math.random() * symbols.length))
      counter++
    }

    if (includeNumbers) {
      characterList = characterList + numbers
      password = password + numbers.charAt(Math.round(Math.random() * numbers.length))
      counter++
    }

    if(counter > passwordLength) {
      notify('Password length is shorter than the number of selected options', true)
    }
    else if (passwordLength > 20) {
      notify('Unfortunately, the password length limit is 20', true)
    }
    else if (counter === passwordLength) {
      setPassword(password)
    }
    else{
      for (let i = 0; i < passwordLength - counter; i++) {
        password = password + characterList.charAt(Math.round(Math.random() * characterList.length))
      }
      setPassword(password)
    }
  }

  const copy = () => {
    if (password === '') {
      notify('Nothing To Copy', true)
    } else {
      navigator.clipboard.writeText(password)
      notify('Copied Successfully')
    }
  }
  
  const notify = (message, hasError = false) => {
    if (hasError) {
      toast.error(message, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } else {
      toast.success(message, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  return (
    <div className='App'>
      <div className='container'>
        <div className='generator'>
          <h2>Password Generator</h2>
          <div className='generator-password'>
            <h3>{password}</h3>
            <button onClick={copy} className='copy-button'>
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></svg>
            </button>
          </div>

          <div className='form-group'>
            <label htmlFor='password-strength'>Password Length</label>
            <input
              defaultValue={passwordLength}
              onChange={(e) => setPasswordLength(e.target.value)}
              type='number'
              id='password-strength'
              name='password-strength'
              max='20'
              min='5'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='uppercase-letters'>Uppercase Letters</label>
            <input
              className='checkboxxd'
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
              type='checkbox'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='lowercase-letters'>Lowercase Letters</label>
            <input
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
              type='checkbox'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='include-numbers'>Numbers</label>
            <input
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              type='checkbox'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='include-symbols'>Symbols</label>
            <input
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              type='checkbox'
            />
          </div>

          <button onClick={handleGeneratePassword} className='generator-button'>
            Generate 
          </button>
          <ToastContainer
            position='top-center'
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </div>
    </div>
  )
}

export default App