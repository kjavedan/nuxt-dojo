<template>
  <div class="container">
    <div v-if="!error" class="tcplayer">
      <video
        ref="playerRef"
        id="player-container-id"
        preload="auto"
        playsinline
        webkit-playsinline
        autoplay
        muted
      ></video>
    </div>
    <div v-else class="error-message">d</div>
  </div>
  <button class="btn" @click="handleClick">next page</button>
  <div class="results">
    <div v-for="record in data.records" :key="record.id">
      <pre>{{ record.startTime }}</pre>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, onMounted, onUnmounted, ref, toRefs, watch } from "vue";
const pageNum = ref(1);

//api

const handleFetch = () => {
  const { data } = useFetch("/gameResults", {
    method: "post",
    body: { area: "thai01", pageNum: pageNum.value, pageSize: 20 },
  });
  return data;
};

const data = handleFetch();

console.log(data.value);

const handleClick = () => {
  pageNum.value++;
  handleFetch();
};
//emits
const emit = defineEmits(["checkLive"]);

//props
const props = defineProps(["streamName"]);
const { streamName } = toRefs(props);

//refs
const playerRef = ref(null);
const isLoading = ref(true);
const player = ref(null);
const error = ref(null);

//funcs
const initializePlayer = () => {
  error.value = false;
  isLoading.value = true;

  player.value = TCPlayer("player-container-id", {
    sources: [
      {
        src: `webrtc://bot.x55live.vip/live/thai01?tabr_bitrates=P1080,P720,P540,P270&tabr_start_bitrate=P270&tabr_control=auto`,
      },
    ],
    language: "en",
  });
  player.value.play();

  player.value.on("error", (err) => {
    error.value = true;
    isLoading.value = false;
    console.log("Error occurred:", err);
  });

  player.value.on("playing", () => {
    error.value = false;
    isLoading.value = false;
  });
};

const handleIsLiveAvailable = () => {
  emit("checkLive", !error.value, isLoading.value);
};

//hooks
onMounted(() => {
  initializePlayer();
});

onUnmounted(() => {
  onDestroy();
});

const onDestroy = () => {
  if (player.value) {
    player.value.dispose();
    player.value = null;
  }
};

// Watch for URL changes and update player source
watch(streamName, (newStreamName, oldStreamName) => {
  if (newStreamName !== oldStreamName && player.value) {
    player.value.src(
      `webrtc://bot.x55live.vip/live/${streamName.value}?tabr_bitrates=P1080,P720,P540,P270&tabr_start_bitrate=P270&tabr_control=auto`
    );
    error.value = false;
    isLoading.value = true;
  }
});

watch([error, isLoading], () => {
  handleIsLiveAvailable();
});
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  height: 100% !important;
  // border: solid 2px green;
  min-height: 170px;

  .tcplayer {
    position: relative;
    width: 100%;
    height: fit-content;

    video {
      position: relative;
      height: 100%;
      // border: solid 2px yellow;
    }
  }

  .error-message {
    position: relative;
    min-height: 170px;

    text-wrap: nowrap;

    text-align: center;
  }
}
</style>
