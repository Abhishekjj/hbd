# 🎂 Happy Birthday Interactive Web Card 🎉

An interactive, animated digital birthday card experience inspired by [AnshumanMahato/Happy-Birthday-Card](https://github.com/AnshumanMahato/Happy-Birthday-Card), engineered with **zero build steps** so you can deploy it directly to **GitHub Pages**, **Vercel**, or **Netlify** instantly!

---

## ✨ Features & Storyline

1. **Scene 1 (Dark Room):**
   - The screen is black with glowing typewriter text.
   - Prompts the recipient by name to switch on the lights.
   - Pulsating light bulb button with authentic switch sound effect.
2. **Scene 2 (Empty Room):**
   - Lights turn on, revealing an empty room.
   - "Why is it so empty here? Let's check outside..."
   - Door button appears.
3. **Scene 3 (Spooky Hallway):**
   - Creaking door sound + eerie ambient sound.
   - "Maybe it's a bit late... things are creepy here, let's head back inside!"
4. **Scene 4 (Gift Room):**
   - A mysterious festive gift box appears with a beating heart animation.
5. **Scene 5 (The Big Surprise!):**
   - Party blast explosion + white flash overlay.
   - Upbeat celebration music starts playing (with audio mute/unmute control).
   - High-performance canvas confetti pops across the screen.
   - Swaying party buntings and floating balloons on both sides.
   - Vintage parchment scroll opens with personalized heartfelt wishes.
   - **Showcase Birthday Card:**
     - Profile picture framed in a glowing, rotating golden ring with a cute party cap.
     - Multi-tiered cake with animated flickering candle flames.
     - Interactive **"🎂 Blow Candles"** button (extinguishes flames with a puff effect!).
     - **"🎊 More Confetti"** and **"🔄 Replay Story"** buttons.

---

## 🚀 How to Upload & Deploy to GitHub (Step-by-Step)

### Option A: Using GitHub Website (Fastest — 2 Minutes)
1. Go to [GitHub.com](https://github.com) and click **New Repository**.
2. Name it something like `happy-birthday` and keep it **Public**.
3. In the repository page, click **"Add file" > "Upload files"**.
4. Drag and drop all the files from this folder (`index.html`, `style.css`, `script.js`, `config.js`, `README.md`, and the `.github` folder) and click **Commit changes**.
5. Go to your repository **Settings** > **Pages** (in the left sidebar).
6. Under **Build and deployment**:
   - **Source:** Select **GitHub Actions** (the included `.github/workflows/deploy.yml` will automatically build and publish it within 1 minute!).
   - *OR* select **Deploy from a branch** > branch: `main` > folder: `/ (root)` > Save.
7. Your live link will appear at:  
   `https://<your-github-username>.github.io/<repo-name>/`

---

### Option B: Using Git CLI
```bash
git init
git add .
git commit -m "Initial commit: Happy Birthday Card"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

---

## 🎨 How to Personalize for Your Friend

### Method 1: Edit `config.js`
Open `config.js` and modify:
```javascript
window.BIRTHDAY_CONFIG = {
  name: "Alex",                         // Birthday person's name
  nickname: "Rockstar 🌟",              // Nickname / title
  pic: "./my-photo.jpg",                // Image path or online image URL
  hbdMsg: "Wishing you an amazing year!", // Short greeting
  scrollMsg: "Your heartfelt letter...", // Parchment scroll letter
  showScrollMessage: true,              // Show scroll letter before card
  scrollDurationSeconds: 8,             // How long scroll stays visible
};
```

### Method 2: Share via Instant URL Parameters (No code editing needed!)
You can send different personalized links to different people from the **same deployed site**!
```
https://<your-username>.github.io/<repo-name>/?name=Emma&nickname=Sweetheart&pic=https://i.imgur.com/example.jpg&msg=Happy+Birthday!
```
Supported URL parameters:
- `name`: Recipient's name
- `nickname`: Nickname shown under the title
- `pic`: Image URL
- `msg`: Short wish on the card
- `scroll`: Heartfelt scroll letter content

---

## 📁 File Structure
```
├── .github/
│   └── workflows/
│       └── deploy.yml      # Automatic GitHub Pages deployment
├── index.html              # Main HTML markup
├── style.css               # Styling, responsive layout & keyframe animations
├── config.js               # User customization options
├── script.js               # Audio, scene transitions & confetti physics engine
└── README.md               # Deployment and customization guide
```
