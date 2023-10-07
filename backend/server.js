const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2/promise');

const dbConfig = {
  user: "root",
  host: "localhost",
  password: "admin",
  database: "task"
};

app.use(express.json());
app.use(cors());


//showing the full datasheet
app.get('/datasheet', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute("SELECT e.eid, e.name AS employee_name, d.dept_name, (SELECT address FROM address_master WHERE eid = e.eid AND address_type = 'office' LIMIT 1) AS office_address, (SELECT address FROM address_master WHERE eid = e.eid AND address_type = 'residence' LIMIT 1) AS residence_address FROM employee AS e JOIN dept_master AS d ON e.dept_id = d.dept_id;");

    const jsonData = rows.map(row => ({
      eid: row.eid,
      employee_name: row.employee_name,
      dept_name: row.dept_name,
      office_address: row.office_address || '',
      residence_address: row.residence_address || ''
    }));

    connection.end();
    res.status(200).json(jsonData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



//register page

app.post('/register', async (req, res) => {
  const {
    name,
    department,
    address_office,
    address_residence
  } = req.body;

  try {
    const connection = await mysql.createConnection(dbConfig);

    const [newEmployeeResult] = await connection.execute(
      "INSERT INTO employee(name, dept_id) VALUES (?, ?);",
      [name, department]
    );

    const eid = newEmployeeResult.insertId;
    console.log(eid);

    await connection.execute(
      "INSERT INTO address_master(address_type, address, eid) VALUES (?, ?, ?);",
      ["office", address_office, eid]
    );

    await connection.execute(
      "INSERT INTO address_master(address_type, address, eid) VALUES (?, ?, ?);",
      ["residence", address_residence, eid]
    );

    connection.end();

    res.status(201).json({
      status: 'success',
      data: {
        newEmployee: newEmployeeResult,
        message: 'Employee and addresses added successfully'
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.get('/datasheet/:eid', async (req, res) => {
  const eid = req.params.eid;

  try {
    const connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute(
      `
      SELECT e.eid, e.name AS employee_name, d.dept_name,
        (SELECT address FROM address_master WHERE eid = e.eid AND address_type = 'office' LIMIT 1) AS office_address,
        (SELECT address FROM address_master WHERE eid = e.eid AND address_type = 'residence' LIMIT 1) AS residence_address
      FROM employee AS e
      JOIN dept_master AS d ON e.dept_id = d.dept_id
      WHERE e.eid = ?;
      `,
      [eid]
    );

    if (rows.length === 0) {
      connection.end();
      return res.status(404).json({ error: 'Employee not found' });
    }

    const employeeData = {
      eid: rows[0].eid,
      employee_name: rows[0].employee_name,
      dept_name: rows[0].dept_name,
      office_address: rows[0].office_address || '',
      residence_address: rows[0].residence_address || '',
    };

    connection.end();
    res.status(200).json(employeeData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.delete('/datasheet/:eid', async (req, res) => {
  const eid = req.params.eid;

  try {
    const connection = await mysql.createConnection(dbConfig);
    await connection.execute("DELETE FROM address_master WHERE eid = ?;", [eid]);
    await connection.execute("DELETE FROM employee WHERE eid = ?;", [eid]);

    connection.end();

    res.status(200).json({ status: 'success', message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//fetch departments
app.get('/departments', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute("SELECT dept_id, dept_name FROM dept_master");

    const departmentData = rows.map(row => ({
      dept_id: row.dept_id,
      dept_name: row.dept_name,
    }));

    connection.end();
    res.status(200).json(departmentData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//update database

app.put('/datasheet/:eid', async (req, res) => {
  const eid = req.params.eid;
  const {
    employee_name,
    dept_name,
    office_address,
    residence_address
  } = req.body;

  try {
    const connection = await mysql.createConnection(dbConfig);

    const [deptRow] = await connection.execute(
      "SELECT dept_id FROM dept_master WHERE dept_name = ?;",
      [dept_name]
    );
   
  
    const dept_id = deptRow[0].dept_id;
    

    await connection.execute(
      "UPDATE employee SET name = ?, dept_id = ? WHERE eid = ?;",
      [employee_name, dept_id, eid]
    );

   
    
    await connection.execute(
      "UPDATE address_master SET address = ? WHERE eid = ? AND address_type = 'office';",
      [office_address, eid]
    );

 
    await connection.execute(
      "UPDATE address_master SET address = ? WHERE eid = ? AND address_type = 'residence';",
      [residence_address, eid]
    );

    connection.end();

    res.status(200).json({ status: 'success', message: 'Employee data updated successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




const port = 3002;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
