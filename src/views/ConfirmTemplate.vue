<template>
  <div
    class="Confirm__overlay"
    @click="handleClickOverlay"
    id="vueConfirm"
    v-if="isShow"
  >
    <div class="Confirm__container">
      <span class="Confirm__text-grid">
        <h4 v-if="dialog.title" class="Confirm__title">{{ dialog.title }}</h4>
        <p v-if="dialog.message" class="Confirm__text">{{ dialog.message }}</p>
      </span>
      <div class="Confirm-button-grid">
        <button
          class="Confirm-button"
          @click.stop="(e) => handleClick(e, false)"
        >
          {{ dialog.button.no }}
        </button>
        <button
          class="Confirm-button"
          @click.stop="(e) => handleClick(e, true)"
        >
          {{ dialog.button.yes }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { events } from '../utils/events';

export default {
  name: 'Confirm',
  data() {
    return {
      isShow: false,
      dialog: {
        title: '',
        message: '',
        button: {},
        callback: () => {},
      },
      params: {},
    };
  },
  methods: {
    handleClickOverlay({ target }) {
      if (target.id == 'vueConfirm') this.isShow = false;
    },
    handleClick({ target }, confirm) {
      if (target.od == 'vueConfirm') return;
      this.isShow = false;
      if (this.params.callback) {
        this.params.callback(confirm);
      }
    },
    openConfirm(params) {
      this.params = params;
      this.isShow = true;
      Object.entries(params).forEach((param) => {
        if (typeof param[1] == typeof this.dialog[param[0]]) {
          this.dialog[param[0]] = param[1];
        }
      });
    },
  },
  mounted() {
    events.$on('open', this.openConfirm);
    events.$on('close', () => {
      this.handleClickOverlay({ target: { id: 'vueConfirm' } });
    });
  },
};
</script>

<style>
.Confirm__overlay {
  width: 100%;
  height: 100%;
  transition: all 0.1s ease-in;
  left: 0;
  top: 0;
  z-index: 9999999999999;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: baseline;
  background-color: rgba(0, 0, 0, 0.3);
}
.Confirm__container {
  border-radius: 2px;
  padding: 10px;
  box-shadow: #0000004a 0px 3px 8px 0px;
  background-color: #ffff;
  height: auto;
  display: grid;
  grid-template-rows: 1fr max-content;
}
.Confirm__title {
  width: 100%;
  font-weight: 700;
  text-align: center;
  line-height: initial;
  margin-bottom: 5px;
}
.Confirm__text {
  width: 100%;
  text-align: center;
  line-height: initial;
}
.Confirm-button-grid {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  overflow: hidden;
}
.Confirm-button {
  margin: 3px;
}
</style>
