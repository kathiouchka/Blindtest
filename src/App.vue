<template>
    <div id="app">
        <div class="container">
            <div class="centered">
                <router-link to="/playlist" class="home-link">Playlist</router-link>
                <router-link to="/guess" class="game-link">Guess Game</router-link>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
    
    
<style>
.container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.centered {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.home-link {
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 1.2rem;
}

.game-link {
    margin-top: 1rem;
    font-size: 1.2rem;
}
</style>
  