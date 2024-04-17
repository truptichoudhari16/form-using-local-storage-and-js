// Read & Store user data

const register = (e) => {
  let formData = JSON.parse(sessionStorage.getItem("formData")) || [];

  let exist =
    formData.length &&
    formData.some(
      (data) =>
        data.fname.toLowerCase() ==
          document.getElementById("fname").value.toLowerCase() &&
        data.lname.toLowerCase() ==
          document.getElementById("lname").value.toLowerCase()
    );

  if (!exist) {
    formData.push({
      fname: document.getElementById("fname").value,
      lname: document.getElementById("lname").value,
      email: document.getElementById("email").value,
      pwd: document.getElementById("pwd").value,
    });

    sessionStorage.setItem("formData", JSON.stringify(formData));

    dispData();

    document.querySelector("form").reset();
    document.getElementById("fname").focus();
  } else {
    alert("Ooopppssss... Duplicate found!!!\nYou have already registered");
  }

  e.preventDefault();
};

// Displaying Users Information

function dispData() {
  var formData = JSON.parse(sessionStorage.getItem("formData"));

  if (formData && Array.isArray(formData)) {
    var output = document.querySelector("tbody");
    output.innerHTML = "";

    formData.forEach((data, index) => {
      var row = document.createElement("tr");

      var fnameCell = document.createElement("td");
      fnameCell.textContent = data.fname;
      row.appendChild(fnameCell);

      var lnameCell = document.createElement("td");
      lnameCell.textContent = data.lname;
      row.appendChild(lnameCell);

      var emailCell = document.createElement("td");
      emailCell.textContent = data.email;
      row.appendChild(emailCell);

      var pwdCell = document.createElement("td");
      pwdCell.textContent = data.pwd;
      row.appendChild(pwdCell);

      var actionCell = document.createElement("td");
      var deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.onclick = () => deleteContact(index);
      actionCell.appendChild(deleteButton);
      row.appendChild(actionCell);

      output.appendChild(row);
    });
  } else {
    console.log("No user data found or data is not in the expected format.");
  }
}

// Delete contact function

function deleteContact(index) {
  var formData = JSON.parse(sessionStorage.getItem("formData"));

  if (formData && Array.isArray(formData)) {
    formData.splice(index, 1);
    sessionStorage.setItem("formData", JSON.stringify(formData));
    dispData();
  }
}

// Display initial data

dispData();
