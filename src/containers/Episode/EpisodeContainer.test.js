import EpisodeContainer from "~containers/Episode/EpisodeContainer.vue";
import router from "~router";
import store from "~vuex";

import { mount, shallowMount } from "@vue/test-utils";
describe("EpisodeContainer", () => {
    test("click play button", async () => {
        const wrapper = mount(EpisodeContainer, {
            global: {
                plugins: [router, store],
            },
        });
        expect(wrapper.find('[data-test="play-btn"]').text()).toBe("播放");
        await wrapper.get('[data-test="play-btn"]').trigger('click')
        expect(wrapper.find('[data-test="play-btn"]').text()).toBe("重新播放");
    });
});
