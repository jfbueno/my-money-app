import React from 'react'
import MenuItem from './MenuItem'
import MenuTree from './MenuTree'

export default () => (
    <ul className="sidebar-menu">
        <MenuItem path="/#" label="Dashboard" icon="dashboard" />
        <MenuItem path="/v2" label="Dashboard V2" icon="dashboard" />
        <MenuTree label="Cadastro" icon="edit">
            <MenuItem path="/billing-cycles"
                label="Ciclos de Pagamentos" icon="usd" />
        </MenuTree>
    </ul>
)