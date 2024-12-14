<template>

   <!-- Seção "Quem somos" -->
     <section class="SobrePage-container" > <h1>Quem somos</h1> 
        <p> Este site foi criado com carinho para pessoas que, assim como nós, compartilham uma paixão inabalável por videogames! 
            Nosso propósito é reunir jogadores de todas as idades, estilos e níveis de experiência em um espaço único, 
            onde a paixão pelos games transcende gerações. Aqui, acreditamos que cada jogador tem uma história para contar e que cada jogo
            é uma aventura esperando para ser compartilhada.
            Queremos conectar comunidades de gamers, promovendo a interação, a troca de experiências e o fortalecimento dos laços entre aqueles 
            que amam explorar mundos virtuais. Este é o lugar ideal para você registrar suas opiniões, compartilhar momentos inesquecíveis e 
            discutir as emoções que os games despertam. Além disso, nossa plataforma serve como um guia para ajudar outros jogadores em sua busca 
            por novos desafios, recomendando títulos que possam se transformar em suas próximas grandes aventuras.
            Nosso objetivo é proporcionar uma experiência completa e envolvente, onde você se sinta parte de um universo vibrante, dinâmico e acolhedor,
            repleto de histórias fascinantes, conexões significativas e, claro, muita diversão. Seja um iniciante curioso, um colecionador nostálgico 
            ou um veterano ávido por explorar novas fronteiras, aqui há espaço para todos!
            Convidamos você a mergulhar de cabeça neste mundo de possibilidades e a aproveitar ao máximo cada momento em nosso site. 
            Compartilhe, descubra, interaja e, acima de tudo, divirta-se! Afinal, o universo dos games é infinito, e estamos apenas começando essa jornada juntos. 
            Bem-vindo a um espaço feito para gamers por gamers!

 </p>
             </section>

</template>

<script>
    export default {
        name: 'SobrePage'
    }
</script>

<style scoped>

 nav ul {
  list-style: none;
  display: flex;
  justify-content: space-around;
}

nav ul li {
  display: inline;
}

nav ul li a {
  color: white;
  text-decoration: none;
}

.about {
  padding: 20px;
  margin: 0 auto; 
  text-align: center;
  max-width: 800px
}

.social-media a {
  margin: 0 10px;
}

.about h1 { 
font-size: 38px; 
}

.about p { 
font-size: 30px; 
}

footer { background-color: black; color: 
    white; 
    text-align: center;
     padding: 10px; }



</style>