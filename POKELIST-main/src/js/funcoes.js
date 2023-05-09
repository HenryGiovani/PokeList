var modal = document.querySelector('ion-modal');
const body = document.querySelector('body');
const pokemonList = [];
const listPokemon = document.getElementById('listPokemon');
var boolean = false;
var tipos = [];
var ataques = [];
var statusPokemons = [];
var peso;
var altura;
var porcentagem;

// Modal variaveis
const divPokemonImg = document.getElementById('pokemonImg')
const idModal = document.getElementById('idModal');
const imgModal = document.getElementById('imgModal');
const nomePokemon = document.getElementById('nomePokemon')
var typeModalStyle;
const tipoModal = document.getElementById('tipo');
const pesoModal = document.getElementById('peso');
const alturaModal = document.getElementById('altura');
const ataquesModal = document.getElementById('ataques');
const statusModal = document.getElementById('status');
const contentGraphicModal = document.querySelectorAll('.contentGraphic');
const contentGraphicModalStatus = document.querySelectorAll('.graphicHP, .graphicAttack, .graphicDefense, .graphicSAttack, .graphicSDefense, .graphicSpeed');
const numbersStatusGraphic = document.querySelectorAll('#numberHPStatus, #numberAttackStatus, #numberDefenseStatus, #numberSAttackStatus, #numberSDefenseStatus, #numberSpeedStatus');


async function carregarPokemons() {
    showLoading();
    for (let i = 1; i <= 10; i++) {
        let pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        pokemon = await pokemon.json();
        pokemonList.push(pokemon);
    }
    closeLoading();
    mostrarPokemons();
}

function mostrarPokemons() {
    pokemonList.forEach((item, y) => {
        listPokemon.innerHTML += `
    <ion-item onclick="abrirModal(${y})">
        <ion-thumbnail slot="start">
            <img alt="Silhouette of mountains" class="imagem" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${y+1}.png" />
        </ion-thumbnail>
        <ion-label style="text-transform:capitalize; ">${item.name}</ion-label>
    </ion-item>
    `
    })
}

function abrirModal (id) {
    tratarDados(id);
    modal.isOpen = true;
}

function tratarDados (id) {
    // Mudar o ID

    idModal.innerHTML = pokemonList[id].id;

    // Mudar a foto

    imgModal.setAttribute('src', pokemonList[id].sprites.other.dream_world.front_default);

    // Mudar a cor 

    if(!boolean) {
        typeModalStyle = pokemonList[id].types[0].type.name;
    } else {
        contentGraphicModal.forEach((item) => {
            item.classList.remove(typeModalStyle);
        });
        divPokemonImg.classList.remove(typeModalStyle);
        typeModalStyle = pokemonList[id].types[0].type.name;
    }

    contentGraphicModal.forEach((item) => {
        item.classList.add(typeModalStyle);
    });
    divPokemonImg.classList.add(typeModalStyle);
    boolean = true;

    // Mudar o nome do pokémon

    nomePokemon.innerHTML = pokemonList[id].name;

    // Adicionar os tipos

    tipos = [];
    tipoModal.innerHTML = '';
    Object.keys(pokemonList[id].types).forEach((item) => {
        tipos.push(pokemonList[id].types[item].type.name);
        tipoModal.innerHTML += `<spam>${tipos[item]}</spam><br>`
    })

    // Adicionar os ataques

    ataques = [];
    ataquesModal.innerHTML = '';
    Object.keys(pokemonList[id].moves).forEach((item) => {
        ataques.push(pokemonList[id].moves[item].move.name);
        ataquesModal.innerHTML += `<spam>${ataques[item]}</spam><br>`
    })

    // Adicionar os status

    statusPokemons = [];
    Object.keys(pokemonList[id].stats).forEach((item) => {
        statusPokemons.push(pokemonList[id].stats[item].base_stat);
    })

    numbersStatusGraphic.forEach((item, x) => {
        item.innerHTML = statusPokemons[x]
    })

    statusPorcentagem (statusPokemons);

    // Pegar peso

    peso = pokemonList[id].weight;
    pesoModal.innerHTML = peso.toFixed(1) / 10;

    // Pegar altura

    altura = pokemonList[id].height;
    alturaModal.innerHTML = altura.toFixed(1) / 10;
    



    
}

function statusPorcentagem (status) {
    contentGraphicModalStatus.forEach((item, posicao) => {
        porcentagem = (status[posicao] * 100) / 200;
        item.style.height = `${porcentagem}%`
    })
}










async function showLoading() {
    const loading = await document.createElement('ion-loading');
    loading.message = 'Carregando';
    document.body.appendChild(loading);
    await loading.present();
}

function closeLoading() {
    const carregando = document.querySelector('ion-loading');
    carregando.remove();
};