<template>
    <header class="cabeca">
        <img src="../assets/logo.png" alt="Logo" class="logo">
        <nav>
            <ul>
            <li><router-link to="/">Inicial</router-link></li>
            <li><router-link to="/jogos">Jogos</router-link></li>
            <li><router-link to="/favoritos">Favoritos</router-link></li>
            <li><router-link to="/sobre">Sobre</router-link></li>
            </ul>
        </nav>
        <button class="login"><router-link to="/login">Entrar</router-link></button>
        <button class="registrar"><router-link to="/registro">Registrar</router-link></button>
    </header>
</template>

<script>
    export default {
        name: 'HeaderTemplate'
    }
</script>


<style scoped>
.cabeca {
    background-color: black;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    flex-wrap: wrap;
    margin-top: -10px;
    margin-left: -5px;
    margin-right: -5px;
}

.logo {
    width: 80px;
    margin-left: 150px;
}

nav {
    flex-grow: 1;
    text-align: center;
}

nav ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
}

nav ul li {
    margin: 0 15px;
}

nav ul li a {
    text-decoration: none;
    color: white;
}

button.login {
    background-color: white;
    color: black;
    border: none;
    padding: 10px 20px;
    margin-right: 10px;
    cursor: pointer;
    border-radius: 10px;
}

button.registrar {
    background-color: black;
    color: white;
    border: 1px solid white;
    padding: 10px 20px;
    margin-right: 150px;
    cursor: pointer;
    border-radius: 10px;
}
button.login:hover, button.registrar:hover{
    opacity: 0.7;
}

/* Responsividade */
@media (max-width: 768px) {
    nav ul {
        flex-direction: column;
    }

    button {
        margin-top: 10px;
    }

    .logo {
        margin-left: 0;
    }

    nav {
        text-align: center;
        margin-top: 10px;
    }

    .cabeca {
        flex-direction: column;
        align-items: flex-start;
    }
}
</style>