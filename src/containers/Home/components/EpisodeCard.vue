<template>
    <div :class="[$style['episode-card'], 'm-b-md p-md d-flex']">
        <LazyLoadImage :src="imgSrc" :alt="title" width="75" height="75" />
        <div class="m-l-md">
            <p class="fz-16 fz-bold">{{ title }}</p>
            <p class="m-t-lg fz-14">{{ pubDatetime }} · 總長度: {{ episodeDuration }}</p>
            
        </div>
    </div>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
import dayjs from "dayjs";
import { getAudioTime } from "~utils";
import LazyLoadImage from "~components/LazyLoadImage/LazyLoadImage";

export default {
    name: "EpisodeCard",
    props: {
        title: {
            type: String,
            default: "",
        },
        pubDate: {
            type: String,
            default: "",
        },
        imgSrc: {
            type: String,
            default: "",
        },
        duration: {
            type: String,
            default: "",
        },
    },
    components: {
        LazyLoadImage,
    },
    setup(props) {
        const store = useStore();
        return {
            channelInfo: computed(() => store.state.channelInfo),
            episodeDuration: computed(() => getAudioTime(props.duration)),
            pubDatetime: computed(() =>
                dayjs(props.pubDate).format("YYYY-MM-DD")
            ),
        };
    },
};
</script>

<style module src="./EpisodeCard.scss" />
