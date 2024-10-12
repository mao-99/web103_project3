import pool from '../config/database.js';

const getWorkshops = async (req, res) => {
  try {
      const results = await pool.query('SELECT * FROM workshops ORDER BY id ASC;')
      res.status(200).json(results.rows)
  } catch (error) {
      res.status(409).json({ error: error.message })
  }
};


// const getWorkshop = async (req, res) => {
//   try {
//     const { workshopID } = req.params;
//     const query = 'SELECT * FROM workshops WHERE id = $1';
//     const result = await pool.query(query, [workshopID]);

//     if (result.rows.length > 0) {
//       res.status(200).json(result.rows[0]);
//     } else {
//       res.status(404).json({ error: 'Workshop not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

export default { getWorkshops };
