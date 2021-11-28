import { createStore } from "vuex";
import axios from "axios";
import { replaceCDATA } from "~utils";

const store = createStore({
    state() {
        return {
            channelInfo: {
                name: "",
                imgSrc: "",
            },
            episodeList: null,
            episodeInfo: {},
            isRestart: false,
        };
    },
    getters: {
        channelInfo: state => state.channelInfo,
        episodeList: state => state.episodeList,
        episodeInfo: state => state.episodeInfo,
        isRestart: state => state.isRestart,
    },
    actions: {
        getChannelData(context) {
            axios
                .get(
                    "https://feeds.soundon.fm/podcasts/954689a5-3096-43a4-a80b-7810b219cef3.xml",
                    {
                        crossDomain: true,
                    }
                )
                .then(response => response.data)
                .then(str =>
                    new window.DOMParser().parseFromString(str, "text/xml")
                )
                .then(data => {
                    const channelInfo = {
                        name: replaceCDATA(
                            data.querySelector("title").innerHTML
                        ),
                        imgSrc: data.querySelector("image url").innerHTML,
                    };

                    const episodeList = new Map();
                    Array.from(data.querySelectorAll("item")).forEach(el => {
                        episodeList.set(
                            replaceCDATA(el.querySelector("guid").innerHTML),
                            {
                                title: replaceCDATA(
                                    el.querySelector("title").innerHTML
                                ),
                                desc: replaceCDATA(
                                    el
                                        .querySelector("description")
                                        .innerHTML.replace(/\n/g, "<br/>")
                                ),
                                pubDate: replaceCDATA(
                                    el.querySelector("pubDate").innerHTML
                                ),
                                imgSrc: replaceCDATA(
                                    el
                                        .getElementsByTagName("itunes:image")[0]
                                        .getAttribute("href")
                                ),
                                duration: replaceCDATA(
                                    el.getElementsByTagName(
                                        "itunes:duration"
                                    )[0].innerHTML
                                ),
                                audioSrc: replaceCDATA(
                                    el
                                        .querySelector("enclosure")
                                        .getAttribute("url")
                                ),
                            }
                        );
                    });
                    context.commit("SET_CHANNEL_DATA", {
                        channelInfo,
                        episodeList,
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
    },
    mutations: {
        SET_CHANNEL_DATA(state, payload) {
            const { channelInfo, episodeList } = payload;
            state.channelInfo = channelInfo;
            state.episodeList = episodeList;
        },
        SET_EPISODE_INFO(state, payload) {
            state.episodeInfo = payload;
        },
        SET_IS_RESTART(state, payload) {
            state.isRestart = payload;
        },
    },
});

export default store;
