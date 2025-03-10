<script setup></script>

<template>
  <h3 class="text-2xl font-semibold text-green-600">🍽️ Alimentación</h3>
  <div>
    <label class="block font-medium text-gray-600">Consumo de carne roja por semana: <span id="carne_roja_val"
        class="font-bold">0</span></label>
    <input id="carne_roja" type="range" min="0" max="14" value="0" class="w-full accent-green-500">
  </div>

  <div>
    <label class="block font-medium text-gray-600">Consumo de carne blanca por semana: <span id="carne_blanca_val"
        class="font-bold">0</span></label>
    <input id="carne_blanca" type="range" min="0" max="14" value="0" class="w-full accent-green-500">
  </div>

  <div>
    <label class="block font-medium text-gray-600">Consumo de lácteos por semana: <span id="lacteos_val"
        class="font-bold">0</span></label>
    <input id="lacteos" type="range" min="0" max="21" value="0" class="w-full accent-green-500">
  </div>

  <div>
    <label class="block font-medium text-gray-600">Comidas vegetarianas por semana: <span id="vegetariano_val"
        class="font-bold">0</span></label>
    <input id="vegetariano" type="range" min="0" max="21" value="0" class="w-full accent-green-500">
  </div>

</template>
