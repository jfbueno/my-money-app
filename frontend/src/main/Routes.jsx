import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Dashboard from '../dashboard/Dashboard'
import DashboardV2 from '../dashboard-v2/Dashboard'
import BillingCycle from '../billingCycle/BillingCycle'

export default () => (
    <div className='content-wrapper'> 
        <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route exact path='/v2' component={DashboardV2} />
            <Route path='/billing-cycles' component={BillingCycle} />
            <Redirect from='*' to='/' />
        </Switch>
    </div>
)