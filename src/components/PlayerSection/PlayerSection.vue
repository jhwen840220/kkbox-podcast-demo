<template>
    <footer
        :class="[
            $style['player-section'],
            'position-fixed p-x-lg p-t-md p-b-md d-flex align-items-center',
        ]"
        v-if="episodeInfo.episodeId"
    >
        <div
            :class="[$style['play-bar'], 'position-absolute']"
            ref="playBarRef"
            @mousedown="onMovePlayBar"
        >
            <div
                :class="[
                    $style['play-bar-current'],
                    isFocusPlayBar ? $style['play-bar-current-focus'] : '',
                    'position-absolute',
                ]"
                ref="currentPlayBarRef"
            />
        </div>

        <Icon
            :class="$style['play-btn']"
            :name="
                isPlaying ? 'pause-with-border-svgo' : 'play-with-border-svgo'
            "
            @click="onTogglePlay"
        />
        <LazyLoadImage
            :src="channelInfo.imgSrc"
            :alt="channelInfo.name"
            :width="45"
            :height="45"
            class="m-l-md"
        />
        <div class="m-l-lg">
            <p class="fz-16 fz-bold">{{ episodeInfo.title }}</p>
            <p>{{ channelInfo.name }}</p>
        </div>
        <div
            v-if="episodeDuration"
            :class="[$style['duration-block'], 'position-absolute']"
        >
            {{ episodeCurrentTime }} / {{ episodeDuration }}
        </div>
    </footer>
    <audio ref="audioRef"></audio>
    <div
        v-if="isBarDragging"
        :class="[$style['bar-dragging-mask'], 'position-fixed']"
    />
</template>

<script>
import { ref, onMounted, onBeforeUnmount, computed, watch } from "vue";
import { useStore } from "vuex";
import { getAudioTime } from "~utils";
import Icon from "~components/Icon/Icon";
import LazyLoadImage from "~components/LazyLoadImage/LazyLoadImage";

export default {
    name: "PlayerSection",
    components: {
        Icon,
        LazyLoadImage,
    },
    setup() {
        const store = useStore();
        const episodeList = computed(() => store.getters.episodeList);
        const episodeInfo = computed(() => store.getters.episodeInfo);
        const isPlaying = ref(false);

        // refs
        const audioRef = ref(null); // 撥放器 ref
        const playBarRef = ref(null); // 整體進度條 ref
        const currentPlayBarRef = ref(null); // 跑動進度條 ref

        const currentEpisodeIndex = ref(null); // 目前集數的 index
        const episodeDuration = ref(""); //
        const episodeCurrentTime = ref("");

        let setEpisodeCurrentTime = null;

        /**
         * @description 取得 audio src 後的一系列事件設定
         * @param { boolean } isUpdateEpisode 是否更新集數
         * @param { boolean } isRestart 是否按「重新播放」
         */
        const setAudio = ({ isUpdateEpisode = true, isRestart = false }) => {
            if (
                isRestart ||
                audioRef.value.getAttribute("src") !==
                    episodeInfo.value.audioSrc
            ) {
                episodeCurrentTime.value = "";
                episodeDuration.value = "";
                audioRef.value.setAttribute("src", episodeInfo.value.audioSrc);
            }
            audioRef.value.oncanplay = () => {
                episodeDuration.value = getAudioTime(audioRef.value.duration);
            };

            audioRef.value.onplay = () => {
                setEpisodeCurrentTime = setInterval(() => {
                    episodeCurrentTime.value = getAudioTime(
                        audioRef.value.currentTime
                    );
                    // 因為會有總長度在會後幾秒會多加的緣故，需多判斷是否需要更改總長度秒數
                    if (
                        audioRef.value.duration &&
                        episodeDuration.value !==
                            getAudioTime(audioRef.value.duration)
                    ) {
                        episodeDuration.value = getAudioTime(
                            audioRef.value.duration
                        );
                    }
                }, 250);
            };

            audioRef.value.onpause = () => {
                clearInterval(setEpisodeCurrentTime);
                setEpisodeCurrentTime = null;
            };
            audioRef.value.ontimeupdate = () => {
                // 如果沒在拖曳進度條的狀態下才可依撥放進度改變長度
                if (!isBarDragging.value) {
                    const { currentTime, duration } = audioRef.value;
                    const playingPresent = `${
                        (currentTime / duration) * document.body.clientWidth
                    }px`;
                    currentPlayBarRef.value.style.transform = `translateX(${playingPresent})`;
                }
            };

            audioRef.value.onended = () => {
                // 結束一集後先改變撥放狀態為「暫停」且清除集數長度
                isPlaying.value = false;

                // 若播放集數非為最後一集，則將 episodeInfo 改為下一集
                if (currentEpisodeIndex.value > 0) {
                    // map 轉 array 格式會變為 [[key], [value]]
                    const nextEpisodeInfo = Array.from(episodeList.value)[
                        currentEpisodeIndex.value - 1
                    ];
                    store.commit("SET_EPISODE_INFO", {
                        ...nextEpisodeInfo[1],          // [1] 為 value
                        episodeId: nextEpisodeInfo[0],  // [0] 為 key
                    });
                }
            };

            if (isUpdateEpisode) {
                // 播放集數與現在不同，就直接重新撥放
                audioRef.value.play();
                isPlaying.value = true;
            } else {
                // 點擊 footer 的撥放鍵切換
                isPlaying.value
                    ? audioRef.value.pause()
                    : audioRef.value.play();
                isPlaying.value = !isPlaying.value;
            }
        };

        onMounted(() => {
            // 進頁面後尋找目前播放的集數 index
            if (!currentEpisodeIndex.value && episodeInfo.value.episodeId) {
                currentEpisodeIndex.value = Array.from(
                    episodeList.value
                ).findIndex(episode => {
                    return episode[0] == episodeInfo.value.episodeId;
                });
            }
        });

        // 換集數 id 的監聽
        watch(
            () => episodeInfo.value.episodeId,
            (val, oldVal) => {
                // 找出目前收聽 episode 的 index
                currentEpisodeIndex.value = Array.from(
                    episodeList.value
                ).findIndex(episode => {
                    return episode[0] == episodeInfo.value.episodeId;
                });

                setAudio({
                    isUpdateEpisode: val !== oldVal,
                });
            }
        );

        const isRestart = computed(() => store.getters.isRestart);
        watch(
            () => isRestart.value,
            val => {
                clearInterval(setEpisodeCurrentTime);
                setEpisodeCurrentTime = null;
                if (val) {
                    setAudio({
                        isRestart: val,
                    });
                    store.commit("SET_IS_RESTART", false);
                }
            }
        );

        const isFocusPlayBar = ref(false);
        watch(playBarRef, val => {
            val.addEventListener("mouseenter", function () {
                isFocusPlayBar.value = true;
            });
            val.addEventListener("mouseleave", function () {
                isFocusPlayBar.value = false;
            });
        });

        const isBarDragging = ref(false); // 是否拖拉進度條當中

        const onMovePlayBar = e => {
            isBarDragging.value = true;

            const setCurrentClientX = e => {
                currentPlayBarRef.value.style.transform = `translateX(${e.clientX}px)`;
            };

            // 首次點擊進度條先跑到點擊位置
            setCurrentClientX(e);

            document.addEventListener("mousemove", setCurrentClientX);
            document.addEventListener("mouseup", function removeMousemove(e) {
                // 不管是否移動，滑到指定x軸就設定位置
                isBarDragging.value = false;
                // 並且 audio 播放指定位置
                if (audioRef.value.duration) {
                    const selectedTime =
                        audioRef.value.duration *
                        (e.clientX >= document.body.clientWidth
                            ? 1
                            : e.clientX / document.body.clientWidth);
                    audioRef.value.currentTime = selectedTime;
                    episodeCurrentTime.value = getAudioTime(selectedTime);
                }

                // 移除相關 event
                document.removeEventListener("mousemove", setCurrentClientX);
                document.removeEventListener("mouseup", removeMousemove);
            });
        };

        onBeforeUnmount(() => {
            audioRef.value.ontimeupdate = null;
            audioRef.value.onended = null;
            clearInterval(setEpisodeCurrentTime);
            setEpisodeCurrentTime = null;
        });

        const onTogglePlay = () => {
            const { episodeId } = episodeInfo.value;
            if (episodeId) {
                setAudio({ isUpdateEpisode: false });
            }
        };

        return {
            isPlaying,
            isBarDragging,
            isFocusPlayBar,
            episodeCurrentTime,
            episodeDuration,
            audioRef,
            playBarRef,
            currentPlayBarRef,
            episodeInfo,
            channelInfo: computed(() => store.getters.channelInfo),
            onMovePlayBar,
            onTogglePlay,
        };
    },
};
</script>

<style module src="./PlayerSection.scss" />
