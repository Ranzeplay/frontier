import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './main.css'
import { invoke } from '@tauri-apps/api';

async function recordLocation() {
  console.log("recordLocation");
  await invoke("broadcast_redirection", { url: document.location.pathname });
}

window.addEventListener('popstate', recordLocation);
window.addEventListener('pushstate', recordLocation);
window.addEventListener('replacestate', recordLocation);
window.addEventListener('hashchange', recordLocation);
window.onload = recordLocation;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
