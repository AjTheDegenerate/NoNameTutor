"use client";

import React from "react";

const scientificPattern = /(?:\b[A-Za-zΔπ](?:_[A-Za-z0-9]+)?[₀-₉]?\s*(?:=|∝|→|≤|≥|≠)\s*[A-Za-z0-9Δπ₀-₉²³⁻¹⁻².+\-−×*/()^]+(?:\s*[+−×/]\s*[A-Za-z0-9Δπ₀-₉²³⁻¹⁻².+\-−×*/()^]+)*)|(?:\d+(?:\.\d+)?\s?(?:m\/s²|m\/s|m s⁻²|m s⁻¹|km\/h|kg|m|s|N|J|W|cm|mm|kW))/g;

function toMathMarkup(value) {
  const variables = new Set(["A", "F", "F_net", "MA", "K", "K1", "K2", "U", "U1", "U2", "T", "T1", "T2", "F1", "F2", "m", "m1", "m2", "m_system", "v", "v1", "v2", "v_avg", "u", "u1", "u2", "a", "a_avg", "s", "x", "x1", "x2", "t", "t1", "t2", "R", "g", "Δx", "Δt", "Δv"]);
  const units = new Set(["m", "s", "kg", "km", "cm", "mm", "h", "N", "J", "W", "Pa"]);
  const expression = String(value ?? "")
    .replace(/[−–]/g, "-")
    .replace(/Δ/g, "\\Delta ")
    .replace(/π/g, "\\pi ")
    .replace(/×/g, "\\times ")
    .replace(/→/g, "\\to ")
    .replace(/≤/g, "\\le ")
    .replace(/≥/g, "\\ge ")
    .replace(/≠/g, "\\ne ")
    .replace(/≈/g, "\\approx ")
    .replace(/²/g, "^{2}")
    .replace(/½/g, "\\frac{1}{2}")
    .replace(/\b1\/2\b/g, "\\frac{1}{2}")
    .replace(/³/g, "^{3}")
    .replace(/⁻¹/g, "^{-1}")
    .replace(/⁻²/g, "^{-2}")
    .replace(/₀/g, "_{0}").replace(/₁/g, "_{1}").replace(/₂/g, "_{2}")
    .replace(/₃/g, "_{3}").replace(/₄/g, "_{4}").replace(/₅/g, "_{5}")
    .replace(/₆/g, "_{6}").replace(/₇/g, "_{7}").replace(/₈/g, "_{8}").replace(/₉/g, "_{9}")
    .replace(/([A-Za-z]+)_([A-Za-z0-9]+)/g, "$1_{$2}")
    .replace(/(?<!\\)([A-Za-z]+(?:_\{[A-Za-z0-9]+\})?)/g, (token) => {
      const plain = token.replace(/_\{([^}]+)\}/g, "_$1");
      if (plain === "MA") return "\\mathrm{MA}";
      if (variables.has(plain)) return token;
      if (units.has(plain)) return "\\mathrm{" + plain + "}";
      if (plain.length === 1) return plain;
      return "\\text{" + plain + "}";
    })
    .replace(/\bat\b/g, "a\\,t")
    .replace(/\s+/g, "\\ ");
  return "\\(" + expression + "\\)";
}

export default function ScientificText({ value }) {
  const chunks = String(value ?? "").split(/(\$[^$]+\$)/g);
  return chunks.map((chunk, chunkIndex) => {
    if (chunk.startsWith("$") && chunk.endsWith("$")) return <React.Fragment key={"raw" + chunkIndex}>{chunk}</React.Fragment>;
    const matches = [...chunk.matchAll(scientificPattern)];
    if (!matches.length) return <React.Fragment key={"text" + chunkIndex}>{chunk}</React.Fragment>;
    const nodes = [];
    let cursor = 0;
    matches.forEach((match, matchIndex) => {
      if (match.index > cursor) nodes.push(<React.Fragment key={"t" + chunkIndex + "-" + matchIndex}>{chunk.slice(cursor, match.index)}</React.Fragment>);
      nodes.push(<span className="math-inline" key={"m" + chunkIndex + "-" + matchIndex}>{toMathMarkup(match[0])}</span>);
      cursor = match.index + match[0].length;
    });
    if (cursor < chunk.length) nodes.push(<React.Fragment key={"end" + chunkIndex}>{chunk.slice(cursor)}</React.Fragment>);
    return <React.Fragment key={"parsed" + chunkIndex}>{nodes}</React.Fragment>;
  });
}
