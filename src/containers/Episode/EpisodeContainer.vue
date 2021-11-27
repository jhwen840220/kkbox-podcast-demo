<template>
    <div
        :class="[$style.observer, 'position-absolute']"
        ref="episodeInfoRef"
    ></div>
    <section
        :class="[
            $style['episode-section'],
            'p-md d-flex',
            shouldEpisodeInfoSticky
                ? [
                      $style['episode-section-small'],
                      'position-sticky p-t-md align-items-center',
                  ]
                : ['align-items-end'],
        ]"
    >
        <div
            :class="[
                $style['episode-logo'],
                shouldEpisodeInfoSticky ? [$style['episode-logo-small']] : [],
            ]"
        >
            <LazyLoadImage
                :src="currentEpisodeInfo.imgSrc"
                :alt="currentEpisodeInfo.title"
                :width="shouldEpisodeInfoSticky ? 75 : 150"
                :height="shouldEpisodeInfoSticky ? 75 : 150"
            />
        </div>
        <div class="m-l-xl m-b-xs">
            <p class="fz-16">{{ channelInfo.name }}</p>
            <p class="fz-30 fz-bold">{{ currentEpisodeInfo.title }}</p>
        </div>
        <Button
            :text="isCurrentEpisode ? '重新播放' : '播放'"
            svgIconName="play-svgo"
            :class="[shouldEpisodeInfoSticky ? 'm-t-md' : 'm-b-sm', 'm-l-xl']"
            @click="onTogglePlay"
        />
    </section>
    <section
        :class="[
            shouldEpisodeInfoSticky ? $style['desc-section-sticky'] : '',
            'p-y-md',
        ]"
    >
        <p class="fz-20 fz-bold">本集介紹</p>
        <article class="m-t-lg" v-html="currentEpisodeInfo.desc" />
    </section>
</template>
<script>
import { ref, onMounted, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

import LazyLoadImage from "~components/LazyLoadImage/LazyLoadImage";
import Button from "~components/Button/Button";
export default {
    name: "EpisodeContainer",
    components: {
        LazyLoadImage,
        Button,
    },
    setup() {
        const route = useRoute();
        const store = useStore();

        const shouldEpisodeInfoSticky = ref(false);
        const episodeInfoRef = ref(null);

        const currentEpisodeInfo = ref({
            title: "",
            desc: "",
            imgSrc: "",
        });
        const episodeList = computed(() => store.state.episodeList);
        const episodeInfo = computed(() => store.state.episodeInfo);

        const detectEpisodeInfo = () => {
            const episodeData = episodeList.value.get(route.params.id);
            currentEpisodeInfo.value = episodeData;

            const metaTitle = Array.from(episodeList.value).find(episode => {
                return episode[0] == route.params.id;
            })[1].title;

            window.document.title = `${metaTitle} | KKBOX podcast`;
        };
        onMounted(() => {
            document.body.scrollTop = 0;
            if ("IntersectionObserver" in window) {
                let scrollport = null;

                let observer = new IntersectionObserver(
                    areas => {
                        shouldEpisodeInfoSticky.value = !(
                            areas[0].intersectionRatio > 0.5
                        );
                    },
                    {
                        root: scrollport,
                        threshold: 0.5,
                    }
                );
                observer.observe(episodeInfoRef.value);
            }

            if (episodeList.value) {
                detectEpisodeInfo();
                isCurrentEpisode.value =
                    episodeInfo.value.episodeId === route.params.id;
            }
        });

        watch(episodeList, () => {
            detectEpisodeInfo();
        });

        const isCurrentEpisode = ref(false);
        const onTogglePlay = () => {
            if (isCurrentEpisode.value) {
                store.commit("SET_IS_RESTART", true);
            } else {
                store.commit("SET_EPISODE_INFO", {
                    ...currentEpisodeInfo.value,
                    episodeId: route.params.id,
                });
                isCurrentEpisode.value =
                    episodeInfo.value.episodeId === route.params.id;
            }
        };

        watch(
            () => episodeInfo.value.episodeId,
            () => {
                isCurrentEpisode.value =
                    episodeInfo.value.episodeId === route.params.id;
            }
        );

        return {
            episodeInfoRef,
            shouldEpisodeInfoSticky,
            currentEpisodeInfo,
            channelInfo: computed(() => store.state.channelInfo),
            isCurrentEpisode,
            onTogglePlay,
        };
    },
};
</script>

<style module src="./Episode.scss" />
