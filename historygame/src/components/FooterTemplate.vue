<template>
<footer class="footer">
    <hr class="top-line">
    <div class="social-icons">
        <a href="#"><img src="../assets/x-social-media-black-icon.png" alt="X"></a>
        <a href="#"><img src="../assets/black-instagram-icon.png" alt="Instagram"></a>
        <a href="#"><img src="../assets/youtube-icon.png" alt="YouTube"></a>
        <a href="#"><img src="../assets/linkedin-square-icon.png" alt="LinkedIn"></a>
    </div>
    <p class="copyright">© 2024 History Games. Todos os Direitos Reservados.</p>
</footer>


</template>

<script>
    export default {
        name: 'FooterTemplate'
    }
</script>

<style scoped>
.footer {
    background-color: white;
    color: black;
    text-align: left;
    position: relative;
}

.top-line {
    border: none;
    height: 1px;
    background-color: black;
    margin-bottom: 10px;
    width: 100%;
}

.social-icons {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 10px;
}

.social-icons a {
    margin: 0 10px 0 0;
    display: inline-block;
}

.social-icons img {
    width: 24px;
    height: 24px;
}

.copyright {
    font-size: 14px;
}

</style>