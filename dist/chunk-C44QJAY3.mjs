// src/utils/generate-slug.ts
function GenerateSlug(text) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
}

export {
  GenerateSlug
};
