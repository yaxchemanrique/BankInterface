const queryString = window.location.search;
const urlParameter = new URLSearchParams(queryString);
const indexOfClient = parseInt(urlParameter.get('index'));

const fullName = client[indexOfClient].firstName + ' ' + client[indexOfClient].lastName;
const cardNumber = client[indexOfClient].cardNumber;

let currentBalance = client[indexOfClient].balance;

let transactions = [];

const delay = 500;
let isValid = true;

console.log(indexOfClient);
console.log(fullName);
console.log(currentBalance);

document.getElementById('user-fullname').innerText = fullName;
document.getElementById('balance-amount').innerText = currentBalance;
document.getElementById('card-number').innerText = cardNumber;
document.getElementById('user-full-name').innerText = fullName;

//Buttons & Functions - Open Modals
document.getElementById('transfer-option').addEventListener('click', displayTransferModal);
document.getElementById('transfer-option-nav').addEventListener('click', displayTransferModal);
document.getElementById('deposit-option').addEventListener('click', displayDepositModal);
document.getElementById('withdraw-option').addEventListener('click', displayWithdrawModal);

function displayTransferModal() {
    document.getElementById('transfer-modal').style.display ='block';
}
function displayDepositModal() {
    document.getElementById('deposit-modal').style.display ='block';
}
function displayWithdrawModal() {
    document.getElementById('withdraw-modal').style.display ='block';
}

//Buttons & Functions - Close Modals
document.getElementById('close-button-transfer').addEventListener('click', closeTransferModal);
document.getElementById('close-button-deposit').addEventListener('click', closeDepositModal);
document.getElementById('close-button-withdraw').addEventListener('click', closeWithdrawModal);

function closeTransferModal() {
        document.getElementById('transfer-modal').style.display ='none'; 
}
function closeDepositModal() {
        document.getElementById('deposit-modal').style.display ='none';
}
function closeWithdrawModal() {
        document.getElementById('withdraw-modal').style.display ='none'; 
}

//validate all fields - Transfer button
document.getElementById('transfer-submit').addEventListener('click', transferValidateInputsAndReset);

function validateTransferAllFields() {
    removeErrorTextTransaction('transfer', 'firstname');
    validateAFieldinTransaction('transfer', 'firstname');
    if (isValid) {
        removeErrorTextTransaction('transfer', 'lastname');
        validateAFieldinTransaction('transfer', 'lastname');
        if (isValid) {
            removeErrorTextTransaction('transfer', 'bankname');
            validateAFieldinTransaction('transfer', 'bankname');
            if (isValid) {
                removeErrorTextTransaction('transfer', 'accountnumber');
                validateAFieldinTransaction('transfer', 'accountnumber');
                if (isValid) {
                    removeErrorTextTransaction('transfer', 'amount');
                    validateAFieldinTransaction('transfer', 'amount');
                    if (isValid) {
                        removeInvalidTextTransaction ('transfer');
                        validateTransferAmount();
                            if (isValid) {
                                setTimeout(() => {   //Ya discutimos internamente que sí va aqui
                                closeTransferModal();
                            }, delay);
                        }
                    } 
                } 
            } 
        } 
    }
}

//validate all fields - Deposit button
document.getElementById('deposit-submit').addEventListener('click', depositValidateInputsAndReset);

function validateDepositAllFields() {
    removeErrorTextTransaction('deposit', 'firstname');
    validateAFieldinTransaction('deposit', 'firstname');
    if (isValid) {
        removeErrorTextTransaction('deposit', 'lastname');
        validateAFieldinTransaction('deposit', 'lastname');
        if (isValid) {
            removeErrorTextTransaction('deposit', 'bankname');
            validateAFieldinTransaction('deposit', 'bankname');
            if (isValid) {
                removeErrorTextTransaction('deposit', 'accountnumber');
                validateAFieldinTransaction('deposit', 'accountnumber');
                if (isValid) {
                    removeErrorTextTransaction('deposit', 'amount');
                    validateAFieldinTransaction('deposit', 'amount');
                    if (isValid) {
                        removeInvalidTextTransaction ('deposit');
                        validateDepositAmount();
                        if (isValid) {
                            setTimeout(() => {
                                closeDepositModal();
                            }, delay);
                        }
                    } 
                } 
            } 
        } 
    } 
}

//validate all fields - Withdraw button
document.getElementById('withdraw-submit').addEventListener('click', withdrawValidateInputsAndReset);

function validateWithdrawAllFields() {
    removeErrorTextTransaction('withdraw', 'amount');
    validateAFieldinTransaction('withdraw', 'amount');
    if (isValid) {
        removeInvalidTextTransaction ('withdraw');
        validateWithdrawAmount();
        }
}

//funcion reset fields and inputs
    //validate fields
    // Update dashboard transactions
    // remove stored inputs();
    //remove sucess message
        //FOR TRANSFER
function transferValidateInputsAndReset() {
    validateTransferAllFields();
    if (isValid) {
        createNewTransaction('transfer');
        document.querySelector('#transactions-list li:first-child').remove();
        setTimeout(() => {
        removeValueInputs('transfer', 'firstname');
        removeValueInputs('transfer', 'lastname');
        removeValueInputs('transfer', 'bankname');
        removeValueInputs('transfer', 'accountnumber');
        removeValueInputs('transfer', 'amount');
        removeSuccessMessage('transfer');
    }, delay); }
}

function depositValidateInputsAndReset() {
    validateDepositAllFields();
    if (isValid) {
        createNewTransaction('deposit');
        document.querySelector('#transactions-list li:first-child').remove();
        setTimeout(() => {
        removeValueInputs('deposit', 'firstname');
        removeValueInputs('deposit', 'lastname');
        removeValueInputs('deposit', 'bankname');
        removeValueInputs('deposit', 'accountnumber');
        removeValueInputs('deposit', 'amount');
        removeSuccessMessage('deposit');
    }, delay); }
}

function withdrawValidateInputsAndReset () {
    validateWithdrawAllFields();
    if (isValid) {
        createNewWithdraw();
        document.querySelector('#transactions-list li:first-child').remove();
        removeValueInputs('withdraw', 'amount');
    }
}

//remove stored inputs
function removeValueInputs(transaction, field) {
    document.getElementById(transaction + '-' + field).value = '';
}

//remove success message
function removeSuccessMessage(transaction) {
    document.getElementById('success-' + transaction).style.display='none';
}


//remove error 'cause empty 
function removeErrorTextTransaction (transaction, field) {
    let inputValue = document.getElementById(transaction + '-' + field);
    let errorText = 'error-text-';
    inputValue.classList.remove('error-input');
    document.getElementById(errorText + transaction + '-' + field).style.display = 'none';
}

//remove error texts 'cause invalid amount
function removeInvalidTextTransaction (transaction) {
    let errorText = 'error-text-';
    let amountInvalid = '-amount-invalid'
    document.getElementById(errorText + transaction + amountInvalid).style.display = 'none';
}



//FUNCTION to validate 1 transaction, 1 field
// transaction : transfer, deposit, withdraw
// field : firstname, lastname, bankname, accountnumber, amount
function validateAFieldinTransaction (transaction, field) {
    let input = document.getElementById(transaction + '-' + field);
    let errorText = 'error-text-';
    if(input.value == '') {
        input.classList.add('error-input');
        document.getElementById(errorText + transaction + '-' + field).style.display = 'inline';
        isValid = false;
    } else {isValid = true;}
}

//validate amount balance >= 200 USD for transfer
function validateTransferAmount() {
    //Verify input is a number -> no undefined / NaN 
    //parseFloat ('String with no numbers') == NaN

    let amountTransfer = parseFloat(document.getElementById('transfer-amount').value); 

    if (isNaN(amountTransfer)){      //Input is a number? no ->
        alert('that\'s not a valid amount');
        isValid = false;

    } else {                        //Input is a number? yes->
        let newBalance = currentBalance - amountTransfer;

        if (newBalance < 200) {
            document.getElementById('error-text-transfer-amount-invalid').style.display = 'inline-block';
            isValid = false;
        } else {
            currentBalance = newBalance;
            client[indexOfClient].balance = currentBalance;
            document.getElementById('balance-amount').innerText = currentBalance;
            document.getElementById('success-transfer').style.display = 'flex';
            isValid = true;
        }
    } 
}

//validate amount balance >= 200 USD for withdraw
function validateWithdrawAmount() {
    let amountWithdraw = parseFloat(document.getElementById('withdraw-amount').value); 

    if (isNaN(amountWithdraw)){      //Input is a number? no ->
        alert('that\'s not a valid amount');
        isValid = false;

    } else {
        let newBalance = currentBalance - amountWithdraw;

        if (newBalance < 200) {
            document.getElementById('error-text-withdraw-amount-invalid').style.display = 'inline-block';
            isValid = false;
        } else {
        currentBalance = newBalance;
        client[indexOfClient].balance = currentBalance;
        document.getElementById('balance-amount').innerText = currentBalance;
        document.getElementById('success-withdraw').style.display = 'flex';
        }
    }
}

//validate amount deposit < 5000 USD
function validateDepositAmount() {
    let amountDeposit = parseFloat(document.getElementById('deposit-amount').value); 

    if (isNaN(amountDeposit)){      //Input is a number? no ->
        alert('that\'s not a valid amount');
        isValid = false;

    } else {  
                              //Input is a number? yes ->
        if (amountDeposit >= 5000) {
            document.getElementById('error-text-deposit-amount-invalid').style.display = 'inline-block';
            isValid = false;
        } else {
        let newBalance = currentBalance + amountDeposit;
        currentBalance = newBalance;

        client[indexOfClient].balance = currentBalance;
        document.getElementById('balance-amount').innerText = currentBalance;
        document.getElementById('success-deposit').style.display = 'flex';
        isValid = true;
        }
    }
}

//debería hacer una función que verifique si es un numero
//Para verificar input de amounts
//función para verificar pattern 'xxxx xxxx xxxx xxxx'
//para verificar account number

// ABOUT THE TRANSACTIONS DASHBOARD 
let transactionDate ;
let transactionDay ;
let transactionMonth ;
let transactionMonthString;
let transactionTag = 'transaction';

function createNewTransaction(tag) {
    createTransactionDate();
    transactionTag = tag;
    //get account number -> id = transaction-accountnumber
    let accountNumber = document.getElementById(tag + '-accountnumber').value;
    //get amount -> id = transaction-amount
    let transactionAmount = document.getElementById(tag + '-amount').value;
    createNewTransactionLiItem(transactionDay, transactionMonthString, transactionTag, accountNumber, transactionAmount);
}

function createNewTransactionLiItem(day, month, tag, account, amount) {
    let transactionList = document.getElementById('transactions-list');
    let listInnerHTML = `<div class="transaction-date">
                        <p class="transaction-month">${month}</p>
                        <p class="transaction-day">${day}</p>
                    </div>
                    <div class="transaction-description">
                        <p class="transaction-tag">${tag}</p>
                        <p class="transaction-number-account">${account}</p>
                    </div>
                    <div class="transactions-amount">
                        <p class="transaction-amount">${amount} USD</p>
                    </div>`
    let newTransactionRow = document.createElement('li');
    newTransactionRow.classList.add('transaction-item');
    newTransactionRow.innerHTML = (listInnerHTML);
    transactionList.appendChild(newTransactionRow);
}

function createNewWithdraw() {
    createTransactionDate();
    transactionTag = 'withdraw';
    //get amount -> id = transaction-amount
    let transactionAmount = document.getElementById('withdraw-amount').value;
    createNewWithdrawLiItem(transactionDay, transactionMonthString, transactionTag, transactionAmount);
}

function createNewWithdrawLiItem(day, month, tag, amount) {
    let transactionList = document.getElementById('transactions-list');
    let listInnerHTML = `<div class="transaction-date">
                        <p class="transaction-month">${month}</p>
                        <p class="transaction-day">${day}</p>
                    </div>
                    <div class="transaction-description">
                        <p class="transaction-tag">${tag}</p>
                        <p class="transaction-number-account">${cardNumber}</p>
                    </div>
                    <div class="transactions-amount">
                        <p class="transaction-amount">${amount} USD</p>
                    </div>`
    let newTransactionRow = document.createElement('li');
    newTransactionRow.classList.add('transaction-item');
    newTransactionRow.innerHTML = (listInnerHTML);
    transactionList.appendChild(newTransactionRow);
}


function createTransactionDate(){
    transactionDate = new Date();
    transactionDay = transactionDate.getDate();
    transactionMonth = transactionDate.getMonth();
    transactionMonthString = monthNumberToMonthString(transactionMonth);
}

function monthNumberToMonthString(month) {
    switch (month) {
        case 0:
            return 'jan'
        case 1:
            return 'feb'
        case 2:
            return 'mar'
        case 3:
            return 'apr'
        case 4:
            return 'may'
        case 5:
            return 'jun'
        case 6:
            return 'jul'
        case 7:
            return 'aug'
        case 8:
            return 'sep'
        case 9:
            return 'oct'
        case 10:
            return 'nov'
        case 11:
            return 'dic'
        default :
            return 'not valid month'
    }
}

let logOutButton = document.getElementById('logout');
logOutButton.addEventListener('click', logOut);
function logOut() {
    window.location.href = 'login.html'
}


//optionOperationModal possible id's: transfer modal, deposit modal, withdraw modal
/* ----- DUDA PARA HACERLO CON UNA FUNCIÓN ------
document.getElementById('transfer-option').addEventListener('click', openModal(transfer-modal));
function openModal(optionOperationModal) {
    document.getElementById('optionOperationModal').style.display = 'block';
}*/