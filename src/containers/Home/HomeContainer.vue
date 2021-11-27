<template>
    <div
        ref="channelInfoRef"
        :class="[$style.observer, 'position-absolute']"
    ></div>
    <section
        :class="[
            $style['channel-section'],
            'p-md d-flex',
            shouldchannelInfoSticky
                ? [
                      $style['channel-section-small'],
                      'position-sticky p-t-md align-items-center',
                  ]
                : ['align-items-end'],
        ]"
    >
        <div
            :class="[
                $style['channel-logo'],
                shouldchannelInfoSticky ? [$style['channel-logo-small']] : [],
            ]"
        >
            <LazyLoadImage
                :src="channelInfo.imgSrc"
                :alt="channelInfo.name"
                :width="shouldchannelInfoSticky ? 75 : 150"
                :height="shouldchannelInfoSticky ? 75 : 150"
            />
        </div>
        <p class="m-l-md m-b-xs fz-30 fz-bold">{{ channelInfo.name }}</p>
    </section>
    <EpisodeList :shouldchannelInfoSticky="shouldchannelInfoSticky" />
</template>
<script>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { setIntersectionObserver } from "~utils";
import EpisodeList from "~containers/Home/components/EpisodeList";
import LazyLoadImage from "~components/LazyLoadImage/LazyLoadImage";

export default {
    name: "HomeContainer",
    components: {
        EpisodeList,
        LazyLoadImage,
    },
    setup() {
        const store = useStore();

        const shouldchannelInfoSticky = ref(false);
        const channelInfoRef = ref(null);

        onMounted(() => {
            setIntersectionObserver({
                target: channelInfoRef.value,
                callback: areas => {
                    shouldchannelInfoSticky.value = !(
                        areas[0].intersectionRatio > 0.5
                    );
                },
                options: {
                    root: null,
                    threshold: 0.5,
                },
            });
        });
        return {
            channelInfoRef,
            shouldchannelInfoSticky,
            channelInfo: computed(() => store.state.channelInfo),
        };
    },
};
</script>

<style module src="./Home.scss" />
