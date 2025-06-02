import React from "react";
import { useEffect, useState } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import WorkIcon from "@mui/icons-material/Work";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";

const lineData = [
    { name: "10am", value: 55 },
    { name: "11am", value: 33 },
    { name: "12pm", value: 62 },
    { name: "01pm", value: 52 },
    { name: "02pm", value: 88 },
    { name: "03pm", value: 44 },
    { name: "04pm", value: 57 },
    { name: "05pm", value: 36 },
    { name: "06pm", value: 64 },
    { name: "07pm", value: 85 },
];

const pieData = [
    { name: "Sale", value: 40 },
    { name: "Distribute", value: 30 },
    { name: "Return", value: 30 },
];

const COLORS = ["#3f51b5", "#ffeb3b", "#ff7043"];

interface StatsType {
    savedProducts: number;
    stockProducts: number;
    salesProducts: number;
    jobApplications: number;
}

const StatisticTemplate = () => {
    const [stats, setStats] = useState<StatsType | null>(null);

    useEffect(() => {
        setStats({
            savedProducts: 178,
            stockProducts: 20,
            salesProducts: 190,
            jobApplications: 12,
        });
    }, []);

    if (!stats) return <div>Loading...</div>;

    const items = [
        {
            icon: <FavoriteIcon fontSize="large" />,
            number: stats.savedProducts,
            label: "Save Products",
            bgColor: "#e6f0ff",
            iconColor: "#3b82f6",
        },
        {
            icon: <InventoryIcon fontSize="large" />,
            number: stats.stockProducts,
            label: "Stock Products",
            bgColor: "#fff7e6",
            iconColor: "#facc15",
        },
        {
            icon: <ShoppingBagIcon fontSize="large" />,
            number: stats.salesProducts,
            label: "Sales Products",
            bgColor: "#fff1f0",
            iconColor: "#fb7185",
        },
        {
            icon: <WorkIcon fontSize="large" />,
            number: stats.jobApplications,
            label: "Job Application",
            bgColor: "#f3f0ff",
            iconColor: "#8b5cf6",
        },
    ];
    return (
        <Box
            sx={{
                backgroundColor: "rgb(224, 229, 242)",
                p: 2,
            }}
        >
            {/* Grid 1: */}
            <Grid
                container
                spacing={2}
                mb={2}
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                {items.map((item, index) => (
                    <Grid item xs={6} sm={6} md={4} lg={3} xl={2} key={index}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                width: "100%",
                                height: "100%",
                                textAlign: "center",
                                borderRadius: 2,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                boxSizing: "border-box",
                            }}
                        >
                            <Box
                                sx={{
                                    width: 50,
                                    height: 50,
                                    mr: 2,
                                    borderRadius: "50%",
                                    backgroundColor: item.bgColor,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Box sx={{ color: item.iconColor }}>{item.icon}</Box>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                    justifyContent: "center",
                                }}
                            >
                                <Typography variant="h6" fontWeight="bold">
                                    {item.number}+
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {item.label}
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            {/* Grid 2: 60% - 40% */}
            <Grid
                container
                spacing={2}
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
                mb={2}
            >
                <Grid item xs={12} md={7} sx={{ width: "58%" }}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            width: "100%",
                            minWidth: "100%",
                            boxSizing: "border-box",
                            position: "relative",
                        }}
                    >
                        <Typography variant="h6" mb={2}>
                            Reports
                        </Typography>
                        <ResponsiveContainer width="100%" height={250} minWidth={300}>
                            <LineChart data={lineData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis domain={[0, 100]} />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="url(#gradient)"
                                    strokeWidth={4}
                                    dot={false}
                                />
                                <defs>
                                    <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                                        <stop offset="0%" stopColor="#3fb8ff" />
                                        <stop offset="50%" stopColor="#a34de3" />
                                        <stop offset="100%" stopColor="#ff4ad4" />
                                    </linearGradient>
                                </defs>
                            </LineChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

                <Grid
                    item
                    xs={12}
                    md={5}
                    sx={{ height: "100%", width: { md: "40%" } }}
                >
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            textAlign: "center",
                            width: "100%",
                            minWidth: "100%",
                            boxSizing: "border-box",
                        }}
                    >
                        <Typography variant="h6" mb={2}>
                            Analytics
                        </Typography>
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            position="relative"
                        >
                            <ResponsiveContainer width="100%" height={214} minWidth={200}>
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        innerRadius={60}
                                        outerRadius={80}
                                        startAngle={90}
                                        endAngle={-270}
                                        paddingAngle={3}
                                        dataKey="value"
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={COLORS[index % COLORS.length]}
                                            // cornerRadius={20}
                                            />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <Box
                                position="absolute"
                                textAlign="center"
                                sx={{
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                }}
                            >
                                <Typography variant="h5" fontWeight="bold">
                                    80%
                                </Typography>
                                <Typography variant="body2">Transactions</Typography>
                            </Box>
                        </Box>

                        <Box display="flex" justifyContent="space-around" mt={2}>
                            <Box display="flex" alignItems="center">
                                <Box
                                    width={12}
                                    height={12}
                                    bgcolor={COLORS[0]}
                                    mr={1}
                                    borderRadius="50%"
                                />
                                <Typography variant="body2">Sale</Typography>
                            </Box>
                            <Box display="flex" alignItems="center">
                                <Box
                                    width={12}
                                    height={12}
                                    bgcolor={COLORS[1]}
                                    mr={1}
                                    borderRadius="50%"
                                />
                                <Typography variant="body2">Distribute</Typography>
                            </Box>
                            <Box display="flex" alignItems="center">
                                <Box
                                    width={12}
                                    height={12}
                                    bgcolor={COLORS[2]}
                                    mr={1}
                                    borderRadius="50%"
                                />
                                <Typography variant="body2">Return</Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            {/* Grid 2: 60% - 40% */}
            <Grid
                container
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
                spacing={1}
            >
                {/* Recent Orders */}
                <Grid item xs={12} md={7} sx={{ width: { md: "58%" } }}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 2,
                            width: "100%",
                            minWidth: "100%",
                            boxSizing: "border-box",
                        }}
                    >
                        <Typography variant="h6" fontWeight="bold" mb={2}>
                            Recent Orders
                        </Typography>
                        <Box sx={{ overflowX: "auto" }}>
                            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                <thead>
                                    <tr>
                                        <th style={{ textAlign: "left", padding: "8px" }}>
                                            Tracking no
                                        </th>
                                        <th style={{ textAlign: "left", padding: "8px" }}>
                                            Product Name
                                        </th>
                                        <th style={{ textAlign: "left", padding: "8px" }}>Price</th>
                                        <th style={{ textAlign: "left", padding: "8px" }}>
                                            In Stock
                                        </th>
                                        <th style={{ textAlign: "left", padding: "8px" }}>
                                            Total Order
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        {
                                            id: "#1001",
                                            name: "Camera Lens",
                                            price: "$178",
                                            stock: 1236,
                                            total: 325,
                                            image:
                                                "https://cdn-icons-png.flaticon.com/512/2920/2920238.png",
                                        },
                                        {
                                            id: "#1002",
                                            name: "Black Sleep Dress",
                                            price: "$14",
                                            stock: 720,
                                            total: 153,
                                            image:
                                                "https://cdn-icons-png.flaticon.com/512/892/892458.png",
                                        },
                                        {
                                            id: "#1003",
                                            name: "Argan Oil",
                                            price: "$21",
                                            stock: 940,
                                            total: 225,
                                            image:
                                                "https://cdn-icons-png.flaticon.com/512/4381/4381996.png",
                                        },
                                        {
                                            id: "#1004",
                                            name: "EAU DE Parfum",
                                            price: "$32",
                                            stock: 940,
                                            total: 280,
                                            image:
                                                "https://cdn-icons-png.flaticon.com/512/7156/7156375.png",
                                        },
                                    ].map((order) => (
                                        <tr key={order.id}>
                                            <td style={{ padding: "8px" }}>{order.id}</td>
                                            <td
                                                style={{
                                                    padding: "8px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <img
                                                    src={order.image}
                                                    alt={order.name}
                                                    width={30}
                                                    height={30}
                                                    style={{ marginRight: 10 }}
                                                />
                                                {order.name}
                                            </td>
                                            <td style={{ padding: "8px" }}>{order.price}</td>
                                            <td style={{ padding: "8px" }}>{order.stock}</td>
                                            <td style={{ padding: "8px" }}>
                                                <Box
                                                    sx={{
                                                        backgroundColor: "#e0f7fa",
                                                        borderRadius: "12px",
                                                        padding: "4px 8px",
                                                        display: "inline-block",
                                                        fontWeight: "bold",
                                                        color: "#00796b",
                                                    }}
                                                >
                                                    {order.total}
                                                </Box>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Box>
                    </Paper>
                </Grid>

                {/* Top Selling Products */}
                <Grid item xs={12} md={5} sx={{ width: { md: "40%" } }}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 2,
                            height: "300px",
                            width: "100%",
                            minWidth: "100%",
                            boxSizing: "border-box",
                        }}
                    >
                        <Typography variant="h6" fontWeight="bold" mb={2}>
                            Top Selling Products
                        </Typography>
                        {[
                            {
                                name: "NIKE Shoes Black Pattern",
                                price: "$87",
                                stars: 5,
                                image: "https://cdn-icons-png.flaticon.com/512/892/892468.png",
                            },
                            {
                                name: "iPhone 12",
                                price: "$987",
                                stars: 5,
                                image:
                                    "https://cdn-icons-png.flaticon.com/512/2111/2111351.png",
                            },
                        ].map((product, idx) => (
                            <Box
                                key={idx}
                                sx={{ display: "flex", alignItems: "center", mb: 2 }}
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    width={60}
                                    height={60}
                                    style={{ borderRadius: 8, marginRight: 12 }}
                                />
                                <Box>
                                    <Typography fontWeight="medium">{product.name}</Typography>
                                    <Box sx={{ color: "#fbc02d" }}>
                                        {"★".repeat(product.stars)}
                                        {"☆".repeat(5 - product.stars)}
                                    </Box>
                                    <Typography fontWeight="bold">{product.price}</Typography>
                                </Box>
                            </Box>
                        ))}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default StatisticTemplate;