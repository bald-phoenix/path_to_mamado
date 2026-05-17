@import url("https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700;9..144,900&family=JetBrains+Mono:wght@400;500;700&family=Nunito+Sans:wght@400;500;600;700&display=swap");

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --font-display: "Fraunces", Georgia, serif;
  --font-body: "Nunito Sans", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", monospace;
}

html,
body {
  background: #f5f1e8;
  color: #1a1814;
  font-family: var(--font-body);
}

/* Textura sutil de papel */
body::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  opacity: 0.4;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/><feColorMatrix values='0 0 0 0 0.4 0 0 0 0 0.35 0 0 0 0 0.25 0 0 0 0.08 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
}

main {
  position: relative;
  z-index: 1;
}

/* Animación de check */
@keyframes drawCheck {
  from {
    stroke-dashoffset: 24;
  }
  to {
    stroke-dashoffset: 0;
  }
}

.check-anim path {
  stroke-dasharray: 24;
  animation: drawCheck 0.3s ease-out forwards;
}

/* Fade in para los días */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-up {
  animation: fadeUp 0.4s ease-out forwards;
}
