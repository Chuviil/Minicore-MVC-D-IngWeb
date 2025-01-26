import Database from "better-sqlite3";

export function getSalesByDateRange(fromDate, toDate) {
  const db = new Database('minicore.db');

  const stmt = db.prepare(`
    SELECT Departments.name AS department, SUM(Sales.amount) AS total
    FROM Sales
    JOIN Departments ON Sales.department_id = Departments.id
    WHERE Sales.date BETWEEN ? AND ?
    GROUP BY Departments.name
  `);
  return stmt.all(fromDate, toDate);
}
