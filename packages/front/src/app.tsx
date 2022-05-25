import React from 'react';
import './app.css';
import {Button} from '../../ui/src/components/button/Button';

export const App = () => {
    return (
        <main>
            <h1 className='heading'>LP monorepo</h1>
            <Button>Click me!</Button>
        </main>
    )
};