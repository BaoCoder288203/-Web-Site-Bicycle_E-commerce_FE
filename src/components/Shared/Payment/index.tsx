import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Button,
  Divider,
  Grid,
} from "@mui/material";

const Payment = () => {
  const [contact, setContact] = useState("");
  const [country, setCountry] = useState("United States");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [saveInfo, setSaveInfo] = useState(false);
  const [shippingMethod, setShippingMethod] = useState("inside");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [couponCode, setCouponCode] = useState('');

  const couponInputStyles = {
    backgroundColor:"#fff",
    '& .MuiInputBase-root': {
      height: '40px', // Match the smaller height in the screenshot
      fontSize: '1rem',
      borderTopRightRadius: 0, // Remove border radius on the right side
      borderBottomRightRadius: 0,
    },
    '& .MuiInputLabel-root': {
      fontSize: '1rem',
      transform: 'translate(14px, 10px) scale(1)', // Adjust label position
    },
    '& .MuiInputLabel-shrink': {
      transform: 'translate(14px, -6px) scale(0.75)',
    },
  };

  // Custom styles for larger input fields
  const largeInputStyles = {
    "& .MuiInputBase-root": {
      height: "56px",
      fontSize: "1.1rem",
      padding: "0 14px",
    },
    "& .MuiInputLabel-root": {
      fontSize: "1.1rem",
      transform: "translate(14px, 16px) scale(1)",
    },
    "& .MuiInputLabel-shrink": {
      transform: "translate(14px, -6px) scale(0.75)",
    },
  };

  // Custom styles for checkbox container to match TextField border
  const checkboxContainerStyles = {
    border: "1px solid rgba(0, 0, 0, 0.23)",
    borderRadius: "4px",
    padding: "10px 14px",
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "56px",
  };

  // Custom styles for radio button container to match the screenshot
  const radioContainerStyles = {
    border: "1px solid rgba(0, 0, 0, 0.23)",
    borderRadius: "4px",
    padding: "10px 14px",
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "56px",
    justifyContent: "space-between",
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Grid container spacing={3}>
        {/* Left Section: Form */}
        <Grid item xs={12} md={6} sx={{ p: 5 }}>
          {/* Contact */}
          <Typography variant="h6" sx={{fontWeight:'bold'}} gutterBottom>
            Contact
          </Typography>
          <TextField
            fullWidth
            label="Email or phone number"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            variant="outlined"
            margin="normal"
            sx={largeInputStyles}
          />
          <Box sx={{}}>
            <FormControlLabel
              control={<Checkbox />}
              label="Email me with news and offers"
            />
          </Box>

          {/* Delivery */}
          <Typography variant="h6" gutterBottom sx={{ fontWeight:'bold', mt: 3 }}>
            Delivery
          </Typography>
          <TextField
            fullWidth
            select
            label="Country/Region"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            SelectProps={{ native: true }}
            variant="outlined"
            margin="normal"
            sx={largeInputStyles}
          >
            <option value="United States">United States</option>
            <option value="United States">Viet Nam</option>
            {/* Add more countries as needed */}
          </TextField>
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              fullWidth
              label="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              variant="outlined"
              margin="normal"
              sx={largeInputStyles}
            />
            <TextField
              fullWidth
              label="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              variant="outlined"
              margin="normal"
              sx={largeInputStyles}
            />
          </Box>
          <TextField
            fullWidth
            label="Company (optional)"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            variant="outlined"
            margin="normal"
            sx={largeInputStyles}
          />
          <TextField
            fullWidth
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            variant="outlined"
            margin="normal"
            sx={largeInputStyles}
          />
          <TextField
            fullWidth
            label="Apartment, suit, etc. (optional)"
            value={apartment}
            onChange={(e) => setApartment(e.target.value)}
            variant="outlined"
            margin="normal"
            sx={largeInputStyles}
          />
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              fullWidth
              label="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              variant="outlined"
              margin="normal"
              sx={largeInputStyles}
            />
            <TextField
              fullWidth
              label="Postal code (optional)"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              variant="outlined"
              margin="normal"
              sx={largeInputStyles}
            />
          </Box>
          <TextField
            fullWidth
            label="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            variant="outlined"
            margin="normal"
            sx={largeInputStyles}
          />
          <Box sx={{}}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={saveInfo}
                  onChange={(e) => setSaveInfo(e.target.checked)}
                />
              }
              label="Save this information for next time"
            />
          </Box>

          {/* Shipping Method */}
          <Typography variant="h6" gutterBottom sx={{fontWeight:'bold', mt: 3 }}>
            Shipping method
          </Typography>
          <FormControl component="fieldset" sx={{ width: "100%" }}>
            <RadioGroup
              value={shippingMethod}
              onChange={(e) => setShippingMethod(e.target.value)}
            >
              <Box sx={radioContainerStyles}>
                <FormControlLabel
                  value="inside"
                  control={<Radio />}
                  label="Inside Dhaka City"
                />
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography>Free</Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 0 }} />
              <Box sx={radioContainerStyles}>
                <FormControlLabel
                  value="outside"
                  control={<Radio />}
                  label="Outside Dhaka City"
                />
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography>$299.00</Typography>
                </Box>
              </Box>
            </RadioGroup>
          </FormControl>

          {/* Payment */}
          <Typography variant="h6" gutterBottom sx={{fontWeight:'bold', mt: 3 }}>
            Payment
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            All transactions are secure and encrypted.
          </Typography>
          <FormControl component="fieldset" sx={{ width: "100%" }}>
            <RadioGroup
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <Box sx={radioContainerStyles}>
                <FormControlLabel
                  value="cod"
                  control={<Radio />}
                  label="Cash on Delivery (COD)"
                />
              </Box>
              <Divider sx={{ my: 0 }} />
              <Box sx={radioContainerStyles}>
                <FormControlLabel
                  value="paypal"
                  control={<Radio />}
                  label="Paypal"
                />
              </Box>
              <Divider sx={{ my: 0 }} />
              <Box sx={radioContainerStyles}>
                <FormControlLabel
                  value="bank"
                  control={<Radio />}
                  label="Bank Transfer - BEFTN/NPSB"
                />
              </Box>
              <Divider sx={{ my: 0 }} />
              <Box sx={radioContainerStyles}>
                <FormControlLabel
                  value="online"
                  control={<Radio />}
                  label="Online Payment/Visa, MasterCard, MFS, Netbanking! - PortWallet"
                />
              </Box>
            </RadioGroup>
          </FormControl>

          {/* Billing */}
          <Typography variant="h6" gutterBottom sx={{fontWeight:'bold', mt: 3 }}>
            Billing
          </Typography>
          <FormControl component="fieldset" sx={{ width: "100%" }}>
            <RadioGroup
              value={billingSameAsShipping}
              onChange={(e) =>
                setBillingSameAsShipping(e.target.value === "true")
              }
            >
              <Box sx={radioContainerStyles}>
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label="Same as shipping address"
                />
              </Box>
              <Divider sx={{ my: 0 }} />
              <Box sx={radioContainerStyles}>
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label="Use a different billing address"
                />
              </Box>
            </RadioGroup>
          </FormControl>

          {/* Complete Order Button */}
          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              backgroundColor: "red",
              "&:hover": { backgroundColor: "#d32f2f" },
              height: "56px",
              fontSize: "1.1rem",
            }}
          >
            Complete Order
          </Button>
        </Grid>

        {/* Right Section: Order Summary */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{height: 1000, mt: 3, p: 7, backgroundColor: "#f5f7f5" }}
        >
          {/* Product 1 */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
              <img
                src="/assets/images/item.jpg"
                alt="Giant Defy"
                style={{ width: 50, height: 50 }}
              />
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="body1">Giant Defy Advanced / S2</Typography>
              <Typography variant="body2" color="textSecondary">
                Green / 32
              </Typography>
            </Box>
            <Typography variant="body1" color="error">
              $299.00
            </Typography>
          </Box>

          {/* Product 2 */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
              <img
                src="/assets/images/item.jpg"
                alt="Cannondale Topstone"
                style={{ width: 50, height: 50 }}
              />
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="body1">Cannondale Topstone / S2</Typography>
              <Typography variant="body2" color="textSecondary">
                Orange / 32
              </Typography>
            </Box>
            <Typography variant="body1" color="error">
              $250.00
            </Typography>
          </Box>
          {/* Coupon Code Section */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <TextField
              fullWidth
              label="Coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              variant="outlined"
              sx={couponInputStyles}
            />
            <Button
              variant="contained"
              sx={{
                height: "40px", // Match the input height
                borderTopLeftRadius: 0, // Remove border radius on the left side
                borderBottomLeftRadius: 0,
                backgroundColor: "#000", // Black background as in the screenshot
                color: "#fff",
                "&:hover": { backgroundColor: "#333" },
              }}
            >
              Apply
            </Button>
          </Box>
          {/* Totals */}
          <Box sx={{ mt: 3 }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography variant="body1">Subtotal</Typography>
              <Typography variant="body1">$549.00</Typography>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography variant="body1">Shipping</Typography>
              <Typography variant="body1">Free</Typography>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6">$549.00</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Payment;
