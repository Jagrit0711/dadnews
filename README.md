# 👨‍👦 Dad News

> *"Underdog Team Wins Championship in Stunning Upset — this is critical reading!"*  
Welcome to **Dad News** – a quirky, Gen-Z-friendly news site that makes staying informed actually fun. No more boring headlines and cluttered layouts — just curated content that *dad approves* and sends your way with hilarious, random comments.

🟢 [Visit Live Site](https://dadnews.vercel.app/)  
📦 [View Source Code](https://github.com/Jagrit0711/dadnews)

---

## 🧠 What Is Dad News?

**Dad News** is a playful news delivery platform where *each news article is reviewed and approved manually* in the backend before it reaches readers. Think of it as a fun take on content moderation, where "dad" ensures you only see quality (and often critical!) reads.

We’re not trying to replace news giants — we’re trying to make you laugh, think, and stay informed without the pressure.

### 🔑 Highlights:
- 🧓 **Dad-curated content**: News only shows after dad approves it.
- 💬 **Random dad messages**: From _"READ IT!"_ to _"Save this one, it's gold."_
- 📱 **Mobile-friendly, GenZ UI**: Clean design with zero clutter.
- ⏳ **Read at your own pace**: Dad’s got your back — no doomscrolling here.

---

## 🖼️ Screenshot

> *(Add screenshot here or use a hosted image)*

![Dad News Preview](https://dadnews.vercel.app/ogimage.png)

---

## 🛠️ Tech Stack

| Layer         | Tech                     |
|---------------|--------------------------|
| Frontend      | Next.js + Tailwind CSS   |
| Backend       | Firebase / Admin Panel (custom logic for approval) |
| Deployment    | Vercel                   |
| Hosting & DB  | Firebase (Firestore) / JSON API *(optional for local testing)* |

---

## ⚙️ How It Works

1. **Upload News**  
   A new article (headline, summary, source link) is utomatically added through a new api.

2. **Dad Reviews**  
   The article is hidden by default until approved by the admin (*a.k.a. dad*).

3. **Frontend Displays**  
   Once approved, it shows on the homepage with a random dad message like:
   - `"READ IT LATER – trust me!"`
   - `"Dad says: This is critical reading!"`
   - `"Don’t skip this one, champ."`

4. **Readers Chill & Browse**  
   Readers can browse these fun but insightful news articles without distractions.

---

## 🔧 Getting Started

To run Dad News locally:

### 1. Clone the Repo
```bash
git clone https://github.com/Jagrit0711/dadnews.git
cd dadnews

note: the live url doesn't work it just basic u need to download and clone the repo then run it on local host to see the news and all cu the api provider doesn't support live url it only supports local host for the free plan 