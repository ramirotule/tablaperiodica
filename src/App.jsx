import { useState } from 'react'
import './App.css'
import Table from './components/Table'
import Header from './components/Header'
import { createContext } from 'react'

const ThemeContext = createContext()
const SearchContext = createContext()

function App() {

  const [isDarkMode, setIsDarkMode] = useState(false)
  const [highlightedElement, setHighlightedElement] = useState(null)
  const [searchResults, setSearchResults] = useState([])

function toggleDarkMode(){
    setIsDarkMode(prevState=> !prevState)
}

const handleSearchResults = (results) => {
  setSearchResults(results)
}

const handleHighlightElement = (element) => {
  setHighlightedElement(element)
  // Auto-scroll hacia el elemento si es necesario
  setTimeout(() => {
    const elementInTable = document.querySelector(`[data-element-number="${element.number}"]`)
    if (elementInTable) {
      elementInTable.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, 100)
}

let bgColor = isDarkMode ? "bg-slate-800" : "bg-white"
  return (
    <ThemeContext.Provider value={isDarkMode}>
      <SearchContext.Provider value={{ highlightedElement, searchResults }}>
        <div className={`${bgColor} `}>
   
            <Header 
              toggleDarkMode={toggleDarkMode}
              onSearchResults={handleSearchResults}
              onHighlightElement={handleHighlightElement}
            />
            <Table />

        </div>
       
      

      </SearchContext.Provider>
    </ThemeContext.Provider>
   
  )
}

export default App
export { ThemeContext, SearchContext }
