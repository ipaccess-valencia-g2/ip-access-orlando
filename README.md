# ip-access-orlando

Step 1: Create Local MySQL Database
Each team member must create a local MySQL database named 'ip_access'. You can do this in one of two ways:
Option A: Using Command Prompt (MySQL Terminal)

1. Open your terminal (Command Prompt, Terminal, or Git Bash).
2. Log into MySQL by typing:
   mysql -u root -p
3. Enter your MySQL password when prompted.
4. Once you're in the MySQL shell, create the database:
   CREATE DATABASE ip_access;
5. Exit MySQL with:
   exit

Option B: Using MySQL Workbench

1. Open MySQL Workbench and connect to your local MySQL server.
2. Open a new SQL query tab.
3. Run the following command:
   CREATE DATABASE ip_access;
4. On the left sidebar (under SCHEMAS), find 'ip_access'.
5. Right-click on it and select 'Set as Default Schema'.

Step 2: Import the init.sql File

1. Open the 'init.sql' file located in /backend/db/init.sql in MySQL Workbench 
2. Make sure 'ip_access' is still set as the default schema.
3. Execute the full script.
   This will create all the required tables and insert sample data.
4. If the 'Run All' button is greyed out, right-click on 'ip_access' in the left sidebar and click 'Set as Default Schema' again.

Step 3: Verify the Tables Were Created

1. In MySQL Workbench, expand the 'ip_access' schema.
2. Expand the 'Tables' section. You should see:
   - users
   - reservations
   - admin_logs
   - locations
   - reasons

Step 4: Commit to the GitHub branch
1. cd ip-access-orlando (if not already there)
2. git checkout backend (if not already there)
3. git add backend
4. git commit -m "Notes..."
5. git push origin backend
6. No pull request required, unless merging into the "main" branch


