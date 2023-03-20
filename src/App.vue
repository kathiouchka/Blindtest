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
body {
    background-color: #1a1a1a;
    color: #f0f0f0;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

input {
    background-color: #333;
    border: 1px solid #444;
    border-radius: 4px;
    color: #f0f0f0;
    padding: 6px 12px;
    margin: 0 4px;
}

button {
    background-color: #4a4a4a;
    border: 1px solid #444;
    border-radius: 4px;
    color: #f0f0f0;
    cursor: pointer;
    padding: 6px 12px;
    margin: 0 4px;
}

button:hover {
    background-color: #5a5a5a;
}

button:active {
    background-color: #3a3a3a;
}

h1,
h3,
p {
    margin: 0.5rem 0;
}

.guess-game {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;
}
</style>
