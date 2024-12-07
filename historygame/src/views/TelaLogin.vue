<template>
    <body>
    <div>

        <h1>Login</h1>
        <p1>Email</p1>
        <br><br>
        <input type="text" placeholder="Email">
        <br><br>
        <p2>Senha</p2>
        <br><br>
        <input type="password" placeholder="Senha">
        <br><br>
        <button>Log in</button>
        <br><br>
        <p3><a href="TelaRegistro.html">Esqueceu a Senha? </a></p3>

        

    </div>
</body>
</template>

<script> 
 export default {
        name: 'TelaLogin'
    }

</script>

<style>   
body{
font-family: Arial, Helvetica, sans-serif;
background-image : white
}
div{
    background-color: black;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 80px;
    border-radius: 15px;
    color: white;

}
input{
    padding: 15px;
    border: none;
    outline: none;
    font-size: 15px;
}   

button{
    background-color: white;
    border: none;
    padding: 15px;
    white-space: 100%;
    width: 100%;
    border-radius: 10px;
}
button:hover{
    background-color: gray;
    cursor: pointer;

} 

</style>