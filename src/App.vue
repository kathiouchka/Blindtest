<!-- src/App.vue -->
<template>
    <div id="app">
        <router-link to="/home">Home</router-link>
        <router-link to="/guess">Guess Game</router-link>
        <router-view></router-view>
    </div>
</template>
  
  
<style>
.home-link {
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 1.2rem;
}
</style>
  