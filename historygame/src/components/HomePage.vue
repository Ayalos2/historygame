<template>
    <HeaderTemplate />

    <FooterTemplate />
</template>

<script>
    import FooterTemplate from '../views/FooterTemplate.vue';
    import HeaderTemplate from '../views/HeaderTemplate.vue'

    export default {
        name: 'HomePage',
        components: {
            HeaderTemplate, FooterTemplate
        }
    }
</script>
