<template>
    <!-- BARRA DE CIMA -->
    <div class="top-bar d-flex align-items-center">
        <div class="balance-info">
            <img src="/balance_pig.png" alt="Balance Icon" class="balance-icon" />
            <span>€145,00</span>
        </div>
        <button class="btn btn-danger logout-btn">Logout</button>
    </div>
    
    <div class="container-fluid vh-100">
        <div class="row h-100">
            <!-- BARRA LATERAL/SIDEBAR -->
            <nav class="col-3 col-md-3 sidebar">
                <div class="text-center mb-3">
                    <img src="/abr_logo.png" alt="Logo" class="sidebar-logo" />
                </div>
                
                <h3 class="text-center text-white mb-4">
                    <span id="userName"></span>
                </h3>
                <!-- Pega o username personalizado -->
                <ul class="nav flex-column">
                    <p></p>
                    
                    <div class="section-sidebar">
                        HUMAN RESOURCES
                        <p></p>
                        <li class="nav-item">
                            <a class="nav-link" href="#dashboard">Dashboard</a>
                        </li>
                        
                        <li class="nav-item">
                            <a class="nav-link" href="#employees">
                                Employees
                                <span class="arrow">▼</span>
                            </a>
                            <ul class="submenu">
                                <li>
                                    <a class="nav-link" href="#add-employee">Add Employee</a>
                                </li>
                                <li>
                                    <a class="nav-link" href="#view-employees">View Employees</a>
                                </li>
                            </ul>
                        </li>
                        
                        <li class="nav-item">
                            <a class="nav-link" href="#tasks">
                                Tasks
                                <span class="arrow">▼</span>
                            </a>
                            <ul class="submenu">
                                <li><a class="nav-link" href="#add-task">Create Tasks</a></li>
                                <li><a class="nav-link" href="#view-task">View Tasks</a></li>
                            </ul>
                        </li>
                        
                        <li class="nav-item">
                            <a class="nav-link" href="#departments">
                                Departments
                                <span class="arrow">▼</span>
                            </a>
                            <ul class="submenu">
                                <li>
                                    <a class="nav-link" href="#add-department">Create Department</a>
                                </li>
                                <li>
                                    <a class="nav-link" href="#view-department">View Department</a>
                                </li>
                            </ul>
                        </li>
                    </div>
                    <p></p>
                    
                    <div class="section-sidebar">
                        CANTEEN
                        <p></p>
                        <li class="nav-item">
                            <a class="nav-link" href="#plates">
                                Plates
                                <span class="arrow">▼</span>
                            </a>
                            <ul class="submenu">
                                <li>
                                    <a class="nav-link" href="#add-plate">Create Plate</a>
                                </li>
                                <li>
                                    <a class="nav-link" href="#view-plate">View Plates</a>
                                </li>
                            </ul>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#reservations">
                                Reservations
                                <span class="arrow">▼</span>
                            </a>
                            <ul class="submenu">
                                <li>
                                    <a class="nav-link" href="#add-reservation">Create Reservation</a>
                                </li>
                                <li>
                                    <a class="nav-link" href="#view-reservation">View Reservations</a>
                                </li>
                            </ul>
                        </li>
                    </div>
                </ul>
            </nav>
            
            <!-- Conteúdo principal -->
            <main class="col-9 col-md-9 main-content">
                <section id="dashboard" class="py-4">
                    <h2>Dashboard</h2>
                    <div class="row g-3">
                        <div class="col-md-4">
                            <div class="card card-section">
                                <h3>Tasks</h3>
                                <li>Human Resource</li>
                                <li>Canteen</li>
                                <li>Technology</li>
                                <li>Finance</li>
                            </div>
                        </div>
                        
                        <div class="col-md-4">
                            <div class="card card-section">
                                <h3>Employees</h3>
                                <p>Manage Employees: create, view all, and update.</p>
                            </div>
                        </div>
                        <p></p>
                        <div class="col-md-4">
                            <div class="card card-reserv">
                                <h3>Reservations</h3>
                                <div id="calendar"></div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    </div>

</template>

<script>
// import { ref, onMounted } from "vue";

export default {
      data() {
        return {
          userName: "Bulma Garcia",
        };
      },
      mounted() {
        this.initCalendar();
      },
      methods: {
        initCalendar() {
          const calendarEl = document.getElementById("calendar");
          const calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: "dayGridMonth", // Monthly grid view
            themeSystem: "bootstrap5", // Use Bootstrap5 theme for a cleaner look
            headerToolbar: {
              left: "prev,next today", // Navigation buttons
              center: "title", // Title in the center
              right: "dayGridMonth,timeGridWeek,timeGridDay", // Switch between views
            },
            events: [
              {
                title: "Ana Garcia - Plate Reservation",
                start: "2024-12-05", // Reservation date
                end: "2024-12-05",
                description: "Grilled fish with potatoes",
              },
              {
                title: "Martini Silva - Plate Reservation",
                start: "2024-12-10",
                end: "2024-12-10",
                description: "Grilled chicken with rice",
              },
            ],
            eventClick: function (info) {
              alert(
                "Event: " +
                  info.event.title +
                  "\n" +
                  "Description: " +
                  info.event.extendedProps.description +
                  "\n" +
                  "Date: " +
                  info.event.start.toLocaleDateString()
              );
            },
            dateClick: function (info) {
              alert("Date clicked: " + info.dateStr);
            },
          });
          calendar.render();
        },
      },
}
</script>

<style>
/* General Styles */
html, body {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: #f8f9fa;
    margin: 0;
    padding: 0;
}

/* Top bar container */
.top-bar {
    position: fixed; /* Fixed at the top */
    top: 0;
    left: 25%; /* Start after the sidebar */
    width: 75%; /* Occupy remaining space */
    height: 50px; /* Height of the top bar */
    background-color: #d1d1d1; /* Light gray background */
    border-bottom: 1px solid #ddd; /* Subtle bottom border */
    padding: 0 20px; /* Add horizontal padding */
    z-index: 1000; /* Keep it on top of other content */
    justify-content: flex-end; /* Align items to the right */
    display: flex; /* Enable flexbox */
    align-items: center; /* Center items vertically */
}

.balance-icon {
    width: 22px; /* Adjust to your desired size */
    height: 22px; /* Keep the aspect ratio */
    margin-right: 5px; /* Add some spacing between the icon and the text */
    vertical-align: middle; /* Ensure it's aligned with the text */
}

/* Balance text styling */
.balance-info {
    margin-right: 10px;
    font-size: 12px;
    color: #000000; /* Dark text for balance */
}

/* Logout button styling */
.logout-btn {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 12px;
    padding: 4px 10px;
    background-color: #000000;
    border: none;
}

/* Sidebar Styles */
.sidebar {
    position: sticky; /* Stick the sidebar to the viewport */
    top: 0; /* Start sticking at the top of the page */
    height: 200vh; /* Full height of the viewport */
    background-color: #000000;
    padding: 20px;
    border: none;
}

.sidebar h3 {
    font-size: 1.5rem;
    font-weight: bold;
}

/* Sidebar Logo Styles */
.sidebar-logo {
    max-width: 100%; /* Make the logo responsive */
    height: auto; /* Maintain aspect ratio */
    display: block; /* Center inside the div */
    margin: 0 auto; /* Center horizontally */
    max-height: 150px; /* Limit height to prevent it from being too large */
    object-fit: contain; /* Ensure the image fits without distortion */
    margin-bottom: 20px; /* Add some spacing below the logo */
    
}

.sidebar .nav-link {
    display: block; /* Makes the link fill the box */
    background-color: #ffffff; /* White background */
    color: #000000; /* Black text */
    padding: 10px 15px; /* Adds spacing */
    text-align: left; /* Aligns text to the left */
    text-decoration: none; /* Removes underline */
    margin-bottom: 15px; /* Adds spacing between items */
}

/* Sidebar styles for dropdowns */
.nav-item .submenu {
    display: none; /* Hidden by default */
    padding-left: 15px; /* Indents the subsections */
}

.nav-item.active .submenu {
    display: block; /* Show when parent is active */
}

.nav-item .arrow {
    float: right; /* Positions the arrow to the right */
    transition: transform 0.3s; /* Smooth rotation animation */
}

.nav-item.active .arrow {
    transform: rotate(90deg); /* Rotate arrow when active */
}

.nav-link {
    position: relative; /* For positioning the arrow */
    padding-right: 30px; /* Makes space for the arrow */
}

.section-sidebar {
    color: #888888;
    font-size: 0.5 rem;
    margin: 10px 0;
    transition: color 0.3s ease;
}

.sidebar .nav-link:hover {
    color: #17a2b8;
    text-decoration: none;
}

/* Main Content Styles */
.main-content {
    padding: 20px;
}


/* CARDS DO DASHBOARD - TASKS/EMPLOYEES/RESERVATIONS */
.card-section {
    background-color: #ffffff;
    border: 1px solid #dee2e6;
    border-radius: 5px;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
    padding: 20px;
    text-align: center;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: transform 0.3s ease;
}

.card-section:hover {
    transform: scale(1.05);
}

.card-section h3 {
    font-size: 1.5rem;
    color: #343a40;
    margin-bottom: 10px;
}

.card-section p {
    font-size: 1rem;
    color: #6c757d;
}

/* card da reserva */
.card-reserv {
    background-color: #ffffff;
    border: 1px solid #dee2e6;
    border-radius: 5px;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
    padding: 15px;
    text-align: center;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: transform 0.3s ease;
    height: auto; /* Permite que a div se ajuste ao conteúdo */
    overflow: hidden; /* Prevent overflow from children */
}

/* FullCalendar Styles */
/* STYLE FOR THE CALENDAR BELOW */

#calendar {
    max-width: 100%; /* Make the calendar responsive */
    height: auto; /* Allow dynamic height */
    overflow: hidden; /* Ensure no overflow */
    border-radius: 5px; /* Optional: Rounded edges for the calendar itself */
}

/* Adjust FullCalendar to fit inside parent */
.fc {
    max-height: 100%; /* Prevent the calendar from expanding too much */
    height: 100%; /* Stretch to fill parent height */
    overflow: hidden;
}

/* Header styles */
.fc-toolbar {
    font-size: x-small;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: #000000; /* Dark text color */
}

/* Event styles */
.fc-event {
    background-color: #000000; /* Blue background for events */
    color: white; /* White text for contrast */
    border: none; /* Remove borders */
    border-radius: 5px; /* Slightly rounded edges */
    padding: 5px; /* Add padding inside the events */
}

/* Hover effect for events */
.fc-event:hover {
    background-color: #000000; /* Darker blue on hover */
    cursor: pointer; /* Change cursor to pointer */
}

/* Date cell styles */
.fc-daygrid-day {
    font-size: 0.7rem; /* Adjust text size */
    padding: 10px; /* Add spacing to day cells */
    border: 1px solid #f1f1f1; /* Light grid lines */
}

.fc-daygrid-day:hover {
    background-color: #f8f9fa; /* Highlight day on hover */
    cursor: pointer;
}

/* END OF CALENDAR STYLE */
</style>