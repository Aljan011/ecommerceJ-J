import { useProductByIdQuery } from "@/lib";

interface Props {
    productId: string;
}

export default function ProductDetail({ productId }: Props) {
  const { data: product, isLoading, isError } =
    useProductByIdQuery(productId);

  if (isLoading) return <p>Loading product...</p>;
  if (isError || !product) return <p>Failed to load product</p>;

  return (
    <div className="space-y-4 p-6 border rounded">
      <h1 className="text-2xl font-bold">{product.name}</h1>

      {product.description && (
        <p className="text-gray-700">{product.description}</p>
      )}

      <div className="mt-4 space-y-2">
        <h2 className="font-semibold">Variants</h2>
        {product.variants.length === 0 && <p>No variants available</p>}
        {product.variants.map((variant) => (
          <div
            key={variant.id}
            className="rounded bg-gray-50 p-2 text-sm border"
          >
            <p>Price: ${variant.price}</p>
            <p>Stock: {variant.stock}</p>
             {/* {variant.attributes && (
              <div className="text-xs text-gray-500">
                {Object.entries(variant.attributes).map(([key, value]) => (
                  <span key={key} className="mr-2">
                    {key}: {value} 
                  </span>
                ))}
              </div>
            )} */}
          </div>
        ))}
      </div>
    </div>
  );
}