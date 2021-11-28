<template>
    <section
        v-if="currentEpisodeList.length"
        :class="shouldchannelInfoSticky ? $style['episode-section-sticky'] : ''"
        ref="episodeListRef"
    >
        <EpisodeCard
            v-for="(episode, index) in currentEpisodeList"
            :key="index"
            :imgSrc="episode.imgSrc"
            :title="episode.title"
            :pubDate="episode.pubDate"
            :duration="episode.duration"
            @click="goToEpisode(episode.episodeId)"
        />
    </section>
</template>

<script>
import {
    ref,
    onMounted,
    onBeforeUnmount,
    computed,
    watch,
    nextTick,
} from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import EpisodeCard from "~containers/Home/components/EpisodeCard";

export default {
    name: "EpisodeList",
    components: {
        EpisodeCard,
    },
    props: {
        shouldchannelInfoSticky: {
            type: Boolean,
            default: false,
        },
    },
    setup() {
        const router = useRouter();
        const store = useStore();

        const goToEpisode = id => {
            router.push({
                path: `/episode/${id}`,
            });
        };

        const episodeList = computed(() => store.state.episodeList);
        const currentCount = ref(0);
        const currentEpisodeList = ref([]);

        // 原始資料格式為 map，需轉換為 array 進行後續操作
        const handleFormatEpisodeList = dataMap => {
            const dataArr = Array.from(dataMap);
            // map 轉 array 格式會變為 [[key], [value]]
            return dataArr.map(data => {
                return {
                    episodeId: data[0], // 以 episodeId 為 key 值，所以取得 index 為 0
                    ...data[1],
                };
            });
        };

        // 初始渲染
        const getCurrentEpisodeList = dataMap => {
            const totalEpisodeList = handleFormatEpisodeList(dataMap);
            currentCount.value =
                totalEpisodeList.length > 20 ? 20 : totalEpisodeList.length;
            currentEpisodeList.value = totalEpisodeList.slice(
                0,
                currentCount.value
            );
        };

        onMounted(() => {
            if (episodeList.value) {
                getCurrentEpisodeList(episodeList.value);
            }
        });
        watch(
            () => episodeList.value,
            val => {
                getCurrentEpisodeList(val);
            }
        );

        const episodeListRef = ref(null);
        const isIncreasingCount = ref(false);

        const onScrollEpisodeList = () => {
            const totalEpisodeList = handleFormatEpisodeList(episodeList.value);

            const episodeCardCount = episodeListRef.value.children.length;

            const lastTwoCard =
                episodeListRef.value.children[episodeCardCount - 2];

            if (
                !isIncreasingCount.value &&
                lastTwoCard.offsetTop - window.pageYOffset < 500 &&
                currentCount.value < totalEpisodeList.length
            ) {
                isIncreasingCount.value = true;
                currentCount.value =
                    currentCount.value +
                    (totalEpisodeList.length - currentCount.value > 20
                        ? 20
                        : totalEpisodeList.length - currentCount.value);

                currentEpisodeList.value = totalEpisodeList.slice(
                    0,
                    currentCount.value
                );
                nextTick(() => {
                    isIncreasingCount.value = false;
                });
            }
        };
        watch(episodeListRef, () => {
            document.addEventListener("scroll", onScrollEpisodeList);
        });

        onBeforeUnmount(() => {
            document.removeEventListener("scroll", onScrollEpisodeList);
        });

        return {
            currentEpisodeList,
            episodeListRef,
            goToEpisode,
        };
    },
};
</script>

<style module src="./EpisodeList.scss" />
