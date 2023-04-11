// Selecting the necessary elements from the HTML document
const form = document.querySelector('form');
const display = document.querySelector('#display');
const amountInput = document.querySelector('#amount');
const descInput = document.querySelector('#desc');
const categoryInput = document.querySelector('#category');

// Function to display expenses on the page
const displayExpenses = (expenses) => {
  // Clear the display div before adding new data
  display.innerHTML = '';

  // Create the table header
  const table = document.createElement('table');
  table.classList.add('table');
  const headerRow = document.createElement('tr');
  headerRow.innerHTML = `
    <th>Description</th>
    <th>Category</th>
    <th>Amount</th>
    <th></th>
  `;
  table.appendChild(headerRow);

  expenses.forEach(expense => {
    // Create a table row for each expense
    const row = document.createElement('tr');
    // Create HTML markup for displaying the expense data
    row.innerHTML = `
      <td>${expense.description}</td>
      <td>${expense.category}</td>
      <td>${expense.amount}</td>
      <td>
        <button class="btn btn-danger" style="background-color: black; color: white;" data-id="${expense.id}">Delete</button>
        <button class="btn btn-primary" style="background-color: blue; color: white;" data-id="${expense.id}" data-bs-toggle="modal" data-bs-target="#editModal">Edit</button>
      </td>
    `;
    // Add event listener for delete button
    const deleteBtn = row.querySelector('.btn-danger');
    deleteBtn.addEventListener('click', (event) => {
      const id = event.target.getAttribute('data-id');
      axios.get(`/get/deleteExpense/${id}`)
        .then(() => {
          // If the expense is successfully deleted, fetch all expenses and display them again
          axios.get('/get/getAllExpenses')
            .then((response) => {
              displayExpenses(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    });
    // Add event listener for edit button
    const editBtn = row.querySelector('.btn-primary');
    editBtn.addEventListener('click', (event) => {
      const id = event.target.getAttribute('data-id');
      // When the edit button is clicked, fetch the data for the selected expense and populate the input fields in the edit modal
      axios.get(`/get/editExpense/${id}`)
        .then((response) => {
          const expense = response.data;
          axios.get(`/get/deleteExpense/${id}`) 
            .then(() => {
              categoryInput.value = expense.category !== undefined ? expense.category : '';
              descInput.value = expense.description !== undefined ? expense.description : '';
              amountInput.value = expense.amount !== undefined ? expense.amount : '';
            // If the expense is successfully deleted, fetch all expenses and display them again
              axios.get('/get/getAllExpenses')
                .then((response) => {
                  displayExpenses(response.data);
                })
                .catch((error) => {
                  console.log(error);
                });
            })
          //document.querySelector('#editId').value = expense.id;
        })
        .catch((error) => {
          console.log(error);
        });
    });
    // Add the expense row to the table
    table.appendChild(row);
  });

  // Add the table to the display div
  display.appendChild(table);
};


// Fetch all expenses and display them on page load
axios.get('/get/getAllExpenses')
  .then((response) => {
    displayExpenses(response.data);
  })
  .catch((error) => {
    console.log(error);
  });

// Function to reset the form after submitting an expense
const resetForm = () => {
  amountInput.value = '';
  descInput.value = '';
  categoryInput.value = 'Fuel';
  
};

// Add event listener for form submission
form.addEventListener('submit', (event) => {
  event.preventDefault();
  // Get the values from the input fields
  const amount = amountInput.value;
  const description = descInput.value;
  const category = categoryInput.value;
  // Create a new expense with the values and send it to the server
  axios.post('/post/addExpense', { amount, description, category })
  .then((response) => {
    // Handle the response from the server
    console.log(response);
    // Clear the input fields
    amountInput.value = '';
    descInput.value = '';
    categoryInput.value = '';
    // Refresh the expenses list
    getExpenses();
  })
  .catch((error) => {
    // Handle errors
    console.error(error);
  });
  });
    
    // Get all expenses from the server and display them
    function getExpenses() {
    axios.get('/get/expenses')
    .then((response) => {
    // Handle the response from the server
      console.log(response);
    // Clear the expenses list
      expensesList.innerHTML = '';
    // Loop through the expenses and add them to the list
    response.data.forEach((expense) => {
    const li = document.createElement('li');
    li.innerHTML = `Amount: $${expense.amount}, Description: ${expense.description}, Category: ${expense.category}`;
    expensesList.appendChild(li);
    });
    })
    .catch((error) => {
    // Handle errors
    console.error(error);
    });
    }
    
    // Call getExpenses() on page load
    getExpenses();