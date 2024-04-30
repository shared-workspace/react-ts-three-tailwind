import React from 'react';
import ViewToggle, { ToggleViewProvider } from './view-toggle';
import SettingControler, { SettingControlerProvider } from './setting-controler';

export default function CanvasUI() {
    return (
        <>
            <ToggleViewProvider>
                <SettingControlerProvider>
                    <ViewToggle />
                    <SettingControler side='left' />
                </SettingControlerProvider>
            </ToggleViewProvider>
        </>
    );
}