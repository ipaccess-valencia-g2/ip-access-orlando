Commit to the GitHub branch

cd ip-access-orlando (if not already there)
git checkout backend (if not already there)
git pull origin backend
if you are working on an individual task: 
    git checkout -b yourname/route-name (eg. reservations, authorization)
        work on your route file
        test route locally with postman
git add . OR git add backend OR git add backend/routes/reservations.js
git commit -m "Notes..."
git push origin backend OR git push origin yourname/route-name
    Create a pull request into main and tag @LaVonne for review, if needed


