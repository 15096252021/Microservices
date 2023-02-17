import { onBeforeMount, onMounted, Ref, UnwrapRef } from "vue";

export function showLoading(loading:Ref<boolean>){
  onMounted(() => {
    loading.value = false;
  })
  onBeforeMount(() => {
    loading.value = true;
  })
}