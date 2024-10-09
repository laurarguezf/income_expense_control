//Servidor de Express

//Importar bibliotecas
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();

//Crear servidor
const server = express();
const serverPort = 3000;

//Config
server.use(cors());
server.use(express.json({limit: '50Mb'}));

//MySQL connection
async function getConnection() {
  try {
		const connection = await mysql.createConnection({
			host: process.env['DB_HOST'],
			port: 3306,
			user: process.env['DB_USER'],
			password: process.env['DB_PASSWORD'],
			database: process.env['DB_NAME']
		});

		await connection.connect();
		return connection;
	}
	catch(error) {
		console.log(error);
		return null;		
	}
}

//Arrancar el servidor
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});


//ENDPOINTS

// -------- Listar todos los eventos --------
server.get('/expenses', async (req, res) => {
	//Nos conectamos
	const connection = await getConnection();

	if( !connection ) {
		res.status(500).json({success: false, error: 'Error con la conexión.'});
		return;
	}

	//Obtenemos los datos
	const [results] = await connection.query(`
        SELECT * FROM expenses
        JOIN categories ON expenses.idcategories = categories.idcategories
        JOIN types ON expenses.idtypes = types.idtypes;
        `);

	//Devolvemos los resultados
	if (!results) {
		res.status(500).json({
			success: false,
			error: 'Datos no encontrados'
		})
	}
	else {
		res.status(200).json(results);
	}
	
	//Cerramos conexión
	await connection.close();
});


// -------- Listar nombres de categorias y su tipo de gasto relacionado --------
server.get('/categories', async (req, res) => {
	//Nos conectamos
	const connection = await getConnection();

	if( !connection ) {
		res.status(500).json({success: false, error: 'Error con la conexión.'});
		return;
	}

	//Obtenemos los datos
	const [results] = await connection.query(`
        SELECT categories.idcategories, categories.category_name, types.type_name FROM categories
			JOIN types ON categories.idtypes = types.idtypes;
        `);

	//Devolvemos los resultados
	if (!results) {
		res.status(500).json({
			success: false,
			error: 'Error en la obtención de categorías'
		})
	}
	else {
		res.status(200).json(results);
	}
	
	//Cerramos conexión
	await connection.close();
});


// -------- Insertar gasto/ingreso nuevo --------
server.post('/expenses', async (req, res) => {
	//Nos conectamos
	const connection = await getConnection();

	if( !connection ) {
		res.status(500).json({success: false, error: 'Error con la conexión.'});
	}

	//Comprobamos que están todos los datos
	const {date, idcategories, idtypes, amount} = req.body;

	if (!date || !idcategories || !idtypes || !amount) {
		return res.status(400).json({error: 'Faltan datos para crear la nueva entrada.'})
	}

	//Insertamos nuevos datos
	const [results] = await connection.execute(
		`INSERT INTO expenses (date, amount, \`desc\`, idcategories, idtypes) 
			VALUES (?, ?, ?, ?, ?)`,
			[req.body.date, req.body.amount, req.body.desc || null, req.body.idcategories, req.body.idtypes]);
	
	//Devolvemos un JSON en función de los resultados del insert
	if (results.affectedRows === 1)	{
		res.status(201).json({
			success: true,
			message: 'Gasto/ingreso creado correctamente',
			id: results.insertId
		})
	}
	else {
		res.status(500).json({
			success: false,
			error: 'Datos no insertados'
		})
	};

	//Cerramos conexión
	await connection.close();
});


// -------- Actualizar un gasto/ingreso existente en 'expenses' --------
server.put('/expenses/:id', async (req, res) => {
	//Nos conectamos
	const connection = await getConnection();

	if( !connection ) {
		res.status(500).json({success: false, error: 'Error con la conexión.'});
	}

	//Modificamos datos ya existentes
	const [results] = await connection.execute(
		`UPDATE expenses 
			SET date=?, amount=?, \`desc\`=?, idcategories=?, idtypes=?
			WHERE idexpenses=?`,
			[req.body.date, req.body.amount, req.body.desc || null, req.body.idcategories, req.body.idtypes, req.params.id]);

	//Devolvemos un JSON en función de los resultados del update
	if( results.changedRows === 1 ) {
		res.status(200).json({
			success: true,
			message: 'Gasto/ingreso actualizado correctamente'
		});
	}
	else {
		res.status(500).json({
			success: false,
			error: 'Error al actualizar el gasto/ingreso'
		});
	}

	//Cerramos conexión
	await connection.close();
});


// -------- Eliminar un gasto/ingreso existente en 'expenses' --------
server.delete('/expenses/:id', async (req, res) => {
	//Nos conectamos
	const connection = await getConnection();

	if( !connection ) {
		res.status(500).json({success: false, error: 'Error con la conexión.'});
	}

	//Borramos datos ya existentes
	const [results] = await connection.execute(
		`DELETE FROM expenses
			WHERE idexpenses=?`,
			[req.params.id]);

	//Devolvemos un JSON en función de los resultados del delete
	if( results.affectedRows === 1 ) {
		res.status(200).json({
			success: true,
			message: 'Gasto/ingreso eliminado correctamente'
		});
	}
	else {
		res.status(500).json({
			success: false,
			error: 'Error al eliminar el gasto/ingreso'
		});
	}

	//Cerramos conexión	
	await connection.close(); 
});