import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useState, useEffect, useMemo, useRef } from "react";
import axios from "axios";
import Select from "react-select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import "leaflet/dist/leaflet.css";
import { Box } from "@mui/material";
const containerStyle = {
    width: "100%",
    height: "300px",
    borderRadius: "12px",
    marginTop: "16px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

// Component để cập nhật trung tâm bản đồ
const MapUpdater = ({ center }: any) => {
    const map = useMap();
    useEffect(() => {
        map.setView(center, 13);
    }, [center, map]);
    return null;
};

const AddressMap = ({ initialPosition, onAddressChange }: { initialPosition: number[], onAddressChange: (address: any) => void }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [position, setPosition] = useState(initialPosition);
    const [loading, setLoading] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const markerRef = useRef(null);

    // Reverse geocoding để lấy địa chỉ từ tọa độ
    const reverseGeocode = async (lat: number, lng: number) => {
        setLoading(true);
        try {
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
            );
            const { address, display_name } = response.data;
            const addressData = {
                fullAddress: display_name || "",
                ward: address?.residential || address?.quarter || "",
                street: address?.road || address?.street || "",
                district: address?.suburb || "",
                city: address?.city || address?.state || "",
                country: address?.country || "",
            };

            onAddressChange(addressData);
            return addressData;
        } catch (error) {
            console.error("Error reverse geocoding:", error);
            alert("Không thể lấy địa chỉ từ vị trí này!");
            return null;
        } finally {
            setLoading(false);
        }
    };

    // Gọi API tìm kiếm địa chỉ cụ thể
    const searchAddress = async () => {
        if (!searchQuery.trim()) {
            alert("Vui lòng nhập địa chỉ cụ thể!");
            return;
        }
        setLoading(true);
        try {
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                    searchQuery
                )}&limit=5`
            );
            const options = response.data.map((item: any) => ({
                value: [parseFloat(item.lat), parseFloat(item.lon)],
                label: item.display_name,
            }));
            setSuggestions(options);
        } catch (error) {
            console.error("Error searching address:", error);
            alert("Đã có lỗi khi tìm kiếm địa chỉ!");
        }
        setLoading(false);
    };

    // Xử lý executing onChange on suggestion selection
    const handleSelect = (selectedOption: any) => {
        if (selectedOption) {
            setPosition(selectedOption.value);
            reverseGeocode(selectedOption.value[0], selectedOption.value[1]);
        }
    };

    // Xử lý khi kéo thả marker
    const handleMarkerDragEnd = (event: any) => {
        const marker = event.target;
        const newPosition = marker.getLatLng();
        setPosition([newPosition.lat, newPosition.lng]);
        reverseGeocode(newPosition.lat, newPosition.lng);
    };

    // Sử dụng useMemo để tránh render lại MapContainer
    const mapContent = useMemo(
        () => (
            <MapContainer center={position} zoom={13} style={containerStyle}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <MapUpdater center={position} />
                <Marker
                    position={position}
                    draggable={true}
                    eventHandlers={{
                        dragend: handleMarkerDragEnd,
                    }}
                    ref={markerRef}
                >
                    <Popup>{searchQuery || "Kéo marker để chọn vị trí"}</Popup>
                </Marker>
            </MapContainer>
        ),
        [position, searchQuery]
    );

    return (
        <Box sx={{ mt: 2 }}>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <TextField
                    label="Tìm kiếm vị trí trên bản đồ"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    fullWidth
                    sx={{
                        backgroundColor: "white",
                        borderRadius: 1,
                        "& .MuiInputLabel-root": {
                            color: "black",
                        },
                        "& .MuiOutlinedInput-root": {
                            "& input": {
                                paddingY: "20px",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "blue",
                            },
                        },
                    }}
                />
                <Button
                    variant="contained"
                    onClick={searchAddress}
                    sx={{
                        backgroundColor: "#3f51b5",
                        ":hover": { backgroundColor: "#303f9f" },
                        fontWeight: "bold",
                        textTransform: "none",
                    }}
                >
                    {loading ? <CircularProgress size={23} color="inherit" /> : "Tìm kiếm"}
                </Button>
            </Box>
            <Select
                options={suggestions}
                onChange={handleSelect}
                placeholder="Chọn địa chỉ từ gợi ý..."
                isLoading={loading}
                styles={{
                    control: (base) => ({
                        ...base,
                        borderRadius: "4px",
                        borderColor: "#c4c4c4",
                        "&:hover": { borderColor: "#3f51b5" },
                    }),
                    menu: (base) => ({
                        ...base,
                        zIndex: 9999,
                    }),
                }}
            />
            {mapContent}
        </Box>
    );
};

export default AddressMap;