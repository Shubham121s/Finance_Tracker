"use client"

import React from 'react'
const { Provider } = require("react-redux")
const { store } = require("./store")

const ReduxProvider = ({children}) => {
    return (
        <Provider store={store} >
          {children}
        </Provider>
    )
}

export default ReduxProvider;
