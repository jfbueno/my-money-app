// import '../common/template/dependencies'
import React from 'react'
import { HashRouter } from 'react-router-dom'

import Header from '../common/template/Header'
import Sidebar from '../common/template/Sidebar'
import Footer from '../common/template/Footer'

import Routes from './Routes'

import Messages from '../common/messages/Messages'

export default props => (
    <HashRouter>
        <div className='wrapper'>
            <Header />
            <Sidebar />
            <Footer />
            
            <Routes />
            <Messages />
        </div>
    </HashRouter>
)