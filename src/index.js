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