import * as React from 'react'
import { render } from 'react-dom'
import fscreen from 'fscreen'
import AppHot from './App'

if (fscreen.fullscreenEnabled && /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
  fscreen.addEventListener('fullscreenchange', handler, false)
  // fscreen.requestFullscreen(document.documentElement) // open this comment if needed
}

function handler() {
  if (fscreen.fullscreenElement !== null) {
    console.log('Entered fullscreen mode')
  } else {
    console.log('Exited fullscreen mode')
  }
}

const root = document.getElementById('root')

render(<AppHot />, root)
