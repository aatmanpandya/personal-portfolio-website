// Single source of truth for the site's pages. Each page is a "layer" in the
// forward pass — index drives both the neural background's activation
// position and the layer_n labels used throughout the UI.
export const PAGES = [
  { path: "/", index: 0, layerName: "input", navLabel: "Home" },
  { path: "/journey", index: 1, layerName: "origin", navLabel: "Journey" },
  { path: "/projects", index: 2, layerName: "activations", navLabel: "Projects" },
  { path: "/skills", index: 3, layerName: "weights", navLabel: "Skills" },
  { path: "/contact", index: 4, layerName: "output", navLabel: "Contact" },
];
