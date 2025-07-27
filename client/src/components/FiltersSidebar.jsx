import React from "react";
import { Checkbox, FormControlLabel, FormGroup, Slider, Button, Typography } from "@mui/material";

const categories = ["Car", "Bike", "Smartphone", "Watch"];

export default function FiltersSidebar({
  selectedCategories = [],
  onCategoryChange,
  brands = [],
  selectedBrands = [],
  onBrandChange,
  priceRange = [0, 100000],
  selectedPrice = [0, 100000],
  onPriceChange,
  onClear,
}) {
  return (
    <aside className="w-full md:w-64 bg-white rounded-xl shadow-md p-6 sticky top-6">
      <Typography variant="h6" className="mb-4">Filters</Typography>
      {/* Category Filter */}
      <div className="mb-6">
        <Typography variant="subtitle1" className="mb-2">Category</Typography>
        <FormGroup>
          {categories.map((cat) => (
            <FormControlLabel
              key={cat}
              control={
                <Checkbox
                  checked={selectedCategories.includes(cat)}
                  onChange={() => onCategoryChange(cat)}
                />
              }
              label={cat}
            />
          ))}
        </FormGroup>
      </div>
      {/* Brand Filter */}
      {brands.length > 0 && (
        <div className="mb-6">
          <Typography variant="subtitle1" className="mb-2">Brand</Typography>
          <FormGroup>
            {brands.map((brand) => (
              <FormControlLabel
                key={brand}
                control={
                  <Checkbox
                    checked={selectedBrands.includes(brand)}
                    onChange={() => onBrandChange(brand)}
                  />
                }
                label={brand}
              />
            ))}
          </FormGroup>
        </div>
      )}
      {/* Price Range */}
      <div className="mb-6">
        <Typography variant="subtitle1" className="mb-2">Price Range</Typography>
        <Slider
          value={selectedPrice}
          onChange={(_, val) => onPriceChange(val)}
          valueLabelDisplay="auto"
          min={priceRange[0]}
          max={priceRange[1]}
          step={100}
        />
        <div className="flex justify-between text-sm text-gray-500 mt-1">
          <span>₹{selectedPrice[0]}</span>
          <span>₹{selectedPrice[1]}</span>
        </div>
      </div>
      {/* Clear Filters */}
      <Button
        variant="outlined"
        color="secondary"
        fullWidth
        onClick={onClear}
        className="mt-4 transition hover:scale-105"
      >
        Clear Filters
      </Button>
    </aside>
  );
}