# 🗺️ India Map – Fortis Hospital Locations

This project displays an **interactive map of India** that highlights **Fortis hospital locations** across various states. It allows users to visualize state-wise hospital data, view detailed information on hover or click, and navigate easily through a clean and responsive UI.

---

## 🚀 Live Demo  
🔗 **[View Deployed Site](https://suyashsahu1.github.io/FortisConnect_DynamicMap/)**

---

## 📖 Features

- 🗺️ **Interactive India Map** using [`react-simple-maps`](https://www.react-simple-maps.io/).  
- 📍 **Markers** showing Fortis hospital locations.  
- 🧭 **Hover effects** for highlighting states and showing hospital counts.  
- 📋 **Scrollable list view** of cities and hospitals with custom scrollbar styling.  
- ⚙️ **Optimized rendering** using React hooks (`useMemo`, `useState`) for performance.  
- 📊 **Dynamic counts** of hospitals shown in the top bar.  
- 🌗 **Responsive design** for smooth desktop and tablet experience.

---

## 🧰 Tech Stack

| Technology | Purpose |
|-------------|----------|
| **React.js (v18)** | UI framework |
| **React Simple Maps** | SVG-based map rendering |
| **React Router DOM** | Navigation and routing |
| **GH Pages** | Deployment on GitHub Pages |
| **CSS / Custom Scrollbar Styling** | UI enhancements |

---

## ⚙️ Installation and Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/suyashsahu1/FortisConnect_DynamicMap.git
cd FortisConnect_DynamicMap
````

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Start the development server

```bash
npm start
```

Your app will be running on [http://localhost:3000](http://localhost:3000)

### 4️⃣ Build for production

```bash
npm run build
```

### 5️⃣ Deploy to GitHub Pages

```bash
npm run deploy
```

> The project automatically builds before deployment using the `predeploy` script.

---

## 🗂️ Project Structure

```
FortisConnect_DynamicMap/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── IndiaMap.js        # Interactive India map component
│   │   ├── CityList.js        # List of cities and hospitals
│   │   └── TopBar.js          # Top bar with hospital counts
│   ├── data/
│   │   ├── geoJson.json       # GeoJSON data for India map
│   │   └── locationData.js    # Fortis hospital locations
│   ├── App.js
│   ├── index.js
│   └── App.css
├── package.json
└── README.md
```

---

## 🏥 Location Data Format

The `locationData.js` file stores hospital information:

```javascript
export const locations = [
  {
    state: "Maharashtra",
    cities: [
      { name: "Mumbai", hospitals: 4 },
      { name: "Pune", hospitals: 2 }
    ]
  },
  {
    state: "Delhi NCR",
    cities: [
      { name: "Gurgaon", hospitals: 3 },
      { name: "Noida", hospitals: 2 }
    ]
  },
];
```

---

## 🎨 Scrollbar Styling

Custom scrollbar for city list:

```css
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-thumb {
  background-color: #D1DAE7;
  border-radius: 60px;
  opacity: 0.6;
}
```

---

## 🧑‍💻 Developer Notes

* Ensure all coordinates in `locationData.js` are accurate for proper marker placement.
* Optimize JSON parsing using `useMemo()` for faster state-based lookups.
* Avoid re-rendering the map unnecessarily by memoizing computed values.

---

## 📦 Deployment Details

* Hosted via **GitHub Pages**
* Configured with:

  ```json
  "homepage": "https://suyashsahu1.github.io/FortisConnect_DynamicMap/"
  ```
* Deployed using `gh-pages` library.

---

## 🪪 License

This project is for **educational and demo purposes** to visualize Fortis Hospital locations across India.
All hospital data and logos belong to **Fortis Healthcare Limited**.

