import { getCategories } from "@/actions/categories.actions";
import CategoryCard from "@/components/dashboard/createCategory/Categorycard";
import CategoryForm from "@/components/dashboard/createCategory/CategoryForm";

export default async function CategoriesManagementPage() {
  const result = await getCategories();

  if (result.error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-red-500 bg-red-50 border border-red-200 rounded-lg p-4">
            {result.error.message}
          </p>
        </div>
      </div>
    );
  }

  const categories = Array.isArray(result.data?.data) ? result.data.data : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold text-gray-900">
              Categories Management
            </h1>
            <CategoryForm />
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {categories.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <p className="text-gray-500 text-lg">No categories found</p>
            <p className="text-gray-400 text-sm mt-2">
              Click "Add Category" to create your first category
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category: any) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}