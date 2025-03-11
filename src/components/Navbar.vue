<script setup></script>


<template>

  <header class="bg-white shadow-sm">
    <nav class="container mx-auto px-4 py-4 flex justify-between items-center">
      <div class="flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-600" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M2 22a10 10 0 1 1 20 0" />
          <path d="M12 13V2" />
          <path d="m9 5 3-3 3 3" />
          <path d="M9 9h6" />
          <path d="M9 13h6" />
        </svg>
        <router-link to="/">
          <span class="text-xl font-bold text-green-800">EcoFootprint</span>
        </router-link>
      </div>
      <div class="space-x-4">
        <router-link to="/login" class="text-green-600 hover:text-green-800">Iniciar sesión</router-link>
        <router-link to="/register"
          class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">Registrarse</router-link>
      </div>
    </nav>
  </header>
</template>
