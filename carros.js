const con = require('../connect/connect').con;

const create = (req, res) => {
    let cliente_id = req.body.cliente_id;
    let marca_veiculo = req.body.veiculo_placa;
    let modelo_veiculo = req.body.veiculo_marca;
    let ano_veiculo = req.body.veiculo_modelo;
    let fabricacao_veiculo = req.body.data_entrada;  

    let query = 'INSERT INTO carros (cliente_id, marca_veiculo , modelo_veiculo, ano_veiculo, fabricacao_veiculo ) VALUES ';
    query += `('${cliente_id}', '${marca_veiculo}', '${modelo_veiculo}', '${ano_veiculo}', '${fabricacao_veiculo}');`; 

    con.query(query, (err, result) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(201).json(result);
        }
    });
};

const read = (req, res) => {
    con.query('SELECT * FROM carros', (err, result) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json(result);
        }
    });
};

const update = (req, res) => {
    const id = req.params.id; 
    const { cliente_id, marca_veiculo, modelo_veiculo, ano_veiculo, fabricacao_veiculo } = req.body; 

    con.query(
        'UPDATE carros SET cliente_id = ?, marca_veiculo = ?,modelo_veiculo = ?, ano_veiculo = ?, fabricacao_veiculo = ? WHERE carros_id = ?',
        [cliente_id, marca_veiculo, modelo_veiculo, ano_veiculo, fabricacao_veiculo, id], 
        (err, result) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json(result);
            }
        }
    );
};

const deletar = (req, res) => {
    const id = req.params.id;

    con.query('DELETE FROM carros WHERE carros_id = ?', [id], (err, result) => {
        if (err) {
            res.status(400).json(err).end();
        } else {
            res.status(200).json(result);
        }
    });
};

module.exports = {
    create,
    read,
    update,
    deletar
};
