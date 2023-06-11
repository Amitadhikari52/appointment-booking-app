const apiUrl = 'https://crudcrud.com/api/a698b7e75c0647e181bc7ff06c2469fc/appointmentData';

function addNewUser(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phoneNumber = document.getElementById('phoneNumber').value;

    const user = {
        name,
        email,
        phoneNumber
    };

    createUser(user);
}

async function createUser(user) {
    try {
        const response = await axios.post(apiUrl, user);
        console.log(response.data); // Response from the server

        displayUser(response.data); // Display the user in the UI
    } catch (error) {
        console.error(error);
    }
}

function displayUser(user) {
    const ul = document.getElementById('listOfPeople');
    const li = document.createElement('li');
    li.innerHTML = `
    <span>${user.name} - ${user.email} - ${user.phoneNumber}</span>
    <button onclick="editUser('${user._id}')">Edit</button>
    <button onclick="deleteUser('${user._id}')">Delete</button>
  `;
    ul.appendChild(li);
}

async function getUsers() {
    try {
        const response = await axios.get(apiUrl);
        const users = response.data;
        users.forEach(user => {
            displayUser(user);
        });
    } catch (error) {
        console.error(error);
    }
}

async function editUser(userId) {
    const newName = prompt('Enter the new name:');
    if (newName === null) return;

    try {
        const response = await axios.put(`${apiUrl}/${userId}`, { name: newName });
        console.log(response.data); // Response from the server

        const span = document.querySelector(`li[data-id="${userId}"] span`);
        span.textContent = `${newName} - ${response.data.email} - ${response.data.phoneNumber}`;
    } catch (error) {
        console.error(error);
    }
}

async function deleteUser(userId) {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
        await axios.delete(`${apiUrl}/${userId}`);
        const li = document.querySelector(`li[data-id="${userId}"]`);
        li.remove();
    } catch (error) {
        console.error(error);
    }
}

getUsers();
