import { db } from "../db.js";

export const getEmpresas = (_, res) => {
    const q = "SELECT * FROM empresas";

    db.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    })
}

export const addEmpresa = (req, res) => {
    const q = "INSERT INTO empresas(`nomeCliente`, `senha`, `nomeEmpresa`, `cnpj`, `cep`, `endereco`, `numero`, `telefone`, `email`) VALUES(?)";
  
    const values = [
        req.body.nomeCliente,
        req.body.senha,
        req.body.nomeEmpresa,
        req.body.cnpj,
        req.body.cep,
        req.body.endereco,
        req.body.numero,
        req.body.telefone,
        req.body.email,
    ];
  
    db.query(q, [values], (err) => {
        if (err) return res.json(err);
    
        return res.status(200).json("Empresa criada com sucesso.");
    });
};

export const updateEmpresa = (req, res) => {
    const q =
    "UPDATE empresas SET `nomeCliente` = ?, `senha` = ?, `nomeEmpresa` = ?, `cnpj` = ?, `cep` = ?, `endereco` = ?, `numero` = ?, `telefone` = ?, `email` = ? WHERE `id` = ?";

    const values = [
        req.body.nomeCliente,
        req.body.senha,
        req.body.nomeEmpresa,
        req.body.cnpj,
        req.body.cep,
        req.body.endereco,
        req.body.numero,
        req.body.telefone,
        req.body.email,
    ];

    db.query(q, [...values, req.params.id], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Empresa atualizada com sucesso.");
    });
};

export const deleteEmpresa = (req, res) => {
    const q = "DELETE FROM empresas WHERE `id` = ?";
  
    db.query(q, [req.params.id], (err) => {
        if (err) return res.json(err);
    
        return res.status(200).json("Empresa deletada com sucesso.");
    });
};