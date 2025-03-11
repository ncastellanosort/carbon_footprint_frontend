<script setup></script>


<template>
  <nav class="bg-white border-gray-200">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <router-link to="/">
        <a href="" class="flex items-center space-x-3 rtl:space-x-reverse">
          <span class="self-center text-2xl font-semibold whitespace-nowrap">🌱 Calculadora huella de carbono</span>
        </a>
      </router-link>
      <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <router-link to="/login">
          <button type="button"
            class="text-white bg-lime-500 hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-4 py-2 text-center transition">Login
          </button>
        </router-link>
      </div>
      <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
        <ul
          class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
          <li>
            <a href="#"
              class="block py-2 px-3 md:p-0 text-white bg-lime-500 rounded-sm md:bg-transparent md:text-lime-500"
              aria-current="page">Home</a>
          </li>
          <li>
            <a href="#"
              class="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700">About</a>
          </li>
          <li>
            <a href="#"
              class="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700">Calculate</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

</template>
