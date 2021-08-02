import React from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'

import Home from '@/pages/Home'
import About from '@/pages/About'

import history from './history'

const Routes = () => {

  // const defaultLocation = useLocation()
  // const location = useSelector(state => state.location.current)

  return (
    <ConnectedRouter history={history} >
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    </ConnectedRouter>
  )

}

export default Routes
