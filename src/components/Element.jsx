import { useContext, useState } from "react"
import { ModalContext } from "./Table"
import { ThemeContext, SearchContext } from "../App"


export default function Element({ elementData, series, from }){
    const modalContext = useContext(ModalContext)
    const [isFocused, setFocus] = useState(false)
    const themeContext = useContext(ThemeContext)
    const searchContext = useContext(SearchContext)

    // Verificar si este elemento está destacado por la búsqueda
    const isHighlighted = searchContext?.highlightedElement && 
                         elementData && 
                         searchContext.highlightedElement.number === elementData.number

    let color = themeContext ?"#1e293b": "white"
    
    // Solo aplicar el color de búsqueda si hay un elemento específicamente destacado
    if (isHighlighted && searchContext?.highlightedElement) {
        color = "#ff0080" // Rosa/magenta muy brillante
    } else {
        // Colores normales por categoría
        if (elementData && elementData.category === "metal alcalinotérreo") color="#f97927"
        if (elementData && elementData.category === "metal alcalino") color = "#fdc235"
        if (elementData && elementData.category === "metal de transición") color = "#2685c1"
        if (elementData && elementData.category === "metal post-transición") color = "#263d51"
        if (elementData && elementData.category === "no metal poliatómico") color = "#ea2d59"
        if (elementData && elementData.category === "gas noble") color = "#8b58ad"
        if (elementData && elementData.category === "no metal diatómico") color = "#4caed4"
        if (elementData && elementData.category === "metaloide") color = "#769191"
        if (elementData && elementData.category === "unknown, probably post-transition metal") color = "#f542da"
        if (elementData && elementData.category === "unknown, probably transition metal") color = "#82ad0a"
        if (elementData && elementData.category === "unknown, probably metalloid") color = "#f7d3f0"
        if (elementData && elementData.category === "unknown, predicted to be noble gas") color = "#d5a6bd"
        if (elementData && elementData.category === "lantánido") color = "#ff4b34"
        if (elementData && elementData.category === "actínido") color = "#54bd4a"
        if (from && series === "Lantánidos") color = "#ff4b34"
        if (from && series === "Actínidos") color = "#54bd4a"
    }

    const style = {
        backgroundColor: color,
        // Solo agregar animación y sombra si realmente está destacado Y hay un elemento específico
        ...(isHighlighted && searchContext?.highlightedElement && {
            boxShadow: '0 0 20px rgba(255, 0, 128, 0.8)',
            transform: 'scale(1.05)',
            transition: 'all 0.3s ease',
            animation: 'pulse 2s infinite'
        })
    }

    const hoverStyle ={
        backgroundColor: isHighlighted && searchContext?.highlightedElement ? "#ff0080" : "#504A4B",
    }

    let darkModeBorder = themeContext ? "border-slate-800":"border-white"


    return(
        <div 
        data-element-number={elementData?.number}
        onClick={()=> elementData?  modalContext(elementData): console.log('no modal will be shown')} 
        onMouseEnter={() => setFocus(true)}
        onMouseLeave={() => setFocus(false)}

        className={ elementData ? `bg-${color}-900 cursor-pointer hover:bg-gray-100 rounded`: ""}
        style={isFocused && elementData ? hoverStyle: style}>
          



            {from && <div className={`border ${darkModeBorder} py-6 m-0`}> 
                    <h1 className="font-bold text-white" >{from} </h1>
                    <p className="text-xs tracking-tighter text-white">{series}</p>
                
                </div>}    

                {elementData && <div className={`border  ${darkModeBorder} py-4 m-0`}> 
                    <p className={`text-xs text-white`}>{elementData.number}</p>
                    <h1 className="font-bold text-white" >{elementData.symbol} </h1>
                    <p className="text-xs tracking-tighter text-white">{elementData.name}</p>
                
                </div>}
        </div>
       
    )
}