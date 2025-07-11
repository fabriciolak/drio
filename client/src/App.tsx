import { useState } from 'react'
import logo from './assets/logo.png'
import type { ApiResponse } from 'shared'
import './App.css'

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000"

console.log(SERVER_URL)

function App() {
  const [data, setData] = useState<ApiResponse | undefined>()

  async function sendRequest() {
    try {
      const req = await fetch(`${SERVER_URL}/api/v1/health`)
      const res: ApiResponse = await req.json()
      setData(res)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div>
        <a href="https://github.com/fabriciolak/drio" target="_blank">
          <img src={logo} className="logo" alt="drio logo" />
        </a>
      </div>
      <h1>Drio</h1>
      <h2>Bun + Express + Vite + React</h2>
      <p>A typesafe monorepo</p>
      <div className="card">
        <div className='button-container'>
          <button onClick={sendRequest}>
            Call API
          </button>
          <a className='docs-link' target='_blank' href="https://github.com/fabriciolak">Docs</a>
        </div>
        {data && (
          <pre className='response'>
            <code>
              uptime: {data.uptime}<br />
              Message: {data.message}<br />
              Date: {data.date}
            </code>
          </pre>
        )}
      </div>
    </>
  )
}

export default App