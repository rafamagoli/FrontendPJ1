<template>
    <div class="container d-flex justify-content-center align-items-center vh-100">
      <div class="card p-4 shadow-sm" style="max-width: 400px; width: 100%; background-color: rgba(255, 255, 255, 0.8);">
        <h2 class="card-title text-center mb-4"><strong>Register</strong></h2>
        <form @submit.prevent="handleSubmit">
          <!-- Field for Name -->
          <div class="mb-3">
            <label for="nome" class="form-label">NAME</label>
            <input
              type="text"
              class="form-control"
              placeholder="Enter your name"
              v-model="form.name"
              required
            />
          </div>
  
          <!-- Field for Username -->
          <div class="mb-3">
            <label for="username" class="form-label">USERNAME</label>
            <input
              type="text"
              class="form-control"
              placeholder="Enter your username"
              v-model="form.username"
              required
            />
          </div>
  
          <!-- Field for NIF -->
          <div class="mb-3">
            <label for="nif" class="form-label">NIF</label>
            <input
              type="text"
              class="form-control"
              placeholder="Enter your NIF"
              v-model="form.nif"
              required
            />
          </div>
  
          <!-- Field for Password -->
          <div class="mb-3">
            <label for="senha" class="form-label">PASSWORD</label>
            <input
              type="password"
              class="form-control"
              placeholder="Enter your password"
              v-model="form.password"
              required
            />
          </div>
  
          <!-- Field for Repeat Password -->
          <div class="mb-3">
            <label for="repeatPassword" class="form-label">REPEAT PASSWORD</label>
            <input
              type="password"
              class="form-control"
              placeholder="Repeat your password"
              v-model="form.repeatPassword"
              required
            />
          </div>
  
          <!-- Error Message -->
          <div v-if="errorMessage" class="alert alert-danger" role="alert">
            {{ errorMessage }}
          </div>
  
          <!-- Register Button -->
          <button type="submit" class="btn btn-primary w-100">Register</button>
        </form>
        <p class="text-center mt-3">
          <a href="login.html">Already have an account? Log in</a>
        </p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "RegisterPage",
    data() {
      return {
        form: {
          name: "",
          username: "",
          nif: "",
          password: "",
          repeatPassword: "",
        },
        errorMessage: "",
      };
    },
    methods: {
      handleSubmit() {
        // Basic validation
        if (this.form.password !== this.form.repeatPassword) {
          this.errorMessage = "Passwords do not match.";
          return;
        }
  
        this.errorMessage = ""; // Clear any previous error messages
        console.log("Form Submitted", this.form);
        // Add API call or further handling logic here
      },
    },
  };
  </script>
  
  <style scoped>
  body {
    background: linear-gradient(to right, #6a11cb, #2575fc);
    color: #333;
    font-family: Arial, sans-serif;
  }
  </style>
  