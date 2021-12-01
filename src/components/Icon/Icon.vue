<template>
    <svg
        :view-box="file.viewBox"
        :width="svgSize.width"
        :height="svgSize.height"
        :fill="fill"
        :aria-label="title"
        :class="svgClass"
    >
        <title v-if="title">{{ title }}</title>
        <use :xlink:href="`#${file.id}`" />
    </svg>
</template>

<script>
import { ref, reactive, onMounted, watch, toRef } from "vue";

const defaultWidth = 20;
const defaultHeight = 20;

export default {
    name: "Icon",
    props: {
        name: {
            type: String,
            default: "",
        },
        width: {
            type: [String, Number],
            default: null,
        },
        height: {
            type: [String, Number],
            default: null,
        },
        fill: {
            type: String,
            default: "",
        },
        title: {
            type: String,
            default: "",
        },
        svgClass: {
            type: String,
            default: "",
        },
    },
    setup(props) {
        const { width, height } = props;
        const name = toRef(props, "name");
        const file = ref({});

        onMounted(() => {
            import(
                /* webpackChunkName: "IconSVG" */
                /* webpackMode: "eager" */
                `~svg/${name.value}.svg`
            ).then(res => (file.value = res.default));
        });
        watch(name, val => {
            import(
                /* webpackChunkName: "IconSVG" */
                /* webpackMode: "eager" */
                `~svg/${val}.svg`
            ).then(res => (file.value = res.default));
        });
        const svgSize = reactive({
            width,
            height,
        });

        watch(file, val => {
            if (val.viewBox) {
                const viewBoxArr = val.viewBox.split(" ");
                svgSize.width = width || (viewBoxArr.length >= 3 ? viewBoxArr[2] : defaultWidth);
                svgSize.height = height || (viewBoxArr.length >= 4 ? viewBoxArr[3] : defaultHeight);
            }
        });

        return {
            file,
            svgSize,
        };
    },
};
</script>
