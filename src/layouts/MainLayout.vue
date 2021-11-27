<template>
    <header
        :class="[
            $style.header,
            'position-fixed p-sm d-flex align-items-center',
        ]"
    >
        <router-link to="/" class="d-flex"
            ><Icon
                name="kkbox-logo-svgo"
                width="70"
                height="15.68"
                :svg-class="$style.logo"
        /></router-link>
        <span class="m-l-xs fz-bold fz-16">podcast</span>
    </header>
    <main :class="[$style.body, 'position-relative p-x-md']">
        <router-view></router-view>
    </main>
    <PlayerSection />
</template>

<script>
import PlayerSection from "~components/PlayerSection/PlayerSection";
import Icon from "~components/Icon/Icon";

export default {
    name: "MainLayout",
    components: {
        PlayerSection,
        Icon,
    },
};
</script>

<style module src="./MainLayout.scss" />
