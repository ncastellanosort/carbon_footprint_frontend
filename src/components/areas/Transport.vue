<script setup></script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 h-screen">


    <div class="bg-white px-10 py-10 flex flex-col justify-between">
      <div>
        <h2 class="text-5xl font-bold mb-8 text-lime-700">🚗 Transporte</h2>

        <div class="space-y-8">

          <div>
            <label for="car-km" class="block text-xl font-semibold text-gray-800">
              ¿Cuántos kilómetros recorres en coche a la semana?
              (<span id="car-km-value">0</span> km)
            </label>
            <input type="range" id="car-km" min="0" max="500" value="0" step="1"
              class="w-full h-2 bg-lime-500 rounded-lg appearance-none cursor-pointer"
              oninput="document.getElementById('car-km-value').textContent = this.value">
          </div>

          <div>
            <label for="public-transport-km" class="block text-xl font-semibold text-gray-800">
              ¿Cuántos kilómetros recorres en transporte público a la semana?
              (<span id="public-transport-km-value">0</span> km)
            </label>
            <input type="range" id="public-transport-km" min="0" max="500" value="0" step="1"
              class="w-full h-2 bg-lime-500 rounded-lg appearance-none cursor-pointer"
              oninput="document.getElementById('public-transport-km-value').textContent = this.value">
          </div>

          <div>
            <label for="domestic-flights" class="block text-xl font-semibold text-gray-800">
              ¿Cuántos vuelos nacionales tomas al año?
              (<span id="domestic-flights-value">0</span> vuelos)
            </label>
            <input type="range" id="domestic-flights" min="0" max="20" value="0" step="1"
              class="w-full h-2 bg-lime-500 rounded-lg appearance-none cursor-pointer"
              oninput="document.getElementById('domestic-flights-value').textContent = this.value">
          </div>

          <div>
            <label for="international-flights" class="block text-xl font-semibold text-gray-800">
              ¿Cuántos vuelos internacionales tomas al año?
              (<span id="international-flights-value">0</span> vuelos)
            </label>
            <input type="range" id="international-flights" min="0" max="10" value="0" step="1"
              class="w-full h-2 bg-lime-500 rounded-lg appearance-none cursor-pointer"
              oninput="document.getElementById('international-flights-value').textContent = this.value">
          </div>
        </div>
      </div>

      <div class="flex justify-between mt-8">
        <button
          class="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-6 rounded-lg transition duration-300">
          Atrás
        </button>
        <button class="bg-lime-600 hover:bg-lime-800 text-white font-bold py-2 px-6 rounded-lg transition duration-300">
          Siguiente
        </button>
      </div>
    </div>

    <div class="h-full w-full flex items-center justify-center bg-lime-100">
      <img src="https://www.compromisorse.com/upload/noticias/027/27047/TransporteSsostenible.jpg"
        alt="Transporte y medio ambiente" class="w-4/5 rounded-2xl shadow-lg">
    </div>

  </div>
</template>

<style>
input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  width: 18px;
  height: 18px;
  background-color: #84cc16;
  border-radius: 50%;
  cursor: pointer;
}

input[type="range"]::-moz-range-thumb {
  width: 18px;
  height: 18px;
  background-color: #84cc16;
  border-radius: 50%;
  cursor: pointer;
}
</style>
