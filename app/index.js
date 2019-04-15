import React from 'react'
import { render } from 'react-dom'
import AppHot from './AppHot'

const root = document.getElementById('root')

function renderAppToContainer() {
  render(<AppHot />, root)
}

renderAppToContainer()
