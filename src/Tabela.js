function Tabela({vetor}) {

    return(
        <table className="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Marca</th>
                    <th>Selecionar</th>
                </tr>
            </thead>
            <tbody>
            {
                vetor.map((pessoa, indice) => (
                    <tr key={indice}>
                        <td>{indice+1}</td>
                        <td>{pessoa.nome}</td>
                        <td>{pessoa.cpfCNPJ}</td>
                        <td><button className="btn btn-success">Selecionar</button></td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    )

}

export default Tabela;