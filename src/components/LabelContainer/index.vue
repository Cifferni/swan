<template>
  <div :class="css.container">
    <div :class="css.title">{{ title }}</div>
    <slot :class="css.slot"></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// 定义常量类名
const CONTAINER_CLASSES = {
  default: ['overflow-hidden', 'flex', 'mb-3'],
  top: ['flex-col'],
  left: ['flex-row', 'justify-between', 'items-center', 'mt-2', 'mb-2'],
}

const TITLE_CLASSES = {
  default: ['text-sm', 'font-semibold'],
  top: ['mt-1', 'mb-1'],
  left: [],
}

const SLOT_CLASSES = ['w-full']

// 定义枚举
enum TitlePosition {
  top = 'top',
  left = 'left',
}

// 定义组件选项
defineOptions({
  name: 'LabelContainer',
})

// 定义 props 并提供默认值
const props = withDefaults(
  defineProps<{
    title?: string
    titlePosition?: 'top' | 'left'
  }>(),
  {
    title: '',
    titlePosition: TitlePosition.top,
  },
)

// 计算类名
const css = computed(() => {
  const position = props.titlePosition
  return {
    container: [...CONTAINER_CLASSES.default, ...CONTAINER_CLASSES[position]],
    title: [...TITLE_CLASSES.default, ...TITLE_CLASSES[position]],
    slot: SLOT_CLASSES,
  }
})
</script>

<style scoped lang="scss"></style>
