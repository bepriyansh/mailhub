'use client';
import React, { Component} from 'react';
import { Provider } from 'react-redux';
import type { ReactNode } from "react";
import store from '../store';

interface Props {
    readonly children: ReactNode;
}

export const StoreProvider = ({ children }: Props) => (
    <Provider store={store}>
        {children}
    </Provider>
);
