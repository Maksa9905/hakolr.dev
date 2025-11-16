import { createEvent, createStore } from 'effector'

export const $asideMenuOpened = createStore(false)

export const toggleAsideMenu = createEvent()

$asideMenuOpened.on(toggleAsideMenu, (state) => !state)
