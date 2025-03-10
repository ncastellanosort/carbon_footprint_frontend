<script setup></script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 h-screen">
    <div class="bg-white px-10 py-10 flex flex-col justify-between">
      <div>
        <h2 class="text-5xl font-bold mb-8 text-amber-700">⚡ Consumo Energético</h2>

        <div class="space-y-8">
          <div>
            <label for="hours-appliances" class="block text-xl font-semibold text-gray-800">
              ¿Cuántas horas al día usas electrodomésticos y luces en casa?
              (<span id="hours-appliances-value">0</span> horas)
            </label>
            <input type="range" id="hours-appliances" min="0" max="24" value="0" step="1"
              class="w-full h-2 bg-amber-500 rounded-lg appearance-none cursor-pointer"
              oninput="document.getElementById('hours-appliances-value').textContent = this.value">
          </div>

          <div>
            <label for="bulbs-on" class="block text-xl font-semibold text-gray-800">
              ¿Cuántas bombillas tienes encendidas en promedio al mismo tiempo?
              (<span id="bulbs-on-value">0</span> bombillas)
            </label>
            <input type="range" id="bulbs-on" min="0" max="20" value="0" step="1"
              class="w-full h-2 bg-amber-500 rounded-lg appearance-none cursor-pointer"
              oninput="document.getElementById('bulbs-on-value').textContent = this.value">
          </div>

          <div>
            <label for="gas-tanks" class="block text-xl font-semibold text-gray-800">
              ¿Cuántos tanques o garrafas de gas envasado (GLP) usas al mes?
              (<span id="gas-tanks-value">0</span> tanques)
            </label>
            <input type="range" id="gas-tanks" min="0" max="5" value="0" step="1"
              class="w-full h-2 bg-amber-500 rounded-lg appearance-none cursor-pointer"
              oninput="document.getElementById('gas-tanks-value').textContent = this.value">
          </div>

          <div>
            <label for="heating-hours" class="block text-xl font-semibold text-gray-800">
              ¿Cuántas horas al día usas calefacción o aire acondicionado?
              (<span id="heating-hours-value">0</span> horas)
            </label>
            <input type="range" id="heating-hours" min="0" max="24" value="0" step="1"
              class="w-full h-2 bg-amber-500 rounded-lg appearance-none cursor-pointer"
              oninput="document.getElementById('heating-hours-value').textContent = this.value">
          </div>
        </div>
      </div>

      <div class="flex justify-between mt-8">
        <button
          class="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-6 rounded-lg transition duration-300">
          Atrás
        </button>
        <button
          class="bg-amber-600 hover:bg-amber-800 text-white font-bold py-2 px-6 rounded-lg transition duration-300">
          Siguiente
        </button>
      </div>
    </div>

    <div class="h-full w-full flex items-center justify-center bg-amber-100">
      <img src="https://renewablesworldwide.org/wp-content/uploads/2022/06/AdobeStock_333198273-scaled.jpeg"
        alt="Consumo energético y eficiencia" class="w-4/5 rounded-2xl shadow-lg">
    </div>
  </div>
</template>

<style>
input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  width: 18px;
  height: 18px;
  background-color: #f59e0b;
  border-radius: 50%;
  cursor: pointer;
}

input[type="range"]::-moz-range-thumb {
  width: 18px;
  height: 18px;
  background-color: #f59e0b;
  border-radius: 50%;
  cursor: pointer;
}
</style>
