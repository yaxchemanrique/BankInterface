const client = [
    {
        firstName: 'Abigail',
        lastName: 'Allan',
        username: 'aallan',
        password: '1234',
        balance: 300.00,
        cardNumber: '1234 1234 1234 1234'
    },
    {
        firstName: 'David',
        lastName: 'Avery',
        username: 'davery',
        password: '5678',
        balance: 500.00,
        cardNumber: '1234 5678 1234 5678'
    },
    {
        firstName: 'Dominic',
        lastName: 'Ball',
        username: 'dball',
        password: '9012',
        balance: 430.00,
        cardNumber: '1234 9123 1234 9123'
    },
    {
        firstName: 'Faith',
        lastName: 'Clarkson',
        username: 'fclarkson',
        password: '3456',
        balance: 780.00,
        cardNumber: '1234 4567 1234 4567'
    },
    {
        firstName: 'Elizabeth',
        lastName: 'Graham',
        username: 'egraham',
        password: '7890',
        balance: 445.00,
        cardNumber: '1234 8901 1234 8901'
    },
];

function validateLogin() {
    let inputUsername = document.getElementById('username').value ;
    let inputPassword = document.getElementById('password').value ;
    let indexOfUsernameInput = client.findIndex(client => client.username == inputUsername);

    validateFilledLoginInfo(inputUsername, inputPassword);

    if (indexOfUsernameInput >= 0) {  
        let correctPassword = client[indexOfUsernameInput].password;
        if (correctPassword == inputPassword) {
            window.location.href = 'account.html?index='+ indexOfUsernameInput;
        } else {
            document.getElementById('error-text-password').style.display = 'inline';
            document.getElementById('password').classList.add('error-input');
        }
    } else {
        document.getElementById('error-text-username').style.display = 'inline';
            document.getElementById('username').classList.add('error-input');
    }
}

function validateFilledLoginInfo(username, password) {
    if(username == '') {
        document.getElementById('error-text-password').style.display = 'inline';
        document.getElementById('password').classList.add('error-input');
    }
    if (password == '') {
        document.getElementById('error-text-password').style.display = 'inline';
        document.getElementById('password').classList.add('error-input');
    }
}

document.getElementById('log-in-button').addEventListener('click', validateLogin)