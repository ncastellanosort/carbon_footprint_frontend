<script setup></script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 h-screen">

    <div class="bg-white px-10 py-10 flex flex-col justify-between">
      <div>
        <h2 class="text-5xl font-bold mb-8 text-red-700">🍽️ Alimentación</h2>

        <div class="space-y-8">
          <div>
            <label for="red-meat" class="block text-xl font-semibold text-gray-800">
              ¿Cuántas veces consumes carne roja a la semana? (<span id="red-meat-value">0</span> veces)
            </label>
            <input type="range" id="red-meat" min="0" max="14" value="0" step="1"
              class="w-full h-2 bg-red-500 rounded-lg appearance-none cursor-pointer"
              oninput="document.getElementById('red-meat-value').textContent = this.value">
          </div>

          <div>
            <label for="white-meat" class="block text-xl font-semibold text-gray-800">
              ¿Cuántas veces consumes carne blanca (pollo, pescado) a la semana? (<span id="white-meat-value">0</span>
              veces)
            </label>
            <input type="range" id="white-meat" min="0" max="14" value="0" step="1"
              class="w-full h-2 bg-red-500 rounded-lg appearance-none cursor-pointer"
              oninput="document.getElementById('white-meat-value').textContent = this.value">
          </div>

          <div>
            <label for="dairy" class="block text-xl font-semibold text-gray-800">
              ¿Cuántas veces consumes productos lácteos a la semana? (<span id="dairy-value">0</span> veces)
            </label>
            <input type="range" id="dairy" min="0" max="21" value="0" step="1"
              class="w-full h-2 bg-red-500 rounded-lg appearance-none cursor-pointer"
              oninput="document.getElementById('dairy-value').textContent = this.value">
          </div>

          <div>
            <label for="vegetarian-meals" class="block text-xl font-semibold text-gray-800">
              ¿Cuántas comidas a la semana son completamente vegetarianas? (<span id="vegetarian-meals-value">0</span>
              veces)
            </label>
            <input type="range" id="vegetarian-meals" min="0" max="21" value="0" step="1"
              class="w-full h-2 bg-red-500 rounded-lg appearance-none cursor-pointer"
              oninput="document.getElementById('vegetarian-meals-value').textContent = this.value">
          </div>
        </div>
      </div>

      <div class="flex justify-between mt-8">
        <button
          class="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-6 rounded-lg transition duration-300">
          Atrás
        </button>
        <button class="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-6 rounded-lg transition duration-300">
          Siguiente
        </button>
      </div>
    </div>

    <div class="h-full w-full flex items-center justify-center bg-red-100">
      <img src="https://d32m1btok6bzqh.cloudfront.net/wp-content/uploads/2023/01/Diet.jpg" alt="Comida y alimentación"
        class="w-4/5 rounded-2xl shadow-lg">
    </div>
  </div>
</template>

<style>
input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  width: 18px;
  height: 18px;
  background-color: #dc2626;
  border-radius: 50%;
  cursor: pointer;
}

input[type="range"]::-moz-range-thumb {
  width: 18px;
  height: 18px;
  background-color: #dc2626;
  border-radius: 50%;
  cursor: pointer;
}
</style>
