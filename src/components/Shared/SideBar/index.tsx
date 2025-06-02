import React, { useState } from "react";
import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface Product {
  name: string;
  type: string;
  originalPrice: number;
  discountedPrice: number;
  imageUrl: string;
  brand: string;
  frameMaterial: string;
  weight: number; // Add weight property (in kg for example)
}

interface FilterSidebarProps {
  products: Product[];
  setFilteredProducts: (products: Product[]) => void;
}

const brands = ["BATCH", "ELECTRA", "HUFFY", "JETT", "TERN", "TREK", "UNITED BIKE"];
const types = ["Road-Bike","Touring-Bike","Hybrid-Bike","Fixed-Gear-Bike","BMX-Bike","Folding-Bike","Moutain Bike"];
const priceRanges = [
  { label: "Under 5,000,000₫", min: 0, max: 5000000 },
  { label: "5,000,000₫ - 10,000,000₫", min: 5000000, max: 10000000 },
  { label: "10,000,000₫ - 20,000,000₫", min: 10000000, max: 20000000 },
  { label: "20,000,000₫ - 50,000,000₫", min: 20000000, max: 50000000 },
  { label: "50,000,000₫ - 100,000,000₫", min: 50000000, max: 100000000 },
  { label: "Above 100,000,000₫", min: 100000000, max: Infinity },
];
const frameMaterials = ["Carbon", "Aluminum", "Steel", "Chromoly"];
const weightRanges = [
  { label: "Under 10kg", min: 0, max: 10 },
  { label: "10kg - 15kg", min: 10, max: 15 },
  { label: "15kg - 20kg", min: 15, max: 20 },
  { label: "Above 20kg", min: 20, max: Infinity },
];

export default function FilterSidebar({ products, setFilteredProducts }: FilterSidebarProps) {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<{ min: number; max: number }[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedWeights, setSelectedWeights] = useState<{ min: number; max: number }[]>([]);

  const handleCheckboxChange = (value: string, selected: string[], setSelected: (val: string[]) => void) => {
    const newSelected = selected.includes(value)
      ? selected.filter(item => item !== value)
      : [...selected, value];
    setSelected(newSelected);
    filterProducts(newSelected, selectedTypes, selectedPrices, selectedMaterials, selectedWeights);
  };

  const handleTypeChange = (type: string) => {
    const newTypes = selectedTypes.includes(type)
      ? selectedTypes.filter(t => t !== type)
      : [...selectedTypes, type];
    setSelectedTypes(newTypes);
    filterProducts(selectedBrands, newTypes, selectedPrices, selectedMaterials, selectedWeights);
  };

  const handleMaterialChange = (material: string) => {
    const newMaterials = selectedMaterials.includes(material)
      ? selectedMaterials.filter(m => m !== material)
      : [...selectedMaterials, material];
    setSelectedMaterials(newMaterials);
    filterProducts(selectedBrands, selectedTypes, selectedPrices, newMaterials, selectedWeights);
  };

  const handlePriceChange = (range: { min: number; max: number }) => {
    const isSelected = selectedPrices.some(p => p.min === range.min && p.max === range.max);
    const newPrices = isSelected
      ? selectedPrices.filter(p => !(p.min === range.min && p.max === range.max))
      : [...selectedPrices, range];
    setSelectedPrices(newPrices);
    filterProducts(selectedBrands, selectedTypes, newPrices, selectedMaterials, selectedWeights);
  };

  const handleWeightChange = (range: { min: number; max: number }) => {
    const isSelected = selectedWeights.some(w => w.min === range.min && w.max === range.max);
    const newWeights = isSelected
      ? selectedWeights.filter(w => !(w.min === range.min && w.max === range.max))
      : [...selectedWeights, range];
    setSelectedWeights(newWeights);
    filterProducts(selectedBrands, selectedTypes, selectedPrices, selectedMaterials, newWeights);
  };

  const filterProducts = (
    brands: string[],
    types: string[],
    prices: { min: number; max: number }[],
    materials: string[],
    weights: { min: number; max: number }[]
  ) => {
    let filtered = [...products];

    if (brands.length > 0) {
      filtered = filtered.filter(p => brands.includes(p.brand));
    }
    if (types.length > 0) {
      filtered = filtered.filter(p => types.includes(p.type));
    }
    if (materials.length > 0) {
      filtered = filtered.filter(p => materials.includes(p.frameMaterial));
    }
    if (prices.length > 0) {
      filtered = filtered.filter(p => {
        return prices.some(price => p.discountedPrice >= price.min && p.discountedPrice < price.max);
      });
    }
    if (weights.length > 0) {
      filtered = filtered.filter(p => {
        return weights.some(weight => p.weight >= weight.min && p.weight < weight.max);
      });
    }

    setFilteredProducts(filtered);
  };

  const resetFilters = () => {
    setSelectedBrands([]);
    setSelectedTypes([]);
    setSelectedPrices([]);
    setSelectedMaterials([]);
    setSelectedWeights([]);
    setFilteredProducts(products);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h6" gutterBottom>Filter Products</Typography>

      {/* Reset Button */}
      <Button variant="outlined" color="error" fullWidth onClick={resetFilters} sx={{ mb: 2 }}>
        Clear All Filters
      </Button>

      {/* Brand */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Brand</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {brands.map((brand) => (
              <FormControlLabel
                key={brand}
                control={
                  <Checkbox
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleCheckboxChange(brand, selectedBrands, setSelectedBrands)}
                  />
                }
                label={brand}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      {/* Type */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Type</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {types.map((type) => (
              <FormControlLabel
                key={type}
                control={
                  <Checkbox
                    checked={selectedTypes.includes(type)}
                    onChange={() => handleTypeChange(type)}
                  />
                }
                label={type}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      {/* Price Range */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Price Range</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {priceRanges.map((price) => (
              <FormControlLabel
                key={price.label}
                control={
                  <Checkbox
                    checked={selectedPrices.some(p => p.min === price.min && p.max === price.max)}
                    onChange={() => handlePriceChange(price)}
                  />
                }
                label={price.label}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      {/* Frame Material */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Frame Material</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {frameMaterials.map((material) => (
              <FormControlLabel
                key={material}
                control={
                  <Checkbox
                    checked={selectedMaterials.includes(material)}
                    onChange={() => handleMaterialChange(material)}
                  />
                }
                label={material}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      {/* Weight */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Weight</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {weightRanges.map((weight) => (
              <FormControlLabel
                key={weight.label}
                control={
                  <Checkbox
                    checked={selectedWeights.some(w => w.min === weight.min && w.max === weight.max)}
                    onChange={() => handleWeightChange(weight)}
                  />
                }
                label={weight.label}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
