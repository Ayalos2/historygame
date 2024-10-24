<template>
    <HeaderTemplate />
    <h1>Jogos</h1>
    <FooterTemplate />
</template>

<script>
    import FooterTemplate from '../components/FooterTemplate.vue';
    import HeaderTemplate from '../components/HeaderTemplate.vue';

    export default {
        name: 'JogosPage',
        components: {
            HeaderTemplate, FooterTemplate
        }
    }
</script>
