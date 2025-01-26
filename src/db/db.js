import Database from "better-sqlite3";

export function getSalesByDateRange(fromDate, toDate) {
  const db = new Database('minicore.db');

  const salesStmt = db.prepare(`
    SELECT department_id, amount
    FROM Sales
    WHERE date BETWEEN ? AND ?
  `);
  const sales = salesStmt.all(fromDate, toDate);

  const departmentsStmt = db.prepare(`
    SELECT id, name
    FROM Departments
  `);
  const departments = departmentsStmt.all();

  const departmentTotals = {};

  departments.forEach(department => {
    departmentTotals[department.name] = 0;
  });

  sales.forEach(sale => {
    const department = departments.find(dept => dept.id === sale.department_id);
    if (department) {
      departmentTotals[department.name] += sale.amount;
    }
  });

  return Object.keys(departmentTotals).map(department => ({
    department,
    total: departmentTotals[department]
  }));
}
