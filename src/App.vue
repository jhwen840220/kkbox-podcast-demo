<template>
    <MainLayout />
</template>

<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";

import MainLayout from "~layouts/MainLayout";
export default {
    name: "App",
    components: {
        MainLayout,
    },
    setup(props, { attrs }) {
        const store = useStore();

        onMounted(() => {
            store.dispatch("getChannelData");
        });

        return {
            
        }
    },
};
</script>
