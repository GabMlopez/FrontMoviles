import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const {token} = useAuth();

  const valid_token = token !== null;
  const sucess_register = sessionStorage.getItem('re')
}

export default App
