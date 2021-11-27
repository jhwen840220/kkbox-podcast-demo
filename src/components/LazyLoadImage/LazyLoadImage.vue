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
        scrollRef: {
            type: [String, Object],
            default: null,
        },
    },
    setup(props) {
        const { scrollRef } = props;
        const imgRef = ref(null);
        const imgSrc = ref(kkboxLogo);

        function changeImgSrc(src) {
            imgSrc.value = src;
        }

        onMounted(() => {
            if (props.src) {
                if ("IntersectionObserver" in window) {
                    let scrollport = null;
                    if (scrollRef) {
                        scrollport =
                            typeof scrollRef === "string"
                                ? document.querySelector(scrollRef)
                                : scrollRef;
                    }

                    let observer = new IntersectionObserver(
                        areas => {
                            if (!areas[0].isIntersecting) return;
                            changeImgSrc(props.src);
                        },
                        {
                            root: scrollport,
                        }
                    );
                    observer.observe(imgRef.value);
                } else changeImgSrc(props.src);
            }
        });
        watch(
            () => props.src,
            (val) => {
                if ("IntersectionObserver" in window) {
                    let scrollport = null;
                    if (scrollRef) {
                        scrollport =
                            typeof scrollRef === "string"
                                ? document.querySelector(scrollRef)
                                : scrollRef;
                    }

                    let observer = new IntersectionObserver(
                        areas => {
                            if (!areas[0].isIntersecting) return;
                            changeImgSrc(val);
                        },
                        {
                            root: scrollport,
                        }
                    );
                    observer.observe(imgRef.value);
                } else changeImgSrc(val);
            }
        );

        return {
            imgRef,
            imgSrc,
        };
    },
};
</script>
