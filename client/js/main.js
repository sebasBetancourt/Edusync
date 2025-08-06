document.addEventListener('DOMContentLoaded', () => {
    
    const form = document.querySelector('form');
    const signInButton = document.querySelector('.button');

    
    signInButton.addEventListener('click', (event) => {
        event.preventDefault(); 

        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        
        if (email === '' || password === '') {
            alert('Por favor, ingrese su correo electrónico y contraseña.');
            return;
        }

        
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userPassword', password);

        
        alert('Inicio de sesión exitoso. Los datos se han guardado en localStorage.');

        form.reset()

    });
});
