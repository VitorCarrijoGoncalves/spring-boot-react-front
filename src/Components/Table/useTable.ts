import { useState } from "react"

interface line {
    id: number,
    nome: string,
    cpf: string,
    registroConselho: string
}

export default function useLine (pageLimit: number) {
    
    const [line, setLine] = useState()

    function fetchLine (page: number) {
        const virtualPage = ((page - 1) * pageLimit) <= 0 
        ? 0 
        : ((page - 1) * pageLimit)
    }
    
    return {

    }
}