<template>
    <HeaderTemplate />
    <h1>favoritos</h1>
    <FooterTemplate />
</template>

<script>
import FooterTemplate from '@/components/FooterTemplate.vue';
import HeaderTemplate from '@/components/HeaderTemplate.vue';

    export default {
        name: 'FavoritosPage',
        components :{
            HeaderTemplate,FooterTemplate
        }
    }
</script>


<style scoped>

</style>