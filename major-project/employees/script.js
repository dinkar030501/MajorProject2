const tableBody = document.getElementById("table-body");

// Make a GET request to retrieve the data from the server
fetch("http://localhost:8080/projects")
  .then((response) => response.json())
  .then((data) => {
    // Populate the table with the data
    data.forEach((item) => {
      const row = document.createElement("tr");
      const srNoCell = document.createElement("td");
      const empIdCell = document.createElement("td");
      const nameCell = document.createElement("td");
      const sexCell = document.createElement("td");
      const ageCell = document.createElement("td");
      const departmentCell = document.createElement("td");
      const roleCell = document.createElement("td");

      empIdCell.textContent = item.empId;
      nameCell.textContent = item.name;
      sexCell.textContent = item.sex;
      ageCell.textContent = item.age;
      departmentCell.textContent = item.department;
      roleCell.textContent = item.role;

      row.appendChild(empIdCell);
      row.appendChild(nameCell);
      row.appendChild(sexCell);
      row.appendChild(ageCell);
      row.appendChild(departmentCell);
      row.appendChild(roleCell);

      tableBody.appendChild(row);
    });
  })
  .catch((error) => {
    console.error(error);
    alert("Error fetching data");
  });

// write a function to add a new employee to the table and send a POST request to the server
function addEmployee() {
  // write post code to add a new employee
  const empId = document.getElementById("empId").value;
  const name = document.getElementById("name").value;
  const sex = document.getElementById("sex").value;
  const age = document.getElementById("age").value;
  const department = document.getElementById("department").value;
  const role = document.getElementById("role").value;

  const data = {
    empId: empId,
    name: name,
    sex: sex,
    age: age,
    department: department,
    role: role,
  };

  fetch("http://localhost:8080/addEmployee", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      // Populate the table with the data
      const row = document.createElement("tr");
      const srNoCell = document.createElement("td");
      const empIdCell = document.createElement("td");
      const nameCell = document.createElement("td");
      const sexCell = document.createElement("td");
      const ageCell = document.createElement("td");
      const departmentCell = document.createElement("td");
      const roleCell = document.createElement("td");

      empIdCell.textContent = data.empId;
      nameCell.textContent = data.name;
      sexCell.textContent = data.sex;
      ageCell.textContent = data.age;
      departmentCell.textContent = data.department;
      roleCell.textContent = data.role;

      row.appendChild(empIdCell);
      row.appendChild(nameCell);
      row.appendChild(sexCell);
      row.appendChild(ageCell);
      row.appendChild(departmentCell);
      row.appendChild(roleCell);

      tableBody.appendChild(row);
    })
    .catch((error) => {
      console.error(error);
      alert("Error fetching data");
    });
}
