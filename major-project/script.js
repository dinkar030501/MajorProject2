// fetch productivity data from backend '/productivity'
const leadership = [];
const hr = [];
const product = [];
const tech = [];
const marketing = [];
const business = [];

fetch("http://localhost:8080/productivity")
  .then((response) => response.json())
  .then((prod) => {
    const productivity = prod;
    console.log(productivity);

    const departments = [
      "HR",
      "Product",
      "Tech",
      "Marketing",
      "Leadership",
      "Business Development",
    ];

    for (let i = 0; i < departments.length; i++) {
      fetch("http://localhost:8080/projects/" + departments[i])
        .then((response) => response.json())
        .then((data) => {
          if (departments[i] === "Leadership") {
            const leadershipProductivity = data;
            leadershipProductivity.forEach((item) => {
              const empId = item.empId;
              const productivityData = productivity.find(
                (item) => item.empId == empId
              );
              leadership.push(productivityData);
            });
          } else if (departments[i] === "HR") {
            const hrProductivity = data;
            hrProductivity.forEach((item) => {
              const empId = item.empId;
              const productivityData = productivity.find(
                (item) => item.empId == empId
              );
              hr.push(productivityData);
            });
          } else if (departments[i] === "Product") {
            const productProductivity = data;
            productProductivity.forEach((item) => {
              const empId = item.empId;
              const productivityData = productivity.find(
                (item) => item.empId == empId
              );
              product.push(productivityData);
            });
          } else if (departments[i] === "Tech") {
            const techProductivity = data;
            techProductivity.forEach((item) => {
              const empId = item.empId;
              const productivityData = productivity.find(
                (item) => item.empId == empId
              );
              tech.push(productivityData);
            });
          } else if (departments[i] === "Marketing") {
            const marketingProductivity = data;
            marketingProductivity.forEach((item) => {
              const empId = item.empId;
              const productivityData = productivity.find(
                (item) => item.empId == empId
              );
              marketing.push(productivityData);
            });
          } else if (departments[i] === "Business Development") {
            const businessProductivity = data;
            businessProductivity.forEach((item) => {
              const empId = item.empId;
              const productivityData = productivity.find(
                (item) => item.empId == empId
              );
              business.push(productivityData);
            });
          }
        })
        .catch((error) => {
          console.error(error);
          alert("Error fetching data");
        });
    }
    if (leadership.length > 0) {
      let leadershipProductivity = 0;
      leadership.forEach((item) => {
        let totalTasksCompleted = item.totalTasksCompleted;
        let totalTimeAvailable = item.totalTimeAvailable;
        let productivity = totalTasksCompleted / totalTimeAvailable;
        console.log(productivity);
        leadershipProductivity = leadershipProductivity + productivity;
      });
      leadershipProductivity = leadershipProductivity / leadership.length;
    }
    if (hr.length > 0) {
      let hrProductivity = 0;
      hr.forEach((item) => {
        let totalTasksCompleted = item.totalTasksCompleted;
        let totalTimeAvailable = item.totalTimeAvailable;
        let productivity = totalTasksCompleted / totalTimeAvailable;
        console.log(productivity);
        hrProductivity = hrProductivity + productivity;
      });
      hrProductivity = hrProductivity / hr.length;
    }
  })
  .catch((error) => {
    console.error(error);
    alert("Error fetching data");
  });

// fetch department wise data from backend '/projects/:department' where departments are in array
// for eg: const departments = ['HR', 'IT', 'Finance', 'Marketing']
