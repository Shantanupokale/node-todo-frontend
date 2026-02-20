const BASE_URL = `${import.meta.env.VITE_BASE_URL}/api/categories`;

const getCategories = async () => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return await res.json();
};

const createCategory = async ({name , display_name}) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name , display_name }),
  });
  if (!res.ok) throw new Error("Failed to create category");
  return await res.json();
};

export const CategoryService = {
  getCategories,
  createCategory
};