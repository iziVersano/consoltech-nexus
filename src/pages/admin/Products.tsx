import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { getProducts, deleteProduct, isAuthenticated, type Product } from '@/lib/api';
import { toast } from 'sonner';
import { Plus, Edit, Trash2, Loader2 } from 'lucide-react';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/admin/login');
      return;
    }
    loadProducts();
  }, [navigate]);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      toast.error('Failed to load products');
      console.error('Error loading products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteProduct(deleteId);
      toast.success('Product deleted successfully');
      setProducts(products.filter((p) => p.id !== deleteId));
      setDeleteId(null);
    } catch (error) {
      toast.error('Failed to delete product');
      console.error('Error deleting product:', error);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Products</h1>
            <p className="text-muted-foreground">Manage your product catalog</p>
          </div>
          <Button asChild className="btn-primary">
            <Link to="/admin/products/new">
              <Plus className="h-4 w-4" />
              <span>Add Product</span>
            </Link>
          </Button>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {products.length === 0 ? (
            <div className="bg-card border border-border rounded-lg p-8 text-center text-muted-foreground">
              No products found. Add your first product to get started.
            </div>
          ) : (
            products.map((product) => (
              <div key={product.id} className="bg-card border border-border rounded-lg p-4">
                <div className="flex gap-4">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-20 h-20 object-cover rounded flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{product.title}</h3>
                    <span className="bg-accent text-accent-foreground px-2 py-0.5 rounded-full text-xs inline-block mt-1">
                      {product.category}
                    </span>
                    <p className="text-lg font-bold mt-1">${product.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-3 pt-3 border-t border-border">
                  <Button asChild variant="outline" size="sm" className="flex-1">
                    <Link to={`/admin/products/edit/${product.id}`}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-destructive border-destructive hover:bg-destructive/10"
                    onClick={() => setDeleteId(product.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block bg-card border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No products found. Add your first product to get started.
                  </TableCell>
                </TableRow>
              ) : (
                products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{product.title}</TableCell>
                    <TableCell>
                      <span className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs">
                        {product.category}
                      </span>
                    </TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          asChild
                          variant="ghost"
                          size="sm"
                        >
                          <Link to={`/admin/products/edit/${product.id}`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeleteId(product.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the product
              from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default Products;

