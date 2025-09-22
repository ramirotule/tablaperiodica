import { useContext, useState, useEffect } from "react"
import { ThemeContext } from "../App"
import { DarkModeSwitch } from "react-toggle-dark-mode"
import data from '../data.json'


export default function Header({toggleDarkMode, onSearchResults, onHighlightElement}){

const isDarkMode = useContext(ThemeContext)
const [searchTerm, setSearchTerm] = useState("")
const [searchResults, setSearchResults] = useState([])
const [showSuggestions, setShowSuggestions] = useState(false)

let fontColor =  isDarkMode ? " text-white": "text-gray-700"

// Función para buscar elementos
const searchElements = (term) => {
    if (!term.trim()) {
        setSearchResults([])
        setShowSuggestions(false)
        // Limpiar el elemento destacado cuando no hay búsqueda
        if (onHighlightElement) {
            onHighlightElement(null)
        }
        return
    }

    const results = data.elements.filter(element => 
        element.name.toLowerCase().includes(term.toLowerCase()) ||
        element.symbol.toLowerCase().includes(term.toLowerCase()) ||
        element.number.toString().includes(term)
    )
    
    setSearchResults(results)
    setShowSuggestions(results.length > 0)
    if (onSearchResults) {
        onSearchResults(results)
    }
}

// Manejar cambios en el input
const handleInputChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    searchElements(value)
}

// Manejar presionar Enter o click en sugerencia
const handleSelectElement = (element) => {
    setSearchTerm(element.name)
    setShowSuggestions(false)
    if (onHighlightElement) {
        onHighlightElement(element)
    }
}

// Manejar Enter
const handleKeyPress = (e) => {
    if (e.key === 'Enter' && searchResults.length > 0) {
        handleSelectElement(searchResults[0])
    }
}

useEffect(() => {
    // Cerrar sugerencias al hacer click fuera
    const handleClickOutside = () => setShowSuggestions(false)
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
}, [])

    return (
        <div className={ isDarkMode? `bg-slate-700 border-b border-slate-400`: `bg-slate-100 border-b border-slate-200` }>
                <div className="flex flex-col md:flex-row md:items-center py-4 px-4 space-y-4 md:space-y-0">
                <div className="flex items-center">
                    <img src="/logo.png" alt="logo" width="80" height="80" className="h-10 md:h-12"/>
                    <h1 className={`text-lg md:text-2xl font-bold ${fontColor} ml-4 md:ml-10`}>Tabla Periódica</h1>
                </div>
                    <div className="flex items-center md:ml-auto space-x-2 md:space-x-4 relative w-full md:w-auto">
                        <div className="relative flex-1 md:flex-none">
                            <input 
                                type="search" 
                                placeholder="Buscar elemento..." 
                                value={searchTerm}
                                onChange={handleInputChange}
                                onKeyPress={handleKeyPress}
                                onClick={(e) => e.stopPropagation()}
                                className={`border ${isDarkMode ? "border-slate-600 bg-slate-600 text-white" : "border-slate-300"} rounded-md py-2 px-3 md:px-4 w-full md:w-64 text-sm md:text-base`}  
                            />
                            {showSuggestions && (
                                <div className={`absolute top-full left-0 right-0 mt-1 ${isDarkMode ? "bg-slate-700 border-slate-600" : "bg-white border-slate-300"} border rounded-md shadow-lg z-50 max-h-40 md:max-h-60 overflow-y-auto`}>
                                    {searchResults.slice(0, 5).map((element) => (
                                        <div
                                            key={element.number}
                                            onClick={() => handleSelectElement(element)}
                                            className={`px-3 md:px-4 py-2 cursor-pointer ${isDarkMode ? "hover:bg-slate-600 text-white" : "hover:bg-gray-100"} border-b last:border-b-0 text-sm md:text-base`}
                                        >
                                            <span className="font-bold">{element.symbol}</span> - {element.name} (#{element.number})
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    <span className="cursor-pointer flex-shrink-0">
                    <DarkModeSwitch
                        // style={{ marginBottom: '2rem' }}
                        checked={isDarkMode}
                        onChange={toggleDarkMode}
                        size={24}
                        />
                    </span>
                    

                    </div>
                    
                    
                </div>
            
        </div>
    )

}