<template>
    <div v-if="hasEpisodeInfo">
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
                    shouldEpisodeInfoSticky
                        ? [$style['episode-logo-small']]
                        : [],
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
                data-test="play-btn"
                :class="[
                    shouldEpisodeInfoSticky ? 'm-t-md' : 'm-b-sm',
                    'm-l-xl',
                ]"
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
    </div>
    <EmptyEpisode v-else />

</template>
<script>
import { ref, onMounted, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { setIntersectionObserver } from "~utils";

import EmptyEpisode from "~containers/Episode/components/EmptyEpisode";
import LazyLoadImage from "~components/LazyLoadImage/LazyLoadImage";
import Button from "~components/Button/Button";
export default {
    name: "EpisodeContainer",
    components: {
        EmptyEpisode,
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

        const episodeList = computed(() => store.getters.episodeList);
        const episodeInfo = computed(() => store.getters.episodeInfo);
        const hasEpisodeInfo = ref(true);

        const detectEpisodeInfo = () => {
            const episodeData = episodeList.value.get(route.params.id);
            if (!episodeData) {
                hasEpisodeInfo.value = false;
            } else {
                currentEpisodeInfo.value = episodeData;

                const metaTitle = Array.from(episodeList.value).find(
                    episode => {
                        return episode[0] == route.params.id;
                    }
                )[1].title;

                window.document.title = `${metaTitle} | KKBOX podcast`;
            }
        };
        onMounted(() => {
            document.body.scrollTop = 0;
            setIntersectionObserver({
                target: episodeInfoRef.value,
                callback: areas => {
                    shouldEpisodeInfoSticky.value = !(
                        areas[0].intersectionRatio > 0.5
                    );
                },
                options: {
                    root: null,
                    threshold: 0.5,
                },
            });

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
            channelInfo: computed(() => store.getters.channelInfo),
            hasEpisodeInfo,
            isCurrentEpisode,
            onTogglePlay,
        };
    },
};
</script>

<style module src="./Episode.scss" />
