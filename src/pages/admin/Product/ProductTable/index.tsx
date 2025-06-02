import React, { useState, useCallback } from "react";
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Button,
    Checkbox,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Toolbar,
    Pagination,
    CircularProgress
} from "@mui/material";
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import { getProductWithPage } from "@/services/Product.service";
import { debounce } from "lodash";
import { useEffect } from "react";
interface DataRow {
    id: number;
    stt: number;
    name: string;
    category: string;
    supplier: string;
    price: number;
    quantity: number;
    status: "active" | "inactive";
}

const ProductTable: React.FC = () => {
    const [data, setData] = useState<DataRow[]>([]);
    const [selected, setSelected] = useState<number[]>([]);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [sortBy, setSortBy] = useState("name");
    const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("ASC");
    const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
    const [isLoading, setIsLoading] = useState(false);
    const [tempRowsPerPage, setTempRowsPerPage] = useState(10);
    const [tempSortBy, setTempSortBy] = useState("name");
    const [tempSortDirection, setTempSortDirection] = useState<"ASC" | "DESC">("ASC");
    const [tempStatusFilter, setTempStatusFilter] = useState<"all" | "active" | "inactive">("all");

    const fetchData = useCallback(async (params: any) => {
        setIsLoading(true);
        try {
            const response = await getProductWithPage(params);
            if (response.statusCode === 200 && response.data) {
                const mappedData: DataRow[] = response.data.content.map((item: any, index: number) => ({
                    id: item.product.productId,
                    stt: (params.pageNo) * params.pageSize + index + 1,
                    name: item.product.name || "N/A",
                    category: item.category?.name || "N/A",
                    supplier: item.supplier?.name || "N/A",
                    price: item.product.price || 0,
                    quantity: item.inventory?.reduce((sum: number, inv: any) => sum + (inv.quantity || 0), 0) || 0
                }));
                setData(mappedData);
                setTotalPages(response.data.page.totalPages || 1);
            } else if (response.status === 204) {
                setData([]);
                setTotalPages(0);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            setData([]);
            setTotalPages(0);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const debouncedFetchData = useCallback(
        debounce((params) => fetchData(params), 300),
        [fetchData]
    );

    const handleApply = useCallback(() => {
        setRowsPerPage(tempRowsPerPage);
        setSortBy(tempSortBy);
        setSortDirection(tempSortDirection);
        setStatusFilter(tempStatusFilter);
        setPage(1);
        const params = {
            pageSize: tempRowsPerPage,
            pageNo: 0,
            sortBy: tempSortBy,
            sortDirection: tempSortDirection
        };
        debouncedFetchData(params);
    }, [tempRowsPerPage, tempSortBy, tempSortDirection, tempStatusFilter, debouncedFetchData]);

    useEffect(() => {
        const params = {
            pageSize: rowsPerPage,
            pageNo: page - 1,
            sortBy,
            sortDirection
        };
        debouncedFetchData(params);
        return () => {
            debouncedFetchData.cancel();
        };
    }, [page, rowsPerPage, sortBy, sortDirection, debouncedFetchData]);

    const handleChangePage = (
        event: React.ChangeEvent<unknown>,
        newPage: number
    ) => {
        setPage(newPage);
    };

    const handleTempRowsPerPageChange = (
        event: React.ChangeEvent<{ value: unknown }>
    ) => {
        setTempRowsPerPage(Number(event.target.value));
    };

    const handleTempStatusFilterChange = (
        event: React.ChangeEvent<{ value: unknown }>
    ) => {
        setTempStatusFilter(event.target.value as "all" | "active" | "inactive");
    };

    const handleTempSortChange = (
        event: React.ChangeEvent<{ value: unknown }>
    ) => {
        setTempSortBy(event.target.value as string);
    };

    const handleTempSortDirectionChange = (
        event: React.ChangeEvent<{ value: unknown }>
    ) => {
        setTempSortDirection(event.target.value as "ASC" | "DESC");
    };

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = data.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleSelect = (id: number) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: number[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    };

    const isSelected = (id: number) => selected.indexOf(id) !== -1;

    return (
        <Box sx={{ width: "100%", mt: 10 }}>
            <Paper
                sx={{ width: "100%", mb: 2, borderRadius: "8px", overflow: "hidden" }}
            >
                <Toolbar
                    sx={{
                        pl: { sm: 2 },
                        pr: { xs: 1, sm: 1 },
                        bgcolor: "#f5f5f5",
                        borderBottom: "1px solid #e0e0e0",
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                        <FormControl size="small" sx={{ minWidth: 120, mr: 2 }}>
                            <InputLabel id="rows-label">Số dòng</InputLabel>
                            <Select
                                labelId="rows-label"
                                id="rows-select"
                                value={tempRowsPerPage}
                                label="Số dòng"
                                onChange={handleTempRowsPerPageChange}
                            >
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={25}>25</MenuItem>
                                <MenuItem value={50}>50</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl size="small" sx={{ minWidth: 150, mr: 2 }}>
                            <InputLabel id="sort-label">Sắp xếp theo</InputLabel>
                            <Select
                                labelId="sort-label"
                                id="sort-select"
                                value={tempSortBy}
                                label="Sắp xếp theo"
                                onChange={handleTempSortChange}
                            >
                                <MenuItem value="name">Tên</MenuItem>
                                <MenuItem value="price">Giá</MenuItem>
                                <MenuItem value="inventory.quantity">Số lượng</MenuItem>
                                <MenuItem value="category.name">Danh mục</MenuItem>
                                <MenuItem value="supplier.name">Nhà cung cấp</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl size="small" sx={{ minWidth: 120, mr: 2 }}>
                            <InputLabel id="sort-direction-label">Hướng sắp xếp</InputLabel>
                            <Select
                                labelId="sort-direction-label"
                                id="sort-direction-select"
                                value={tempSortDirection}
                                label="Hướng sắp xếp"
                                onChange={handleTempSortDirectionChange}
                            >
                                <MenuItem value="ASC">Tăng dần</MenuItem>
                                <MenuItem value="DESC">Giảm dần</MenuItem>
                            </Select>
                        </FormControl>

                        <Box sx={{ flexGrow: 1 }} />

                        <Button
                            variant="contained"
                            sx={{
                                bgcolor: "#4caf50",
                                "&:hover": { bgcolor: "#388e3c" },
                                borderRadius: "4px",
                            }}
                            onClick={handleApply}
                        >
                            Áp dụng
                        </Button>
                    </Box>
                </Toolbar>

                <TableContainer>
                    {isLoading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                            <TableHead>
                                <TableRow sx={{ bgcolor: "#f9f9f9" }}>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            indeterminate={
                                                selected.length > 0 && selected.length < data.length
                                            }
                                            checked={data.length > 0 && selected.length === data.length}
                                            onChange={handleSelectAll}
                                        />
                                    </TableCell>
                                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                                        STT
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>Tên sản phẩm</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>Danh mục</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>Nhà cung cấp</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>Giá</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: "bold" }}>Số lượng</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: "bold" }}>Tùy chọn</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.length === 0 && !isLoading ? (
                                    <TableRow>
                                        <TableCell colSpan={8} align="center">
                                            Không có dữ liệu
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    data.map((row) => {
                                        const isItemSelected = isSelected(row.id);

                                        return (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.id}
                                                selected={isItemSelected}
                                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        checked={isItemSelected}
                                                        onClick={() => handleSelect(row.id)}
                                                    />
                                                </TableCell>
                                                <TableCell align="center">{row.stt}</TableCell>
                                                <TableCell>{row.name}</TableCell>
                                                <TableCell>{row.category}</TableCell>
                                                <TableCell>{row.supplier}</TableCell>
                                                <TableCell>{row.price.toLocaleString()} VND</TableCell>
                                                <TableCell align="center">{row.quantity}</TableCell>
                                                <TableCell align="center">
                                                    <IconButton
                                                        color="primary"
                                                        size="small"
                                                        sx={{
                                                            bgcolor: "#e3f2fd",
                                                            mr: 1,
                                                            "&:hover": { bgcolor: "#bbdefb" },
                                                        }}
                                                    >
                                                        <EditIcon fontSize="small" />
                                                    </IconButton>
                                                    <IconButton
                                                        color="error"
                                                        size="small"
                                                        sx={{
                                                            bgcolor: "#ffebee",
                                                            "&:hover": { bgcolor: "#ffcdd2" },
                                                        }}
                                                    >
                                                        <DeleteIcon fontSize="small" />
                                                    </IconButton>
                                                    <IconButton size="small">
                                                        <MoreVertIcon fontSize="small" />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })
                                )}
                            </TableBody>
                        </Table>
                    )}
                </TableContainer>
                {!isLoading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={handleChangePage}
                            color="primary"
                            showFirstButton
                            showLastButton
                        />
                    </Box>
                )}
            </Paper>
        </Box>
    );
};

export default ProductTable