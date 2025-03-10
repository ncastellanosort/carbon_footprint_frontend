<script setup></script>

<template>
  <h3 class="text-2xl font-semibold text-green-600">💡 Consumo Energético</h3>
  <div>
    <label class="block font-medium text-gray-600">Horas de uso de electrodomésticos por día: <span id="electro_val"
        class="font-bold">0</span></label>
    <input id="electro" type="range" min="0" max="24" value="0" class="w-full accent-green-500">
  </div>

  <div>
    <label class="block font-medium text-gray-600">Bombillas encendidas en promedio: <span
        id="bombillas_promedio_val">0</span></label>
    <input id="bombillas_promedio" type="range" min="0" max="20" value="0" class="w-full accent-green-500">
  </div>
  <div>
    <label class="block font-medium text-gray-600">Tanques o garrafas de gas envasado (GLP) usadas al mes: <span
        id="gas_glp_val">0</span></label>
    <input id="gas_glp" type="range" min="0" max="5" value="0" class="w-full accent-green-500">
  </div>
  <div>
    <label class="block font-medium text-gray-600">Horas al día de uso de calefacción o aire acondicionado: <span
        id="calefaccion_val">0</span></label>
    <input id="calefaccion" type="range" min="0" max="24" value="0" class="w-full accent-green-500">
  </div>

</template>
