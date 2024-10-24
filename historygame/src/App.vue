<template>
  <HeaderTemplate />
  <router-view />
  <FooterTemplate />
</template>

<script>
    import HeaderTemplate from '@/components/HeaderTemplate.vue';
    import FooterTemplate from '@/components/FooterTemplate.vue';
    export default {
        components: {
            HeaderTemplate,FooterTemplate
        }
    }

</script>

