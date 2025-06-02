import { useEffect, useState } from 'react';
import {
  getSuppliersPaging,
  getSupplierById,
  getSupplierByEmail,
  createSupplier,
  deleteSupplier,
  updateSupplier
} from '@/services/Supplier.service';

function useSupplier(page: number) {
  const [suppliers, setSuppliers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchSuppliers = async () => {
    setLoading(true);
    const response = await getSuppliersPaging(page - 1);
    if (response.success) {
      setSuppliers(response.data.content);
      setTotalPages(response.data.totalPages);
    }
    setLoading(false);
  };

  const searchSupplier = async (type: 'supplierId' | 'email', keyword: string) => {
    setLoading(true);
    let result;
    if (type === 'supplierId') {
      result = await getSupplierById(keyword);
      console.log(result);
    } else {
      result = await getSupplierByEmail(keyword);
    }

    if (result.success) {
      setSuppliers([result.data]);
      setTotalPages(1);
    } else {
      setSuppliers([]);
      setTotalPages(1);
    }
    setLoading(false);
  };

  const create = async (data: any) => {
    return await createSupplier(data);
  };

  const update = async (supplierId: string, data: any) => {
    return await updateSupplier(supplierId, data);
  };

  const remove = async (supplierId: string) => {
    return await deleteSupplier(supplierId);
  };

  useEffect(() => {
    fetchSuppliers();
  }, [page]);

  return {
    suppliers,
    totalPages,
    loading,
    fetchSuppliers,
    searchSupplier,
    create,
    update,
    remove
  };
}

export default useSupplier;
