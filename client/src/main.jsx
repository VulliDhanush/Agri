// 1. Import StrictMode, which helps us write better React code by warning us about bad practices
import { StrictMode } from 'react'
// 2. Import the tool that lets React actually draw things onto the web browser screen
import { createRoot } from 'react-dom/client'
// 3. Import our global CSS styles (colors, fonts, layout)
import './index.css'
// 4. Import our main App component (the "brain" of our app)
import App from './App.jsx'

// This is the VERY FIRST code that runs in the whole app.
// It finds the empty <div id="root"></div> in the index.html file...
// ...and injects our entire React <App /> inside of it!
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
