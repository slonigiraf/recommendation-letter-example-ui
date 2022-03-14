// Based on: https://github.com/ipfs-examples/js-ipfs-examples/blob/master/examples/browser-webpack/src/app.js
import React, { useState, useRef } from 'react';
import { create } from 'ipfs-core'

function App() {
  const [output, setOutput] = useState([]);
  const [ipfs, setIpfs] = useState(null);
  const [fileContent, setFileContent] = useState('');

  const terminalEl = useRef(null);

  var terminal = "";

  const COLORS = {
    active: '#357edd',
    success: '#0cb892',
    error: '#ea5037'
  }

  const showStatus = (text, color, id) => {
    setOutput((prev) => {
      return [...prev,
        {
        'content': text,
        'color': color,
        'id': id
        }
      ]
    })

    terminalEl.current.scroll({ top: terminal.scrollHeight, behavior: 'smooth' })
  }

  const store = async (content) => {
    let node = ipfs;

    if (!ipfs) {
      showStatus('Creating IPFS node...', COLORS.active)

      node = await create({
        repo: String(Math.random() + Date.now()),
        init: { alogorithm: 'ed25519' }
      })

      setIpfs(node)
    }

    const file = await node.add(content)

    showStatus(`Added to ${file.cid}`, COLORS.success, file.cid)


    const text = []

    for await (const chunk of node.cat(file.cid)) {
      text.push(chunk)
    }
    showStatus(`\u2514\u2500 ${file.path} ${text.toString()}`)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if ((fileContent == null || fileContent.trim() === '')) {
        throw new Error('File content is missing...')
      }
      await store(fileContent)
    } catch (err) {
      showStatus(err.message, COLORS.error)
    }
  }

  return (
    <>
      <header className='flex items-center pa3 bg-navy bb bw3 b--aqua'>
        <a href='https://ipfs.io' title='home'>
          
        </a>
      </header>

      <main className="pa4-l bg-snow mw7 mv5 center pa4">
        <h1 className="pa0 f2 ma0 mb4 aqua tc">Add data to IPFS from the browser</h1>

        <form id="add-file" onSubmit={handleSubmit}>
          <label htmlFor="file-content" className="f5 ma0 pb2 aqua fw4 db">Content</label>
          <input
            className="input-reset bn black-80 bg-white pa3 w-100 mb3 ft"
            id="file-content"
            name="file-content"
            type="text"
            placeholder="Hello world"
            required
            value={fileContent} onChange={(e) => setFileContent(e.target.value)}
          />

          <button
            className="button-reset pv3 tc bn bg-animate bg-black-80 hover-bg-aqua white pointer w-100"
            id="add-submit"
            type="submit"
          >
            Add file
          </button>
        </form>

        <h3>Output</h3>

        <div className="window">
          <div className="header"></div>
          <div id="terminal" className="terminal" ref={terminalEl}>
            { output.length > 0 &&
              <div id="output">
                { output.map((log, index) =>
                  <p key={index} style={{'color': log.color}} id={log.id}>
                    {log.content}
                  </p>)
                }
              </div>
            }
          </div>
        </div>
      </main>
    </>
  );
}

export default App;