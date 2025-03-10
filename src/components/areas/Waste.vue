<script setup></script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 h-screen">

    <div class="bg-white px-10 py-10 flex flex-col justify-between">
      <div>
        <h2 class="text-5xl font-bold mb-8 text-orange-700">🚮 Residuos</h2>

        <div class="space-y-8">
          <div>
            <label for="trash-bags" class="block text-xl font-semibold text-gray-800">
              ¿Cuántas bolsas de basura completas generas en una semana? (<span id="trash-bags-value">0</span> bolsas)
            </label>
            <input type="range" id="trash-bags" min="0" max="10" value="0" step="1"
              class="w-full h-2 bg-orange-500 rounded-lg appearance-none cursor-pointer"
              oninput="document.getElementById('trash-bags-value').textContent = this.value">
          </div>

          <div>
            <label for="organic-waste" class="block text-xl font-semibold text-gray-800">
              ¿Cuántas bolsas de restos de comida y desechos orgánicos produces a la semana? (<span
                id="organic-waste-value">0</span> bolsas)
            </label>
            <input type="range" id="organic-waste" min="0" max="10" value="0" step="1"
              class="w-full h-2 bg-orange-500 rounded-lg appearance-none cursor-pointer"
              oninput="document.getElementById('organic-waste-value').textContent = this.value">
          </div>

          <div>
            <label for="plastic-bottles" class="block text-xl font-semibold text-gray-800">
              ¿Cuántas botellas o envases de plástico tiras cada semana? (<span id="plastic-bottles-value">0</span>
              botellas)
            </label>
            <input type="range" id="plastic-bottles" min="0" max="50" value="0" step="1"
              class="w-full h-2 bg-orange-500 rounded-lg appearance-none cursor-pointer"
              oninput="document.getElementById('plastic-bottles-value').textContent = this.value">
          </div>

          <div>
            <label for="paper-waste" class="block text-xl font-semibold text-gray-800">
              ¿Cuántos paquetes de papel/cartón desechas en una semana? (<span id="paper-waste-value">0</span> paquetes)
            </label>
            <input type="range" id="paper-waste" min="0" max="10" value="0" step="1"
              class="w-full h-2 bg-orange-500 rounded-lg appearance-none cursor-pointer"
              oninput="document.getElementById('paper-waste-value').textContent = this.value">
          </div>
        </div>
      </div>

      <div class="flex justify-between mt-8">
        <button
          class="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-6 rounded-lg transition duration-300">
          Atrás
        </button>
        <button
          class="bg-orange-600 hover:bg-orange-800 text-white font-bold py-2 px-6 rounded-lg transition duration-300">
          Siguiente
        </button>
      </div>
    </div>

    <div class="h-full w-full flex items-center justify-center bg-orange-100">
      <img src="https://scitechdaily.com/images/Trash-Garbage-Waste-scaled.jpg" alt="Residuos y reciclaje"
        class="w-4/5 rounded-2xl shadow-lg">
    </div>

  </div>
</template>

<style>
input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  width: 18px;
  height: 18px;
  background-color: #ea580c;
  border-radius: 50%;
  cursor: pointer;
}

input[type="range"]::-moz-range-thumb {
  width: 18px;
  height: 18px;
  background-color: #ea580c;
  border-radius: 50%;
  cursor: pointer;
}
</style>
