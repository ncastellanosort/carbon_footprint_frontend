<script setup></script>

<template>
  <h3 class="text-2xl font-semibold text-green-600">🗑️ Residuos</h3>
  <div>
    <label class="block font-medium text-gray-600">
      Bolsas de basura por semana: <span id="basura_semana_val" class="font-bold">0</span>
    </label>
    <input id="basura_semana" type="range" min="0" max="10" value="0" class="w-full accent-green-500">
  </div>

  <div>
    <label class="block font-medium text-gray-600">
      Bolsas de restos de comida y desechos orgánicos producidos a la semana: <span id="restos_val"
        class="font-bold">0</span>
    </label>
    <input id="restos" type="range" min="0" max="10" value="0" class="w-full accent-green-500">
  </div>

  <div>
    <label class="block font-medium text-gray-600">
      Botellas o envases de plástico tirados cada semana: <span id="plasticos_val" class="font-bold">0</span>
    </label>
    <input id="plasticos" type="range" min="0" max="50" value="0" class="w-full accent-green-500">
  </div>

  <div>
    <label class="block font-medium text-gray-600">
      Paquetes de papel/cartón desechados en una semana: <span id="papel_val" class="font-bold">0</span>
    </label>
    <input id="papel" type="range" min="0" max="10" value="0" class="w-full accent-green-500">
  </div>

</template>
