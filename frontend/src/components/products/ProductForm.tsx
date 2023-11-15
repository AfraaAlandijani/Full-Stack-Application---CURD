import { ChangeEvent, FormEvent } from 'react'
import { Button, CssBaseline, TextField, Grid, Box, Typography, Container } from '@mui/material'

type ProductFormProps = {
  handleSubmit: (e: FormEvent) => void
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  isEdit: boolean
  productName: string
  productPrice: number
  productImage: string
  productDescription: string
  productCategories: string
  productVariants: string
  productSize: string
}

export function ProductForm({
  handleSubmit,
  handleChange,
  isEdit,
  productName,
  productPrice,
  productImage,
  productDescription,
  productCategories,
  productVariants,
  productSize
}: ProductFormProps) {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
        <Typography component="h1" variant="h5">
          Add New Product{' '}
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="text"
                name="name"
                id="name"
                label="Product name"
                value={productName}
                onChange={handleChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="text"
                name="image"
                id="image"
                label="Product image"
                value={productImage}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Product description"
                name="description"
                id="description"
                value={productDescription}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Categories: (use comma , to create multiple)"
                type="text"
                name="categories"
                id="categories"
                value={productCategories}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="text"
                label="Variants: (use comma , to create multiple)"
                name="variants"
                id="variants"
                value={productVariants}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="text"
                label="Size: (use comma , to create multiple)"
                name="size"
                id="size"
                value={productSize}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="text"
                label="Price"
                name="price"
                id="price"
                value={productPrice}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            {isEdit ? 'Update' : 'Create'}
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
