const myForm = document.querySelector('#my-form');
  const expAmt = document.querySelector("#expAmount");
  const expDesc = document.querySelector("#expDescription");
  const expCat = document.querySelector("#expCategory");
  const message = document.querySelector(".msg");
  const expList = document.querySelector(".expList");
  const buttonSubmit = document.querySelector("#Button");

  async function getExpenses(e) {
    try {
      const res = await axios.get('http://localhost:3000/getExpenses');
      console.log("res",res.data)
      res.data.forEach(expense => {
            const {amount, description, category} = expense;
            const li = document.createElement("li");
            li.classList.add("list-group-item-warning")
            const text = document.createTextNode(`${amount}-${description}-${category}`);
            const deleteBtn = document.createElement("button");
            const editBtn = document.createElement("button");
            //const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("btn", "btn-sm", "btn-outline-danger", "me-2");
            deleteBtn.innerHTML = "Delete";

            //deleteBtn.classList.add("btn","btn-danger","btn-close");
            editBtn.classList.add("btn","btn-sm","btn-primary","edit");
            editBtn.innerHTML = "Edit";
            li.appendChild(text);
            li.appendChild(deleteBtn);
            li.appendChild(editBtn);
            expList.appendChild(li);
        });
    }
    catch(err) {
      console.log(err);
    }
  }

  async function newExpense(e) {
        try{
            e.preventDefault();
            if(expAmt.value === "" || expDesc.value === "" || expCat.value === "") {
                message.classList.add("bg-danger");
                message.innerHTML = "please enter all fields";
                setTimeout(() => message.remove(), 1000);
            }
            else{
                let expItem = {
                    expAmt : expAmt.value,
                    expDesc : expDesc.value,
                    expCat : expCat.value
                }
                const res = await axios.post(`http://localhost:3000/newExpense`,expItem);
                console.log(res.data)
                const { price, name, category, _id} = res.data;
                console.log(_id)
                const li = document.createElement("li");
                li.classList.add("list-group-item-warning")
                const text = document.createTextNode(`${expAmt.value}-${expDesc.value}-${expCat.value}`);
                const deleteBtn = document.createElement("button");
                const editBtn = document.createElement("button");
                deleteBtn.classList.add("btn", "btn-sm", "btn-outline-danger","me-2");
                deleteBtn.innerHTML = "Delete";
                editBtn.classList.add("btn","btn-sm","btn-primary");
                editBtn.innerHTML = "Edit";
                li.appendChild(text);
                li.appendChild(deleteBtn);
                li.appendChild(editBtn);
                expList.appendChild(li);
                window.location.reload();
            }
        }
        catch(err) {
            if(error.response) {
                console.log(error.response.status);
                console.log(error.response.headers);
            }
            else if(error.request) {
                console.log(error.request);
            }
            else{
                console.log({'Error' : error.message});
            }
        }    
    }

    async function deleteExpense(e) {
    try {
        e.preventDefault();
        let id;
        if(e.target.classList && e.target.classList.contains('me-2')){
            let li = e.target.parentNode.firstChild.wholeText.split('-');
            console.log("li", li)
            const readExp = await axios.get(`http://localhost:3000/getExpenses`);
            readExp.data.forEach(expense => {
              console.log(expense)
                if(expense.amount === +li[0] && expense.description === li[1] && expense.category === li[2]) {
                    id = expense.id;
                }
            }) 
        }
        console.log("id inside index", id);
        const res = await axios.get(`http://localhost:3000/deleteExpense`,{
          params : {
            id : id
          }
        });
        console.log(res);
        console.log("deleted expense");
        window.location.reload();
    }
    catch(error) {
        if(error.response) {
            console.log(error.response.status);
            console.log(error.response.headers);
        }
        else if(error.request) {
            console.log(error.request);
        }
        else{
            console.log({'Error' : error.message});
        }
    }
}


async function editExpense(e, expItem, id) {
    try{
        e.preventDefault();
        console.log("befor axios eidt call");
        const editRes = await axios.get(`http://localhost:3000/editExpense`, {
          params : {
            id : id,
            expenseItem : expItem
          }
        });
        console.log("edited item");
        window.location.reload();
    }
    catch(error) {
        if(error.response) {
            console.log(error.response.status);
            console.log(error.response.headers);
        }
        else if(error.request) {
            console.log(error.request);
        }
        else{
            console.log({'Error' : error.message});
        }  
    }
}
var id;

expList.addEventListener('click', async (e) => {
    if(e.target.classList && e.target.classList.contains('me-2')){
        deleteExpense(e);
    }
    else {
        e.preventDefault();
        let button = document.querySelector("#Button");
        button.innerHTML = "update";
        const [amount, description, category] = e.target.parentNode.firstChild.wholeText.split('-');
        document.querySelector("#expAmount").setAttribute('value', amount);
        document.querySelector("#expDescription").setAttribute('value', description);
        document.querySelector("#expCategory").setAttribute('value', category);
        let li = e.target.parentNode.firstChild.wholeText.split('-');
        const readExp = await axios.get(`http://localhost:3000/getExpenses`);
        readExp.data.forEach(expense => {
            if(expense.amount === +li[0] && expense.description === li[1] && expense.category === li[2]) {
                id = expense.id;
            }
        }) 
        console.log(id);
    }
});

  document.addEventListener('DOMContentLoaded',getExpenses);

  var expenseId, expItem;

  myForm.addEventListener('click', (e) => {
    if(e.target.innerHTML === "Submit") {
       console.log("to update");
       newExpense(e);
    }
    else if(e.target.innerHTML === "update") {
        expItem = {
            amount : document.querySelector("#expAmount").value,
            description : document.querySelector("#expDescription").value,
            category : document.querySelector("#expCategory").value
        }
        console.log(expItem, id);
        editExpense(e, expItem, id);
    }
});