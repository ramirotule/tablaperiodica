import Element from "../Element"
export default function FirstRow({ data }){
    
    return(
        <div className="">

            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 grid grid-cols-2 md:grid-cols-9 gap-1">
               
                    <Element elementData={data[0]} />
                    <div className="hidden md:block"></div>
                    <div className="hidden md:block"></div>
                    <div className="hidden md:block"></div>
                    <div className="hidden md:block"></div>
                    <div className="hidden md:block"></div>
                    <div className="hidden md:block"></div>
                    <div className="hidden md:block"></div>
                    <div className="hidden md:block"></div>

                </div>
                <div className="w-full md:w-1/2 grid grid-cols-2 md:grid-cols-9 gap-1">
                    <div className="hidden md:block"></div>
                    <div className="hidden md:block"></div>
                    <div className="hidden md:block"></div>
                    <div className="hidden md:block"></div>
                    <div className="hidden md:block"></div>
                    <div className="hidden md:block"></div>
                    <div className="hidden md:block"></div>
                    <div className="hidden md:block"></div>
                    <Element  elementData={data[1]} />
                   
                </div>
            </div>
         
            
        </div>
    )
}