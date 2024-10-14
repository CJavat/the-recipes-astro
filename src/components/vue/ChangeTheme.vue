<template>
  <button @click="changeTheme">
    <img :src="urlImage.src" :alt="urlImage.alt" class="h-fit w-8 md:w-9" />
  </button>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from "vue";

interface urlImage {
  src: string;
  alt: string;
}

const urlImage: urlImage = reactive({
  src: "/moon.svg",
  alt: "Moon logo",
});

onMounted(() => {
  if (
    localStorage.getItem("theme") !== "dark" ||
    !localStorage.getItem("theme")
  ) {
    document.documentElement.classList.remove("dark");
    urlImage.src = "/moon.svg";
    urlImage.alt = "Moon logo";
  } else {
    document.documentElement.classList.add("dark");
    urlImage.src = "/sun.svg";
    urlImage.alt = "Sun logo";
  }
});

const changeTheme = () => {
  if (localStorage.getItem("theme") === "dark") {
    localStorage.removeItem("theme");
    document.documentElement.classList.remove("dark");
    urlImage.src = "/moon.svg";
    urlImage.alt = "Moon logo";
  } else {
    localStorage.setItem("theme", "dark");
    document.documentElement.classList.add("dark");
    urlImage.src = "/sun.svg";
    urlImage.alt = "Sun logo";
  }
};
</script>
