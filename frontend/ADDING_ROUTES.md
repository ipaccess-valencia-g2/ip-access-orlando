## In App.jsx, add the route:
<Routes>
    <Route path="/register" element={<RegisterForm />} />
    {/* add <Route path="/" element={<HomePage />} /> etc. */}
</Routes>
##

## Example respone layout
const response = await fetch('http://localhost:3307/register', { // This is the most recently pushed URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: fullAddress,
          phone: formData.phone
        })
      });

## This needs to match the appropriate backend route
 const [rows, fields] = await db.execute(
      `INSERT INTO users (username, password, email, firstName, lastName, address, phone, isStaff)
       VALUES (?, ?, ?, ?, ?, ?, ?, 0)`,
      [username, hashedPassword, email, firstName, lastName, address, phone]
    );

## And should match the API contract as well
{
  "username": "billgates",
  "password": "hashed_password_here",
  "email": "person@email.net",
  "firstName": "Bill",
  "lastName": "Gates",
  "address": "123 Best Rd, Winter Garden FL 34787",
  "phone": 4071112222,
  "isStaff": false
}

# To run within the terminal of you IDE

## git checkout backend
cd backend
node server.js

## git checkout frontend
no, do not delete backend, it will continue taking you to the frontend branch
cd frontend
npm install
npm run dev
click on the link
go to the url/"route"