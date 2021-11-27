<template>
    <svg
        :view-box="file.viewBox"
        :width="svgWidth"
        :height="svgHeight"
        :fill="fill"
        :aria-label="title"
        :class="svgClass"
    >
        <title v-if="title">{{ title }}</title>
        <use :xlink:href="`#${file.id}`" />
    </svg>
</template>

<script>
import { ref, onMounted, watch } from "vue";

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
        const { name, width, height } = props;
        const file = ref({});

        onMounted(() => {
            import(
                /* webpackChunkName: "IconSVG" */
                /* webpackMode: "eager" */
                `~svg/${name}.svg`
            ).then(res => (file.value = res.default));
        })
        watch(
            () => props.name,
            (val) => {
                import(
                    /* webpackChunkName: "IconSVG" */
                    /* webpackMode: "eager" */
                    `~svg/${val}.svg`
                ).then(res => (file.value = res.default));
            }
        );

        const svgWidth = ref(width);
        const svgHeight = ref(height);

        watch(file, (val) => {
            if (val.viewBox) {
                const viewBoxArr = val.viewBox.split(" ");
                svgWidth.value =
                    width ||
                    (viewBoxArr.length >= 3 ? viewBoxArr[2] : defaultWidth);
                svgHeight.value =
                    height ||
                    (viewBoxArr.length >= 4 ? viewBoxArr[3] : defaultHeight);
            }
        });

        return {
            file,
            svgWidth,
            svgHeight,
        };
    },
};
</script>
