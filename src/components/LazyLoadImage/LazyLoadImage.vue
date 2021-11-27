<template>
    <img
        ref="imgRef"
        :src="imgSrc"
        :alt="alt"
        :width="width"
        :height="height"
    />
</template>

<script>
import { ref, onMounted, watch } from "vue";
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
        const imgRef = ref(null);
        const imgSrc = ref(kkboxLogo);

        const setLazyLoad = src => {
            setIntersectionObserver({
                target: imgRef.value,
                callback: areas => {
                    if (!areas[0].isIntersecting) return;
                    imgSrc.value = src;
                },
                fallback: () => {
                    imgSrc.value = src;
                },
            });
        };
        onMounted(() => {
            if (props.src) {
                setLazyLoad(props.src);
            }
        });
        watch(
            () => props.src,
            val => {
                setLazyLoad(val);
            }
        );

        return {
            imgRef,
            imgSrc,
        };
    },
};
</script>
