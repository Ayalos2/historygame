<template>
    <HeaderTemplate />
    <h1>Home</h1>
    <FooterTemplate />
</template>

<script>
    import FooterTemplate from '../components/FooterTemplate.vue';
    import HeaderTemplate from '../components/HeaderTemplate.vue';

    export default {
        name: 'HomePage',
        components: {
            HeaderTemplate, FooterTemplate
        }
    }
</script>
