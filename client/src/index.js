import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.js'
import {BrowserRouter} from 'react-router-dom'
import DataProvider from './context/DataProvider.js'
import GameProvider from './context/GameProvider.js'




ReactDOM.render(
    <BrowserRouter>
        <DataProvider>
            <GameProvider>
                <App />
            </GameProvider>
        </DataProvider>
    </BrowserRouter>,
    document.getElementById('root'))