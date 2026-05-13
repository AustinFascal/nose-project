# Nosè (Node Safe) Walkthrough

## 1. Introduction

Welcome to **Nosè (Node Safe)** – a high‑fidelity interactive prototype designed to help users detect and respond to digital scams in real‑time. The app simulates common fraudulent interactions across WhatsApp and phone calls, offering a **Floating Panic Button** that instantly activates protective workflows.

## 2. Getting Started

1. **Clone the repository** (if you haven’t already):
   ```bash
   git clone https://github.com/your-org/nose-project.git
   cd nose-project
   ```
2. **Install dependencies**:
   ```bash
   npm i
   ```
3. **Run the development server**:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`.

## 3. Core Experience – The Floating Panic Button

- A **red floating bubble** is always visible in the bottom‑right corner of the UI (unless an alert screen is open).
- **Tap** the bubble to bring up the **Panic Activation** menu where you can select:
  - **Screenshot** – captures the current screen and opens the Alert flow.
  - **Audio** – starts live audio monitoring during a phone call.

## 4. Guided Scenarios

### Scenario 1 – WhatsApp Job Scam
1. Open the **WhatsApp** tab (bottom navigation → **WhatsApp**).
2. Scroll through the chat until you encounter a suspicious message (e.g., “Earn RM 800/day – send RM 200 now”).
3. Tap the **Floating Panic Button** → choose **Screenshot**.
4. The app automatically captures the chat screen, switches to the **Alert** view, and displays a risk assessment.
5. Follow the on‑screen recommendations (e.g., block the contact, report to WhatsApp).

### Scenario 2 – Suspicious Call
1. Switch to the **Phone** tab.
2. Simulated call screen appears with a fake “Bank Officer” caller.
3. While the call is active, press the **Floating Panic Button** → choose **Audio**.
4. The app begins real‑time audio analysis, displays a visual waveform, and alerts you if suspicious phrases are detected.
5. End the call; the app will suggest steps such as contacting your bank’s fraud line.

## 5. Post‑Incident Response

- **Alert Screen** – Shows a concise risk score, visual cue (green/yellow/red), and actionable buttons:
  - **Block** – disables the offending contact.
  - **Report** – opens a pre‑filled report template for WhatsApp/Phone providers.
  - **Guardian Action** – sends a summary (including screenshot/audio) to a pre‑configured trusted contact (e.g., family member).

## 6. Educational Modules (Learn Tab)

- Navigate to **Learn** via the bottom navigation.
- Explore a series of short lessons on:
  - Social engineering tactics.
  - How to verify official communications.
  - Regional scam statistics.
- Each lesson includes interactive quizzes; completing all three unlocks the **Trusted Guardian Badge**.

## 7. Statistics & Trends

- The **Stats** tab aggregates anonymized data from simulated interactions.
- View charts for:
  - Most common scam types (job offers, fake deliveries, banking fraud).
  - Geographic heat‑maps of reported incidents.
- Use these insights to stay informed about emerging threats in your area.

---

### Verification Checklist
- [ ] Walkthrough steps launch the app correctly.
- [ ] Panic Button triggers both screenshot and audio flows.
- [ ] Alert screen displays risk assessment and actionable buttons.
- [ ] Learn tab content matches UI labels.
- [ ] Stats tab visualizations load without errors.

Feel free to follow this guide step‑by‑step to experience the full capabilities of **Nosè**.
