'use client'

import React from "react";
import { Provider } from "react-redux";
import { Store } from "./store";

export default function ReduxProvider ({children} : {children : React.ReactNode})
{
    return <Provider store={Store}>{children}</Provider>
}