import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { redirectToAddFriendOrLineChat } from '../../actions'
import { AppBar } from '../../components'
import Home from './Home'
import Create from './Create'
import Product from './Product'

const MyStore = ({ match }) => {
    const dispatch = useDispatch()
    const { isSignIn, isFriend, notRegister } = useSelector(state => state.user)

    useEffect(() => {
        dispatch({ type: 'SET_LOADER', payload: !isSignIn })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSignIn])

    useEffect(() => {
        if ( notRegister || (isFriend !== undefined && !isFriend) ) {
            redirectToAddFriendOrLineChat()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [notRegister, isFriend])

    return isSignIn ? (
        <>
            <AppBar />
            <Switch>
                <Route exact path={`${match.path}/`} component={Home} />
                <Route path={`${match.path}/create`} component={Create} />
                <Route path={`${match.path}/product/:category/:productId`} component={Product} />
            </Switch>
        </>
    ) : null
}

export default MyStore