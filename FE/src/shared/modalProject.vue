<template>
  <div>
    <ModalsContainer />
  </div>
  <!--<transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal modal-lg" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
        <header class="modal-header" id="modalTitle">
          <slot name="header"> This is the default title! </slot>
          <button type="button" class="btn-close" @click="close" aria-label="Close modal">
            <span aria-hidden="true">&times;</span>
          </button>
        </header>

        <section class="modal-body">
          <slot name="body"> This is the default body! </slot>
        </section>

        <footer class="modal-footer">
          <slot name="footer"> This is the default footer! </slot>
        </footer>
      </div>
    </div>
  </transition>-->
</template>
<script>
import { ModalsContainer } from 'vue-final-modal'

export default {
  name: 'ModalProject',
  components: {
    ModalsContainer
  }
}
</script>
<style>
/*.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  display: flex;
  margin: auto;
  flex-direction: column;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  cursor: pointer;
  background: transparent;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}*/
</style>
