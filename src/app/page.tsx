"use client";

import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from "@mui/material";
import {
  SportsEsports,
  Add,
  Delete,
  TrendingDown,
  Percent,
  Info,
  AttachMoney
} from "@mui/icons-material";
import { useState } from "react";

interface Item {
  id: string;
  name: string;
  price: number;
  sellingPrice: number;
  isBooth: boolean;
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [newItemSellingPrice, setNewItemSellingPrice] = useState('');
  const [newItemIsBooth, setNewItemIsBooth] = useState(false);
  const [customPercentage, setCustomPercentage] = useState('');
  const [customPrice, setCustomPrice] = useState('');
  const [editingItem, setEditingItem] = useState<string | null>(null);

  const addItem = () => {
    if (newItemName.trim() && newItemPrice) {
      const newItem: Item = {
        id: Date.now().toString(),
        name: newItemName.trim(),
        price: parseFloat(newItemPrice),
        sellingPrice: newItemSellingPrice ? parseFloat(newItemSellingPrice) : 0,
        isBooth: newItemIsBooth
      };
      setItems([...items, newItem]);
      setNewItemName('');
      setNewItemPrice('');
      setNewItemSellingPrice('');
      setNewItemIsBooth(false);
    }
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    if (editingItem === id) setEditingItem(null);
  };

  const updateItem = (id: string, field: keyof Item, value: any) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const startEditing = (id: string) => {
    setEditingItem(id);
  };

  const stopEditing = () => {
    setEditingItem(null);
  };

  const resetCustomInputs = () => {
    setCustomPercentage('');
    setCustomPrice('');
  };

  const calculateDiscountedPrice = (price: number, percentage: number) => {
    return Math.floor(price * (1 - percentage / 100));
  };

  const calculateDiscountPercentage = (originalPrice: number, discountedPrice: number) => {
    return Math.floor(((originalPrice - discountedPrice) / originalPrice) * 100);
  };

  const calculateProfit = (buyingPrice: number, sellingPrice: number, isBooth: boolean) => {
    const tax = isBooth ? 0.01 : 0; // 1% tax for booth
    const afterTaxPrice = Math.floor(sellingPrice * (1 - tax));
    return afterTaxPrice - buyingPrice;
  };

  const calculateProfitPercentage = (buyingPrice: number, profit: number) => {
    return Math.floor((profit / buyingPrice) * 100);
  };

  const predefinedPercentages = [5, 10, 15, 20, 25, 30];

  const totalBasePrice = items.reduce((sum, item) => sum + item.price, 0);
  const totalSellingPrice = items.reduce((sum, item) => sum + (item.sellingPrice || 0), 0);
  const totalProfit = items.reduce((sum, item) => {
    if (item.sellingPrice > 0) {
      return sum + calculateProfit(item.price, item.sellingPrice, item.isBooth);
    }
    return sum;
  }, 0);

  return (
    <Box className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <Box className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <Container maxWidth="lg">
          <Box className="flex items-center justify-between py-4">
            <Box className="flex items-center gap-3">
              <SportsEsports className="text-purple-400 text-3xl" />
              <Typography variant="h4" className="text-white font-bold">
                Blade Ball Price Negotiator
              </Typography>
            </Box>
            {/* <Box className="flex items-center gap-2">
              <Info className="text-white/70 text-xl" />
            </Box> */}
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" className="py-12">
        {/* Hero Section */}
        <Box className="text-center mb-16">
          <Typography
            variant="h2"
            className="text-white font-bold mb-4 text-4xl md:text-6xl"
          >
            Blade Ball Price Negotiator
          </Typography>
          <Typography
            variant="h6"
            className="text-purple-200 mb-8 max-w-2xl mx-auto"
          >
            Manage items and calculate the perfect negotiation prices for Blade Ball!
            Get negotiation strategies with various discount percentages.
          </Typography>
        </Box>

        {/* Add Item Section */}
        <Paper className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 mb-8">
          <Typography variant="h5" className="text-white font-semibold mb-4 text-center">
            Add New Item
          </Typography>

          <Box className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <TextField
              label="Item Name"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder="Example: Legendary Sword"
              className="flex-1"
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                },
              }}
            />

            <TextField
              label="Index Price (Tokens)"
              type="number"
              value={newItemPrice}
              onChange={(e) => setNewItemPrice(e.target.value)}
              placeholder="1000"
              InputProps={{
                startAdornment: <InputAdornment position="start">🪙</InputAdornment>,
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                },
              }}
            />

            <TextField
              label="Sell Price (Tokens)"
              type="number"
              value={newItemSellingPrice}
              onChange={(e) => setNewItemSellingPrice(e.target.value)}
              placeholder="1200 (Optional)"
              InputProps={{
                startAdornment: <InputAdornment position="start">🪙</InputAdornment>,
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                },
              }}
            />

            <Button
              variant="contained"
              onClick={addItem}
              disabled={!newItemName.trim() || !newItemPrice}
              className="bg-purple-600 hover:bg-purple-700 text-white h-14"
              startIcon={<Add />}
            >
              Add Item
            </Button>
          </Box>

          {/* Booth Tax Checkbox */}
          <Box className="mt-4 flex items-center justify-center">
            <label className="flex items-center gap-2 text-white cursor-pointer">
              <input
                type="checkbox"
                checked={newItemIsBooth}
                onChange={(e) => setNewItemIsBooth(e.target.checked)}
                className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
              />
              <span className="text-sm">Sell in Booth (1% tax)</span>
            </label>
          </Box>
        </Paper>

        {/* Items List & Calculator */}
        <Box className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Items List */}
          <Paper className="bg-white/5 backdrop-blur-sm border border-white/10 p-6">
            <Typography variant="h5" className="text-white font-semibold mb-4 text-center">
              Item List ({items.length})
            </Typography>

            {items.length === 0 ? (
              <Box className="text-center py-8">
                <AttachMoney className="text-gray-500 text-4xl mb-2" />
                <Typography variant="body2" className="text-gray-500">
                  No items yet. Add your first item!
                </Typography>
              </Box>
            ) : (
              <List className="space-y-2">
                {items.map((item) => (
                  <ListItem
                    key={item.id}
                    className="bg-white/5 rounded border border-white/10 mb-3"
                    sx={{ padding: '16px' }}
                  >
                    <Box className="flex-1">
                      <Box className="flex items-center justify-between mb-2">
                        <Typography variant="body1" className="text-white font-medium">
                          {item.name}
                        </Typography>
                        <Box className="flex items-center gap-2">
                          {editingItem === item.id ? (
                            <IconButton
                              onClick={() => stopEditing()}
                              className="text-green-400 hover:text-green-300 hover:bg-green-400/10"
                              size="medium"
                            >
                              ✓
                            </IconButton>
                          ) : (
                            <IconButton
                              onClick={() => startEditing(item.id)}
                              className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/10"
                              size="medium"
                            >
                              ✏️
                            </IconButton>
                          )}
                          <IconButton
                            onClick={() => deleteItem(item.id)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                            size="medium"
                          >
                            <Delete />
                          </IconButton>
                        </Box>
                      </Box>
                      <Box className="space-y-2">
                        <Box className="space-y-1">
                          <Typography variant="body2" className="text-purple-200">
                            Index: 🪙 {item.price.toLocaleString()} tokens
                          </Typography>
                          {editingItem === item.id ? (
                            <Box className="mt-4 p-4 bg-blue-900/20 rounded border border-blue-400/30">
                              <Typography variant="body2" className="text-blue-200 font-medium mb-3 text-center">
                                Edit Item
                              </Typography>
                              <Box className="grid grid-cols-2 gap-4 mb-4">
                                <TextField
                                  size="small"
                                  label="Buy Price"
                                  type="number"
                                  value={item.price}
                                  onChange={(e) => updateItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                                  fullWidth
                                  sx={{
                                    '& .MuiOutlinedInput-root': {
                                      color: 'white',
                                      fontSize: '0.75rem',
                                      '& fieldset': {
                                        borderColor: 'rgba(255, 255, 255, 0.3)',
                                      },
                                    },
                                    '& .MuiInputLabel-root': {
                                      color: 'rgba(255, 255, 255, 0.7)',
                                      fontSize: '0.75rem',
                                    },
                                  }}
                                />
                                <TextField
                                  size="small"
                                  label="Sell Price"
                                  type="number"
                                  value={item.sellingPrice || ''}
                                  onChange={(e) => updateItem(item.id, 'sellingPrice', parseFloat(e.target.value) || 0)}
                                  fullWidth
                                  placeholder="Optional"
                                  sx={{
                                    '& .MuiOutlinedInput-root': {
                                      color: 'white',
                                      fontSize: '0.75rem',
                                      '& fieldset': {
                                        borderColor: 'rgba(255, 255, 255, 0.3)',
                                      },
                                    },
                                    '& .MuiInputLabel-root': {
                                      color: 'rgba(255, 255, 255, 0.7)',
                                      fontSize: '0.75rem',
                                    },
                                  }}
                                />
                              </Box>
                              <Box className="flex items-center justify-center">
                                <label className="flex items-center gap-2 text-white cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={item.isBooth}
                                    onChange={(e) => updateItem(item.id, 'isBooth', e.target.checked)}
                                    className="w-4 h-4 text-purple-600 bg-gray-400/30 rounded focus:ring-purple-500"
                                  />
                                  <span className="text-sm">Sell in Booth (1% tax)</span>
                                </label>
                              </Box>
                            </Box>
                          ) : (
                            <Box className="space-y-1">
                              {item.sellingPrice > 0 ? (
                                <Typography variant="body2" className="text-green-200">
                                  Sell: 🪙 {item.sellingPrice.toLocaleString()} tokens
                                  {item.isBooth && <span className="text-yellow-200 ml-1">(Booth)</span>}
                                </Typography>
                              ) : (
                                <Typography variant="body2" className="text-gray-400">
                                  No sell price yet
                                </Typography>
                              )}
                              {item.sellingPrice > 0 && (
                                <Typography variant="body2" className="text-blue-200">
                                  Profit: 🪙 {calculateProfit(item.price, item.sellingPrice, item.isBooth).toLocaleString()}{" "}
                                  ({calculateProfitPercentage(item.price, calculateProfit(item.price, item.sellingPrice, item.isBooth))}%)
                                </Typography>
                              )}
                            </Box>
                          )}
                        </Box>
                      </Box>
                    </Box>
                  </ListItem>
                ))}
              </List>
            )}

            {items.length > 0 && (
              <Box className="mt-4 space-y-3">
                <Box className="p-3 bg-purple-900/20 rounded border border-purple-400/30">
                  <Typography variant="h6" className="text-white font-semibold text-center">
                    Total Buy: 🪙 {totalBasePrice.toLocaleString()} tokens
                  </Typography>
                </Box>

                {totalSellingPrice > 0 && (
                  <Box className="p-3 bg-green-900/20 rounded border border-green-400/30">
                    <Typography variant="h6" className="text-green-200 font-semibold text-center">
                      Total Sell: 🪙 {totalSellingPrice.toLocaleString()} tokens
                    </Typography>
                  </Box>
                )}

                {totalProfit !== 0 && (
                  <Box className={`p-3 rounded border ${totalProfit > 0 ? 'bg-green-900/20 border-green-400/30' : 'bg-red-900/20 border-red-400/30'}`}>
                    <Typography variant="h6" className={`font-semibold text-center ${totalProfit > 0 ? 'text-green-200' : 'text-red-200'}`}>
                      Total Profit: 🪙 {totalProfit.toLocaleString()} tokens
                      {totalProfit > 0 && ` (${Math.floor((totalProfit / totalBasePrice) * 100)}%)`}
                    </Typography>
                  </Box>
                )}
              </Box>
            )}
          </Paper>

          {/* Negotiation Calculator */}
          <Paper className="bg-white/5 backdrop-blur-sm border border-white/10 p-6">
            <Typography variant="h5" className="text-white font-semibold mb-4 text-center">
              Negotiation Calculator
            </Typography>

            {items.length === 0 ? (
              <Box className="text-center py-8">
                <TrendingDown className="text-gray-500 text-4xl mb-2" />
                <Typography variant="body2" className="text-gray-500">
                  Add items first to see negotiation prices
                </Typography>
              </Box>
            ) : (
              <Box>
                <Box className="text-center mb-4">
                  <Typography variant="h6" className="text-purple-300 mb-2">
                    Total Index Price
                  </Typography>
                  <Typography variant="h4" className="text-white font-bold">
                    🪙 {totalBasePrice.toLocaleString()} tokens
                  </Typography>

                  {totalSellingPrice > 0 && (
                    <Box className="mt-3 p-3 bg-green-900/20 rounded border border-green-400/30">
                      <Typography variant="body2" className="text-green-200 mb-1">
                        If selling at normal price:
                      </Typography>
                      <Typography variant="h6" className="text-green-200 font-semibold">
                        Profit: 🪙 {totalProfit.toLocaleString()} tokens
                      </Typography>
                    </Box>
                  )}
                </Box>

                <Divider className="my-4 bg-white/20" />

                {/* Custom Inputs */}
                <Box className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <TextField
                    fullWidth
                    label="Custom Percentage (%)"
                    type="number"
                    value={customPercentage}
                    onChange={(e) => setCustomPercentage(e.target.value)}
                    placeholder="Example: 12.5"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'white',
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.3)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.5)',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(255, 255, 255, 0.7)',
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Desired Price (Tokens)"
                    type="number"
                    value={customPrice}
                    onChange={(e) => setCustomPrice(e.target.value)}
                    placeholder="Example: 1800"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">🪙</InputAdornment>,
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'white',
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.3)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.5)',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(255, 255, 255, 0.7)',
                      },
                    }}
                  />
                </Box>

                {/* Reset Button */}
                {(customPercentage || customPrice) && (
                  <Box className="text-center mb-4">
                    <Button
                      variant="outlined"
                      onClick={resetCustomInputs}
                      size="small"
                      className="border-white/30 text-white hover:bg-white/10"
                    >
                      Reset Custom Inputs
                    </Button>
                  </Box>
                )}

                {/* Predefined Percentages */}
                <Typography variant="subtitle1" className="text-white font-semibold mb-3">
                  Standard Percentages:
                </Typography>
                <Box className="space-y-2 mb-4">
                  {predefinedPercentages.map((percentage) => (
                    <Box key={percentage} className="bg-white/5 p-2 rounded">
                      <Box className="flex justify-between items-center">
                        <Typography variant="body2" className="text-purple-200">
                          {percentage}% off
                        </Typography>
                        <Typography variant="body2" className="text-white font-semibold">
                          🪙 {calculateDiscountedPrice(totalBasePrice, percentage).toLocaleString()} tokens
                        </Typography>
                      </Box>
                      {totalSellingPrice > 0 && (
                        <Box className="mt-1 pt-1 border-t border-white/10">
                          <Typography variant="body2" className="text-blue-200 text-center text-xs">
                            Profit: 🪙 {Math.floor(totalSellingPrice - calculateDiscountedPrice(totalBasePrice, percentage)).toLocaleString()} tokens
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  ))}
                </Box>

                {/* Custom Results */}
                {(customPercentage || customPrice) && (
                  <>
                    <Divider className="my-4 bg-white/20" />
                    <Typography variant="subtitle1" className="text-white font-semibold mb-3">
                      Custom Results:
                    </Typography>

                    {customPercentage && (
                      <Box className="bg-purple-600/20 p-3 rounded border border-purple-400/50 mb-3">
                        <Box className="flex justify-between items-center">
                          <Typography variant="body2" className="text-purple-200">
                            {customPercentage}% off
                          </Typography>
                          <Typography variant="h6" className="text-white font-bold">
                            🪙 {calculateDiscountedPrice(totalBasePrice, parseFloat(customPercentage)).toLocaleString()} tokens
                          </Typography>
                        </Box>
                        {totalSellingPrice > 0 && (
                          <Box className="mt-2 pt-2 border-t border-purple-400/30">
                            <Typography variant="body2" className="text-purple-200 text-center">
                              Profit: 🪙 {Math.floor(totalSellingPrice - calculateDiscountedPrice(totalBasePrice, parseFloat(customPercentage))).toLocaleString()} tokens
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    )}

                    {customPrice && (
                      <Box className="bg-green-600/20 p-3 rounded border border-green-400/50">
                        <Box className="flex justify-between items-center">
                          <Typography variant="body2" className="text-green-200">
                            Desired price
                          </Typography>
                          <Typography variant="h6" className="text-white font-bold">
                            🪙 {parseFloat(customPrice).toLocaleString()} tokens
                          </Typography>
                        </Box>
                        <Box className="mt-2 pt-2 border-t border-green-400/30">
                          <Typography variant="body2" className="text-green-200 text-center">
                            Discount: {calculateDiscountPercentage(totalBasePrice, parseFloat(customPrice))}%
                            (Save: 🪙 {Math.floor(totalBasePrice - parseFloat(customPrice)).toLocaleString()} tokens)
                          </Typography>
                          {totalSellingPrice > 0 && (
                            <Typography variant="body2" className="text-green-200 text-center mt-1">
                              Profit: 🪙 {Math.floor(totalSellingPrice - parseFloat(customPrice)).toLocaleString()} tokens
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    )}
                  </>
                )}
              </Box>
            )}
          </Paper>
        </Box>

        {/* Negotiation Tips */}
        <Paper className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 mt-8">
          <Typography variant="h5" className="text-white font-semibold mb-4 text-center">
            Blade Ball Negotiation Strategy
          </Typography>
          <Box className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Box className="text-center">
              <Box className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Percent className="text-purple-400 text-2xl" />
              </Box>
              <Typography variant="h6" className="text-white font-semibold mb-2">
                Start Low
              </Typography>
              <Typography variant="body2" className="text-gray-300">
                Start with 15-20% below the price to give room for negotiation.
              </Typography>
            </Box>

            <Box className="text-center">
              <Box className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingDown className="text-purple-400 text-2xl" />
              </Box>
              <Typography variant="h6" className="text-white font-semibold mb-2">
                Increase Gradually
              </Typography>
              <Typography variant="body2" className="text-gray-300">
                If rejected, increase by 2-3% each time to reach an agreement.
              </Typography>
            </Box>

            <Box className="text-center">
              <Box className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <AttachMoney className="text-purple-400 text-2xl" />
              </Box>
              <Typography variant="h6" className="text-white font-semibold mb-2">
                Realistic Target
              </Typography>
              <Typography variant="body2" className="text-gray-300">
                Target 10-15% discount for popular items, 20-25% for rare items.
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* Info Section */}
        <Paper className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 mt-8">
          <Typography variant="h6" className="text-white font-semibold mb-3 text-center">
            About Blade Ball Trading
          </Typography>
          <Typography variant="body2" className="text-gray-300 text-center">
            Blade Ball uses <strong>tokens</strong> as the main currency.
            Use this calculator to manage your items and determine the right negotiation prices
            to increase your chances of profitable deals!
          </Typography>
        </Paper>
      </Container>

      {/* Footer */}
      <Box className="bg-black/20 backdrop-blur-sm border-t border-white/10 mt-20">
        <Container maxWidth="lg">
          <Box className="py-8 text-center">
            <Typography variant="body2" className="text-gray-400">
              © 2025 Blade Ball Price Negotiator. Made for the Blade Ball community.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
