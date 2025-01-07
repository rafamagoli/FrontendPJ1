Canteen & HR Management System

Project Objective

This project aims to provide an integrated solution for managing employees, departments, tasks, plates, ingredients, and reservations in a unified system, simplifying internal company operations.

Project Requirements

1. Users

Stored Information:
	•	Username: Must be unique, consisting of letters, numbers, or “_”.
	•	Name: Cannot contain numbers or special characters.
	•	NIF: Mandatory and unique.
	•	Password: Minimum 8 characters, with at least one uppercase letter.
	•	Department: Associated with a department (optional for admins).
	•	Balance: Initial balance, default is 0.
	•	Role: Can be “Admin”, “Manager”, “Employee”, “Inactive”.

Restrictions:
	•	Only admins can deactivate users.
	•	An admin can only be created by another admin using the keyword “nibelis” in the password.
	•	Managers cannot create other managers; only admins can.
	•	Only admins and HR Managers can create or edit users.
	•	Employees can only view and edit their own information.

2. Ingredients

Stored Information:
	•	Name: Must be unique.
	•	Allergen: Mandatory (yes/no).

Restrictions:
	•	Ingredients associated with plates cannot be deleted.
	•	Only managers (or admins) can create, edit, or delete ingredients.

3. Plates

Stored Information:
	•	Name: Must be unique.
	•	Type: Meats, Fish, Vegetarian.
	•	Price: Must be a positive number.
	•	Ingredients: Associated by name.

Restrictions:
	•	Only managers (or admins) can create plates.
	•	Ingredients must be registered beforehand.
	•	Any logged-in user can view plates.

4. Tasks

Stored Information:
	•	ID: Automatically generated.
	•	Description: Task name.
	•	Limit Date: Must be in the future.
	•	Status: Completed (Yes/No).
	•	Assigned To: Must be a valid user.

Restrictions:
	•	Only admins and managers can create tasks.
	•	Tasks cannot be deleted, only marked as completed.
	•	Managers can only view tasks within their department.

5. Reservations

Stored Information:
	•	Date: Mandatory and valid.
	•	Employee NIF: Mandatory.
	•	Plate: Associated by name.

Restrictions:
	•	Only managers and admins can view all reservations.
	•	Employees can only view and manage their own reservations.
	•	Reservations can only be made until 10:00 AM on the same day.

6. Departments

Stored Information:
	•	Name: Must be unique.
	•	Discount: Percentage between 0 and 100.
	•	Manager: A department can only have one manager associated.

Restrictions:
	•	Only admins can create or edit departments.
	•	Departments with employees cannot be deleted.
	•	Department names cannot contain numbers.

Implemented Pages
	1.	User:
	•	Login (/user/login)
	•	Register (/user/register)
	•	Dashboard (/user/dashboard)
	2.	Employee:
	•	List (/employee/list)
	•	Add (/employee/add)
	•	Edit (/employee/edit/:username)
	3.	Department:
	•	List (/department/list)
	•	Add (/department/add)
	•	Edit (/department/edit/:id)
	•	Details (/department/:id)
	4.	Task:
	•	List (/task/list)
	•	Add (/task/add)
	•	Edit (/task/edit/:id)
	5.	Ingredient:
	•	List (/ingredient/list)
	•	Add (/ingredient/add)
	•	Edit (/ingredient/edit/:id)
	6.	Plate:
	•	List (/plate/list)
	•	Add (/plate/add)
	•	Edit (/plate/edit/:id)
	7.	Reservation:
	•	List (/reservation/list)
	•	Add (/reservation/add)
	•	Edit (/reservation/edit/:id)

Navigation Rules
	1.	Users with role: "inactive" cannot log in.
	2.	Route access is controlled based on meta.allowedRoles defined in the routes file (main.js).
	3.	Any unauthorized route redirects the user to /user/login.

Postman Tests (API Endpoints)

Users

Login
POST localhost:8080/api/users/login

{
  "username": "Admin1",
  "password": "Anibelis123"
}

Register Admin
POST localhost:8080/api/users/create-admin

{
  "username": "AdminOioi",
  "password": "ABnibelis123210",
  "name": "Admin Now",
  "nif": "118296434",
  "role": "Admin"
}

Add Employee
POST localhost:8080/api/users/register-user

{
  "username": "employeeT",
  "password": "YourSecurePassword2",
  "name": "Employee T",
  "nif": "105236586",
  "departmentName": "HR",
  "role": "Employee"
}

List Employees
GET localhost:8080/api/users

Get Employee by NIF
GET localhost:8080/api/users/by-nif/186679378

Get Employee by Username
GET localhost:8080/api/users/by-username/CanteenManager

Get Employees by Department
GET localhost:8080/api/users/by-department/Canteen

Edit Employee by Username
PUT localhost:8080/api/users/username/employeeT

{
  "username": "employeeT",
  "name": "Ana Carolina Garcia"
}

Deactivate Employee
PUT localhost:8080/api/users/inactivate/employeeT

Departments

Add Department
POST localhost:8080/api/departments

{
  "name": "HR",
  "canteenDiscount": 20
}

List Departments
GET localhost:8080/api/departments

Edit Department by Name
PUT localhost:8080/api/departments/human-resources

{
  "name": "Human Resources",
  "canteenDiscount": 15
}

Delete Department
DELETE localhost:8080/api/departments/human-resources

Get Departments by Manager NIF
GET localhost:8080/api/departments/manager/nif/192782509

Tasks

Add Task
POST localhost:8080/api/tasks

{
  "taskName": "Finalize weekly report",
  "description": "Complete it ASAP",
  "limit_date": "2024-12-25",
  "isCompleted": false,
  "assignedTo": "AdminTest"
}

List Tasks
GET localhost:8080/api/tasks

Get Task by ID
GET localhost:8080/api/tasks/6769a6ae7949d6b2aa54eef9

Get Tasks by Username
GET localhost:8080/api/tasks/username/AdminTest

Edit Task by ID
PUT localhost:8080/api/tasks/6769a63f79d2b78f541bad9f

{
  "taskName": "Finalize weekly report",
  "description": "Complete it immediately",
  "limit_date": "2024-12-25",
  "isCompleted": true,
  "assignedTo": "AdminTest"
}

Ingredients

Add Ingredient
POST localhost:8081/api/ingredients

{
  "name": "beef",
  "allergen": false
}

List Ingredients
GET localhost:8081/api/ingredients

Get Ingredient by Name
GET localhost:8081/api/ingredients/beef

Edit Ingredient by Name
PUT localhost:8081/api/ingredients/chocolate

Delete Ingredient
DELETE localhost:8081/api/ingredients/salt

Plates

Add Plate
POST localhost:8081/api/plates

{
  "name": "Grilled Beef",
  "type": "Meat",
  "price": 10,
  "ingredients": ["beef"]
}

List Plates
GET localhost:8081/api/plates

Get Plate by Name
GET localhost:8081/api/plates/Grilled Beef

Edit Plate by Name
PUT localhost:8081/api/plates/Grilled Beef

{
  "name": "Grilled Beef",
  "type": "Meat",
  "price": 12,
  "ingredients": ["beef"]
}

Delete Plate
DELETE localhost:8081/api/plates/Grilled Beef

Reservations

Add Reservation
POST localhost:8081/api/reservations

Edit Reservation by ID
PUT localhost:8081/api/reservations/67719c0cc48e94586722d030

{
  "date": "2025-01-02",
  "plateName": "Grilled Beef"
}

Delete Reservation by ID
DELETE localhost:8081/api/reservations/67719c0cc48e94586722d030