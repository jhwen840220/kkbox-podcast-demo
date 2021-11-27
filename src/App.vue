<template>
    <MainLayout />
</template>

<script>
import { onMounted } from "vue";
import { useStore } from "vuex";

import MainLayout from "~layouts/MainLayout";
export default {
    name: "App",
    components: {
        MainLayout,
    },
    setup() {
        const store = useStore();
        onMounted(() => {
            store.dispatch("getChannelData");
        });

        return {
        }
    },
};
</script>
