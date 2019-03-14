const tbody = document.querySelector("tbody");
const sortButtons = document.querySelectorAll(".sort");
const filterOpt = document.querySelector(".filter");

let planetsData = [];
let loading = false;
let tbodyContent = "";
let rootAsc = {
  name: false,
  rotation: false,
  orbital: false,
  diameter: false,
  terrain: false,
  population: false
};

setContent = (updatedData) => {
  tbody.innerHTML = updatedData
    .map(
      planet =>
        `<tr>
            <td>${planet.name}</td>
            <td>${planet.rotation_period}</td>
            <td>${planet.orbital_period}</td>
            <td>${planet.diameter}</td>
            <td>${planet.terrain}</td>
            <td>${planet.population}</td>
        </tr>`
    )
    .join("");
};

sortAsc = (type, isNum) => {
  planetsData.sort((a, b) => {
    let data1;
    let data2;
    if (isNum) {
      data1 = parseInt(a[type]);
      data2 = parseInt(b[type]);
    } else {
      data1 = a[type];
      data2 = b[type];
    }

    if (data1 < data2) {
      return -1;
    }
    if (data1 > data2) {
      return 1;
    }
  });
};

sortDesc = (type, isNum) => {
  planetsData.sort((a, b) => {
    let data1;
    let data2;
    if (isNum) {
      data1 = parseInt(a[type]);
      data2 = parseInt(b[type]);
    } else {
      data1 = a[type];
      data2 = b[type];
    }

    if (data2 < data1) {
      return -1;
    }
    if (data2 > data1) {
      return 1;
    }
  });
};

toggleDropdown = type => {
  rootAsc[type] = !rootAsc[type];
};

sort = e => {
  sortButtons.forEach(sortButton => {
    sortButton.classList.remove('desc');
  });
  switch (e.target.dataset.sort) {
    case "name":
      toggleDropdown("name");
      if (rootAsc.name) {
        sortAsc("name", false);
        e.target.classList.add("asc");
        e.target.classList.remove("desc");
      } else {
        sortDesc("name", false);
        e.target.classList.remove("asc");
        e.target.classList.add("desc");
      }
      setContent(planetsData);
      break;
    case "rotation":
      toggleDropdown("rotation");
      if (rootAsc.rotation) {
        sortAsc("rotation_period", true);
        e.target.classList.add("asc");
        e.target.classList.remove("desc");
      } else {
        sortDesc("rotation_period", true);
        e.target.classList.remove("asc");
        e.target.classList.add("desc");
      }
      setContent(planetsData);
      break;
    case "orbital":
      toggleDropdown("orbital");
      if (rootAsc.orbital) {
        sortAsc("orbital_period", true);
        e.target.classList.add("asc");
        e.target.classList.remove("desc");
      } else {
        sortDesc("orbital_period", true);
        e.target.classList.remove("asc");
        e.target.classList.add("desc");
      }
      setContent(planetsData);
      break;
    case "diameter":
      toggleDropdown("diameter");
      if (rootAsc.diameter) {
        sortAsc("diameter", true);
        e.target.classList.add("asc");
        e.target.classList.remove("desc");
      } else {
        sortDesc("diameter", true);
        e.target.classList.remove("asc");
        e.target.classList.add("desc");
      }
      setContent(planetsData);
      break;
    case "terrain":
      toggleDropdown("terrain");
      if (rootAsc.terrain) {
        sortAsc("terrain", false);
        e.target.classList.add("asc");
        e.target.classList.remove("desc");
      } else {
        sortDesc("terrain", false);
        e.target.classList.remove("asc");
        e.target.classList.add("desc");
      }
      setContent(planetsData);
      break;
    case "population":
      toggleDropdown("population");
      if (rootAsc.population) {
        sortAsc("population", true);
        e.target.classList.add("asc");
        e.target.classList.remove("desc");
      } else {
        sortDesc("population", true);
        e.target.classList.remove("asc");
        e.target.classList.add("desc");
      }
      setContent(planetsData);
      break;
    default:
      break;
  }
};

filterTable = (e) => {
    const updatedData = planetsData.slice(0, +e.target.value + 1);
    setContent(updatedData);
}

sortButtons.forEach(sortButton => {
  sortButton.addEventListener("click", sort);
});

filterOpt.addEventListener('change', filterTable);

axios
  .get("https://swapi.co/api/planets/")
  .then(res => {
    planetsData.push(...res.data.results);
    setContent(planetsData);
    sortButtons.forEach(sortButton => {
        sortButton.style.opacity = "1";
    });
  })
  .catch(err => {
    console.log(err);
  });
