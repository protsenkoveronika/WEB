document.getElementById("signupForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const middlename = document.getElementById("middlename").value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const phone = document.getElementById("phone").value;
    const birthdate = document.getElementById("birthdate").value;
    const group = document.getElementById("group").value;



    let isValid = true;
    const errorMessages = [];

    if (password === "" || password === " ") {
        isValid = false;
        errorMessages.push("Enter password");
        document.getElementById("passwordError").textContent = "Enter password";
    } else {
        document.getElementById("passwordError").textContent = "";
    }

    if (firstname === "" || firstname === " ") {
        isValid = false;
        errorMessages.push("Enter your firstname");
        document.getElementById("firstnameError").textContent = "Enter firstname";
    } else {
        document.getElementById("firstnameError").textContent = "";
    }

    if (lastname === "" || lastname === " ") {
        isValid = false;
        errorMessages.push("Enter your lastname");
        document.getElementById("lastnameError").textContent = "Enter lastname";
    } else {
        document.getElementById("lastnameError").textContent = "";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        isValid = false;
        errorMessages.push("Invalid email address");
        document.getElementById("emailError").textContent = "Incorrect email";
    } else {
        document.getElementById("emailError").textContent = "";
    }

    if (!gender) {
        isValid = false;
        errorMessages.push("Please select a gender");
        document.getElementById("genderError").textContent = "Select your gender";
    } else {
        document.getElementById("genderError").textContent = "";
    }

    if (new Date(birthdate) > new Date()) {
        isValid = false;
        errorMessages.push("Date of birth cannot be in the future");
        document.getElementById("birthdateError").textContent = "Date of birth cannot be in the future";
    } else if (birthdate === "") {
        isValid = false;
        errorMessages.push("Enter birthdate");
        document.getElementById("birthdateError").textContent = "Enter birthdate";
    } else {
        document.getElementById("birthdateError").textContent = "";
    }

    const phoneRegex = /^\+38\(\d{3}\)-\d{3}-\d{2}-\d{2}$/;
    if (!phoneRegex.test(phone)) {
        isValid = false;
        errorMessages.push("Invalid phone number format");
        document.getElementById("phoneError").textContent = "Invalid phone number format";
    } else {
        document.getElementById("phoneError").textContent = "";
    }

    if (isValid) {
        const tableBody = document.getElementById("data-table-body");
        const newRow = tableBody.insertRow();
        newRow.innerHTML = `
        <td>${email}</td>
        <td>${firstname}</td>
        <td>${lastname}</td>
        <td>${middlename}</td>
        <td>${birthdate}</td>
        <td>${gender.value}</td>
        <td>${phone}</td>
        <td>${group}</td>
        <td><input type="checkbox" class="rowCheckbox"></td>
        `;
        document.getElementById("signupForm").reset();
    } else {
        alert("Validation Error:\n" + errorMessages.join("\n"));
    }
});

const today = new Date().toISOString().split('T')[0];
document.getElementById("birthdate").setAttribute("max", today);

function deleteSelectedRows() {
    const checkboxes = document.querySelectorAll('.rowCheckbox:checked');
    checkboxes.forEach((checkbox) => {
        const row = checkbox.closest('tr');
        row.remove();
    });
}

function duplicateSelectedRows() {
    const checkboxes = document.querySelectorAll('.rowCheckbox:checked');
    const tableBody = document.getElementById('data-table-body');
    checkboxes.forEach((checkbox) => {
        const rowToDuplicate = checkbox.closest('tr');
        const newRow = rowToDuplicate.cloneNode(true);
        tableBody.appendChild(newRow);
    });
}

