<template>
    <div
        :class="[
            $style['empty-episode'],
            'd-flex flex-column align-items-center justify-content-center',
        ]"
    >
        <p class="fz-24 fz-bold">很抱歉，並未找到匹配的集數</p>
        <router-link to="/"
            ><Button class="m-t-lg" text="回首頁"
        /></router-link>
    </div>
</template>

<script>
import Button from "~components/Button/Button";

export default {
    name: "EmptyEpisode",
    components: {
        Button,
    },
    setup() {
        return {};
    },
};
</script>

<style module src="./EmptyEpisode.scss" />
