import Vue from "vue";
import Modal from "@/modals/modal.vue";
import { Vue as VueType, VueConstructor } from "vue/types/vue";

export const modalService = {
  open({
    title = "",
    component = "p",
    buttons = {},
    data = {},
    dismissable = true
  }: {
    title?: string;
    component?: string | VueConstructor<VueType>;
    buttons?: {
      confirm?: string;
      cancel?: string;
    };
    data?: object;
    dismissable?: boolean;
  } = {}) {
    return new Promise(resolve => {
      // const InnerComponent = Vue.extend(component).extend({
      //   props: {
      //     showDialog: Boolean,
      //     modalData: Object
      //   },
      //   methods: {
      //     closeModal(data) {
      //       this.$emit("update:showDialog", false);
      //       resolve(data);
      //     }
      //   }
      // });

      // const resolvePromiseWith = data => {
      //   resolve(data);
      // };

      const ModalComponent = Vue.component("modal-component", {
        // data() {
        //   return {
        //     showDialog: true,
        //     modalData: data,
        //     title,
        //     buttons,
        //     dismissable,
        //   };
        // },
        // components: {
        //   InnerComponent
        // },
        methods: {},
        render(createElement) {
          return createElement(
            Modal,
            {
              props: {
                showDialog: true,
                modalData: data,
                title,
                buttons,
                dismissable,
                resolvePromiseWith
              },

              scopedSlots: {
                default: function(props) {
                  return createElement(component);
                }
              }
              // components: {
              //   InnerComponent
              // }
            },
            []
          );
        },

        created() {}
      });

      const modalComponent = new ModalComponent();

      modalComponent.$mount();

      document
        .querySelector("#modal-container")
        .appendChild(modalComponent.$el);
    });
  }
};
