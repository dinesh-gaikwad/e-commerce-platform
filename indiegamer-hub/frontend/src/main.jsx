import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

function App(){ return <div style={{padding:20,background:'#111',color:'#fff',minHeight:'100vh'}}>IndieGamer Hub</div>; }

ReactDOM.createRoot(document.getElementById('root')).render(<BrowserRouter><App /></BrowserRouter>);
