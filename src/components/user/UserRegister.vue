<template>
  <div class="register-page">
    <!-- Register Card -->
    <div class="register-container">
      <div class="card p-4 shadow-sm">
        <h2 class="card-title center mb-4"><strong>Register</strong></h2>
        <form @submit.prevent="handleRegister">
          <!-- Username field -->
          <div class="mb-3">
            <label for="username" class="form-label">USERNAME</label>
            <input
              id="username"
              v-model="username"
              type="text"
              class="form-control"
              placeholder="Choose a username"
              required
            />
          </div>

          <!-- Name field -->
          <div class="mb-3">
            <label for="name" class="form-label">NAME</label>
            <input
              id="name"
              v-model="name"
              type="text"
              class="form-control"
              placeholder="Enter your full name"
              required
            />
          </div>

          <!-- nif field -->
          <div class="mb-3">
            <label for="nif" class="form-label">nif</label>
            <input
              id="nif"
              v-model="nif"
              type="text"
              class="form-control"
              placeholder="Enter your full nif"
              required
            />
          </div>


          <!-- Password -->
          <div class="mb-3">
            <label for="password" class="form-label">PASSWORD</label>
            <input
              id="password"
              v-model="password"
              type="password"
              class="form-control"
              placeholder="Create a password"
              required
            />
          </div>

          <!-- Confirm Password field -->
          <div class="mb-3">
            <label for="confirm-password" class="form-label"
              >CONFIRM PASSWORD</label
            >
            <input
              id="confirm-password"
              v-model="confirmPassword"
              type="password"
              class="form-control"
              placeholder="Re-enter your password"
              required
            />
          </div>

          <!-- Register button -->
          <div class="button-container">
            <button type="submit" class="btn btn-primary">Register</button>
          </div>
        </form>

        <!-- Back to Login link -->
        <p class="text-center center mt-3">
          <router-link to="/" class="login-link center">Back to Login</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from '@/core/services/UserService';

export default {
  data() {
    return {
      username: "",
      name: "",
      nif: "",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    async handleRegister() {
      if (this.password !== this.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      try {
        let result = await UserService.registeAdmin(
          this.username, this.password, this.name,
          this.nif,
          "Admin"
        )
        alert(result.message)
      } catch (error) {
        console.log(error)
      }
    },
  },
};
</script>

<style scoped>

.center{
  text-align: center;
}
/* Background styling */
.register-page {
  background-image: url("/main_background.webp");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  margin: 0;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

/* Central container */
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150%;
  max-width: 450px;
}

/* Card styling */
.card {
  width: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 0px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 2rem;
}

/* Card title */
.card-title {
  font-size: 40px;
  margin-bottom: 1rem;
  color: #000000;
}

/* Form labels */
.form-label {
  letter-spacing: 2px;
  font-size: small;
  color: #313131;
  display: block;
  margin-bottom: 0.5rem;
  font-weight: normal;
}

/* Input fields */
.form-control {
  padding: 1rem;
  font-size: 1.2rem;
  border: none;
  border-radius: 9px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  outline: none;
  width: 80%;
}

.form-control:focus {
  border: 2px solid #808080;
}

/* Spacing between fields */
.mb-3 {
  margin-top: 1.5rem;
}

/* Register button */
.btn-primary {
  background-color: #000000;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 1.5rem;
  display: inline-block; /* Ensure the button is treated as inline for proper centering */
}

.button-container {
  text-align: center; /* Center the button horizontally */
  margin-top: 1.5rem; /* Add space above the button */
}

.btn-primary:hover {
  background-color: #575757;
  cursor: pointer;
}

/* Back to login link */
.login-link {
  color: #1b518b;
  text-decoration: none;
  font-size: x-small;
}

.login-link:hover {
  text-decoration: underline;
}
</style>
