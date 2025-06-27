Getting Started

git clone https://github.com/ipaccess-valencia-g2/ip-access-orlando.git
cd ip-access-orlando
git checkout mobile
cd mobile
npm install
npx expo start

save local project
git add mobile
(git status -- if you want to check what you are uploading)
git commit -m "Notes..."
git push origin mobile

testing and having port issues? cmd >> set RCT_METRO_PORT=[8084, or another unoccupied port], npx expo start 
wifi issues? make sure phone and computer are on the same network, and then try npx expo start --tunnel
