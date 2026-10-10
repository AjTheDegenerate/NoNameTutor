"use client";

import React from "react";

const scientificPattern = /(?:\b[A-Za-zΔπ][A-Za-z0-9_₀-₉²³⁻¹⁻²]*\s*(?:=|∝|→|≤|≥|≠|≈)\s*[A-Za-z0-9Δπ₀-₉²³⁻¹⁻².+\-−×*/()^]+(?:\s*[+−×/]\s*[A-Za-z0-9Δπ₀-₉²³⁻¹⁻².+\-−×*/()^]+)*)|(?:\b\d+(?:\.\d+)?\s?(?:m\/s²|m\/s|m s⁻²|m s⁻¹|km\/h|kg|m|s|N|J|W|cm|mm|kW)\b)/g;

function toMathMarkup(value) {
  const source = String(value ?? "")
    .replace(/[₀-₉]/g, (digit) => "_{" + "₀₁₂₃₄₅₆₇₈₉".indexOf(digit) + "}")
    .replace(/²/g, "^{2}").replace(/³/g, "^{3}")
    .replace(/⁻¹/g, "^{-1}").replace(/⁻²/g, "^{-2}")
    .replace(/½/g, "\\frac{1}{2}").replace(/\b1\/2\b/g, "\\frac{1}{2}")
    .replace(/π/g, "\\pi").replace(/×/g, "\\times ")
    .replace(/[−–]/g, "-").replace(/Δ/g, "\\Delta ")
    .replace(/≤/g, "\\le ").replace(/≥/g, "\\ge ")
    .replace(/≠/g, "\\ne ").replace(/≈/g, "\\approx ")
    .replace(/→/g, "\\to ");
  const known = new Set(["MA", "F_net", "m_system", "v_avg", "a_avg", "K1", "U1", "K2", "U2", "T1", "T2", "F1", "F2", "m1", "m2", "v1", "v2", "u1", "u2", "x1", "x2", "t1", "t2"]);
  const expression = source
    .replace(/([A-Za-z]+(?:_[A-Za-z0-9]+)?)/g, (token) => {
      if (token === "MA") return "\\mathrm{MA}";
      if (/^[A-Za-z][0-9]+$/.test(token)) return token[0] + "_{" + token.slice(1) + "}";
      if (known.has(token)) return token.replace(/_([A-Za-z0-9]+)/g, "_{\\mathrm{$1}}");
      if (token.length === 1) return token;
      return "\\text{" + token + "}";
    })
    .replace(/ /g, "\\ ");
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