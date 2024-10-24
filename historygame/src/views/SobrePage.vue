<template>
    <HeaderTemplate />
    <h1>Sobre</h1>
    <FooterTemplate />
</template>

<script>
    import FooterTemplate from '../components/FooterTemplate.vue';
    import HeaderTemplate from '../components/HeaderTemplate.vue';

    export default {
        name: 'SobrePage',
        components: {
            HeaderTemplate, FooterTemplate
        }
    }
</script>
