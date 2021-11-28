import LazyLoadImage from "~components/LazyLoadImage/LazyLoadImage.vue";
// import router from "~router";
// import store from "~vuex";

import { mount, shallowMount } from "@vue/test-utils";
describe("LazyLoadImage", () => {
    test("test", async () => {
        const wrapper = mount(LazyLoadImage, {
            // props: {
            //     src: ""
            // }
            // global: {
            //     plugins: [router, store],
            // },
        });
        console.log(wrapper.html())
        expect(123).toBe(123);
    });
});
