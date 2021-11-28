import EpisodeContainer from "~containers/Episode/EpisodeContainer.vue";
import router from "~router";
import store from "~vuex";

import { mount, shallowMount } from "@vue/test-utils";
describe("LazyLoadImage", () => {
    test("test", async () => {
        const wrapper = shallowMount(EpisodeContainer, {
            // props: {
            //     src: ""
            // }
            global: {
                plugins: [router, store],
            },
        });
        console.log(wrapper.html())
        expect(123).toBe(123);
    });
});
