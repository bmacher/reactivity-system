import { computed } from './computed';
import { ref } from './ref';
import { watchEffect } from './watchEffect';

const count = ref(1);
const message = ref('Hello World!');
const doubledCount = computed(
  () => (count.value <= 2 ? count.value * 2 : message.value),
);

watchEffect(() => console.info(doubledCount.value));

count.value += 1;
count.value += 1;
message.value = '!dlroW olleH';
count.value += 1;
message.value = 'Hello World again!';
