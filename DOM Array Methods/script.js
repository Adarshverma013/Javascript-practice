const main  = document.getElementById('main');
const addUserBtn  = document.getElementById('add-user');
const doubleBtn  = document.getElementById('double');
const showMillionairesBtn  = document.getElementById('show-millionaires');
const sortBtn  = document.getElementById('sort');
const calculateWealthBtn   = document.getElementById('calculate-wealth');



let data = [];

getRandomUser();
getRandomUser();
getRandomUser();


// fetch random user and add money
async function getRandomUser() {
   const res = await fetch('https://randomuser.me/api');
   const data = await res.json();
   const user = data.results[0];

   const newUser = {
       name: `${user.name.first} ${user.name.last}`,
       money: Math.floor(Math.random()*1000000)
   };
   addData(newUser);
}

// add new user to data array
function addData(newUser) {
    data.push(newUser);
    updateDOM();
}

// update DOM
function updateDOM(providedData = data) {
    // Clear main div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
    });
}

// Format number as money
function formatMoney(number) {
    return '$'+number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Double money of each user
function doubleMoney() {
    data = data.map(user => {
        return {...user, money:user.money*2};
    });
    updateDOM();
}

//sort all by wealth
function sortByWealth() {
    data.sort((a,b) => b.money-a.money);
    updateDOM();
}

// filter all millionaires
function filterMillionaires() {
    data = data.filter(item => {
        return item.money >= 1000000;
    });
    updateDOM();
}

// calculate total wealth
function calaculateTotalWealth() {
    const wealth = data.reduce((acc,user) => (acc += user.money),0);

    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`
    main.appendChild(wealthEl);
}

// Event Listners
addUserBtn.addEventListener('click',getRandomUser);

doubleBtn.addEventListener('click',doubleMoney);

sortBtn.addEventListener('click',sortByWealth);

showMillionairesBtn.addEventListener('click',filterMillionaires);

calculateWealthBtn.addEventListener('click', calaculateTotalWealth);