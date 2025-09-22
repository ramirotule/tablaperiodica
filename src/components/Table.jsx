import FirstRow from "./rows/FirstRow"
import SecondRow from "./rows/SecondRow"
import data from '../data.json'
import ThirdRow from "./rows/ThirdRow"
import FourthRow from "./rows/FourthRow"
import FifthRow from "./rows/FifthRow"
import Modal from "./Modal"
import { useState, createContext, useContext } from "react"
import SixthRow from "./rows/SixthRow"
import SeventhhRow from "./rows/SeventhRow"
import Actinides from "./rows/Actinides"
import Lanthanides from "./rows/Lanthanides"
import { ThemeContext } from "../App"

const ModalContext = createContext()

export default function Table(){
    const [open, setOpen] = useState(false)
    const [modalData, setModalData] = useState("")


    const themeContext = useContext(ThemeContext)
    let groupColor = themeContext ? "white": "#1e293b"

    function toggleModal(element){
        
        setModalData(element)
        setOpen((prevState)=> !prevState)
    }

    // let groupColor = themeContext ? white: black

    return(
        <ModalContext.Provider value={toggleModal}>
        <div className="py-2 md:py-4 px-2 md:px-4">
            <Modal 
            open={open}
            toggleModal={toggleModal}
            modalData={modalData}
            />

          

            <h2 className={`md:hidden py-2 text-lg font-semibold`} style={{color: groupColor}}>Periodo 1</h2>
            <FirstRow data={data.elements} />

            <h2 className={`md:hidden py-2 text-lg font-semibold`} style={{color: groupColor}}>Periodo 2</h2>
            <SecondRow data={data.elements} />

            <h2 className={`md:hidden py-2 text-lg font-semibold`} style={{color: groupColor}}>Periodo 3</h2>
            <ThirdRow data={data.elements} />

            <h2 className={`md:hidden py-2 text-lg font-semibold`} style={{color: groupColor}}>Periodo 4</h2>
            <FourthRow data={data.elements} />

            <h2 className={`md:hidden py-2 text-lg font-semibold`} style={{color: groupColor}}>Periodo 5</h2>
            <FifthRow  data={data.elements} />

            <h2 className={`md:hidden py-2 text-lg font-semibold`} style={{color: groupColor}}>Periodo 6</h2>
            <SixthRow data={data.elements} />

            <h2 className={`md:hidden py-2 text-lg font-semibold`} style={{color: groupColor}}>Periodo 7</h2>
            <SeventhhRow data={data.elements} />

            <h2 className={`md:hidden py-2 text-lg font-semibold`} style={{color: groupColor}}>Lantánidos</h2>
            <Lanthanides data={data.elements} />
            
            <h2 className={`md:hidden py-2 text-lg font-semibold`} style={{color: groupColor}}>Actínidos</h2>
            <Actinides data={data.elements} />

        </div>
        </ModalContext.Provider>
       
    )
}

export { ModalContext }