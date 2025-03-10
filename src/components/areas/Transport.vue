<script setup></script>

<template>
  <h3 class="text-2xl font-semibold text-green-600">🚗 Transporte</h3>
  <div>
    <label class="block font-medium text-gray-600">Kilómetros en coche por semana: <span id="km_coche_val"
        class="font-bold">0</span></label>
    <input id="km_coche" type="range" min="0" max="500" value="0" class="w-full accent-green-500">
  </div>

  <div>
    <label class="block font-medium text-gray-600">Kilómetros en transporte público por semana: <span
        id="km_publico_val" class="font-bold">0</span></label>
    <input id="km_publico" type="range" min="0" max="500" value="0" class="w-full accent-green-500">
  </div>

  <div>
    <label class="block font-medium text-gray-600">Vuelos nacionales al año: <span id="vuelos_nac_val"
        class="font-bold">0</span></label>
    <input id="vuelos_nac" type="range" min="0" max="20" value="0" class="w-full accent-green-500">
  </div>

  <div>
    <label class="block font-medium text-gray-600">Vuelos internacionales al año: <span id="vuelos_int_val"
        class="font-bold">0</span></label>
    <input id="vuelos_int" type="range" min="0" max="10" value="0" class="w-full accent-green-500">
  </div>
</template>
