<template>
    <div :class="[$style['btn'], $style['btn-primary'], 'p-x-lg p-y-xs d-flex align-items-center justify-content-centet fz-16']">
        <Icon
            v-if="svgIconName"
            :name="svgIconName"
            svgClass="m-r-xs"
        />
        {{ text }}
    </div>
</template>

<script>
import Icon from "~components/Icon/Icon";

export default {
    name: "Button",
    props: {
        svgIconName: {
            type: String,
            default: ""
        },
        text: {
            type: String,
            default: "",
        },
    },
    components: {
        Icon
    }
};
</script>

<style module src="./Button.scss" />
