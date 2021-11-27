<template>
    <section
        v-if="episodeList.length"
        :class="shouldchannelInfoSticky ? $style['episode-section-sticky'] : ''"
        ref="episodeListRef"
    >
        <EpisodeCard
            v-for="(episode, index) in episodeList"
            :key="index"
            :imgSrc="episode[1].imgSrc"
            :title="episode[1].title"
            :pubDate="episode[1].pubDate"
            :duration="episode[1].duration"
            @click="goToEpisode(episode[0])"
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

        const totalEpisodeListMap = computed(() => store.state.episodeList);
        const currentCount = ref(0);
        const episodeList = ref([]);

        onMounted(() => {
            if (totalEpisodeListMap.value) {
                const totalEpisodeList = Array.from(totalEpisodeListMap.value);
                currentCount.value =
                    totalEpisodeList.length > 20 ? 20 : totalEpisodeList.length;
                episodeList.value = totalEpisodeList.slice(
                    0,
                    currentCount.value
                );
            }
        });
        watch(
            () => totalEpisodeListMap.value,
            val => {
                const totalEpisodeList = Array.from(val);
                currentCount.value =
                    totalEpisodeList.length > 20 ? 20 : totalEpisodeList.length;
                episodeList.value = totalEpisodeList.slice(
                    0,
                    currentCount.value
                );
            }
        );

        const episodeListRef = ref(null);
        const isIncreasingCount = ref(false);

        const onScrollEpisodeList = () => {
            const totalEpisodeList = Array.from(totalEpisodeListMap.value);

            const episodeCardCount = episodeListRef.value.children.length;

            const lastTwoCard =
                episodeListRef.value.children[episodeCardCount - 2];

            if (
                !isIncreasingCount.value &&
                lastTwoCard.offsetTop - window.pageYOffset < 500 &&
                currentCount.value < totalEpisodeList.length
            ) {
                isIncreasingCount.value = true;
                currentCount.value = currentCount.value + 20;
                // totalEpisodeList.length - currentCount.value > 20
                //     ? 20
                //     : totalEpisodeList.length - currentCount.value;

                episodeList.value = totalEpisodeList.slice(
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
            episodeList,
            episodeListRef,
            goToEpisode,
        };
    },
};
</script>

<style module src="./EpisodeList.scss" />
