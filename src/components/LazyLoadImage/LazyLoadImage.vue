<template>
    <img :ref="el => (imgInfo.ref = el)" :src="imgInfo.src" :alt="alt" :width="width" :height="height" />
</template>

<script>
import { reactive, onMounted, watch, toRef } from "vue";
import { setIntersectionObserver } from "~utils";
import kkboxLogo from "~images/kkbox.png";
export default {
    name: "LazyLoadImage",
    props: {
        src: {
            type: String,
            default: "",
        },
        alt: {
            type: String,
            default: "",
        },
        width: {
            type: [String, Number],
            default: "100%",
        },
        height: {
            type: [String, Number],
            default: "100%",
        },
    },
    setup(props) {
        const src = toRef(props, "src");
        const imgInfo = reactive({
            ref: null,
            src: kkboxLogo,
        });

        const setLazyLoad = () => {
            setIntersectionObserver({
                target: imgInfo.ref,
                callback: areas => {
                    if (!areas[0].isIntersecting) return;
                    imgInfo.src = src;
                },
                fallback: () => {
                    imgInfo.src = src;
                },
            });
        };

        onMounted(() => {
            src.value && setLazyLoad();
        });
        watch(src, val => {
            val && setLazyLoad();
        });

        return {
            imgInfo,
        };
    },
};
</script>
