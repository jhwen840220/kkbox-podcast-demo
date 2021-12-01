<template>
    <section
        v-if="currentEpisodeList.data.length"
        :class="shouldchannelInfoSticky ? $style['episode-section-sticky'] : ''"
        ref="episodeListRef"
    >
        <EpisodeCard
            v-for="(episode, index) in currentEpisodeList.data"
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
import { ref, reactive, onMounted, onBeforeUnmount, computed, watch, nextTick } from "vue";
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

        const episodeList = computed(() => store.getters.episodeList);
        const currentEpisodeList = reactive({
            data: [],
            count: 0,
        });

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
            currentEpisodeList.count = Math.min(totalEpisodeList.length, 20);
            currentEpisodeList.data = totalEpisodeList.slice(0, currentEpisodeList.count);
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

            const lastTwoCard = episodeListRef.value.children[episodeCardCount - 2];

            if (
                !isIncreasingCount.value &&
                lastTwoCard.offsetTop - window.pageYOffset < 500 &&
                currentEpisodeList.count < totalEpisodeList.length
            ) {
                isIncreasingCount.value = true;
                currentEpisodeList.count =
                    currentEpisodeList.count + Math.min(totalEpisodeList.length - currentEpisodeList.count, 20);

                currentEpisodeList.data = totalEpisodeList.slice(0, currentEpisodeList.count);
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
