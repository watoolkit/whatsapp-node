---
sidebar_position: 2
---

# Interactive Messages

Learn how to send interactive messages like buttons, lists, and products.

## Button Messages

Send messages with interactive buttons:

```typescript
await client.sendButtonMessage(
  '1234567890',
  'Please choose an option',
  [
    { id: 'btn1', title: 'Yes' },
    { id: 'btn2', title: 'No' }
  ],
  { type: 'text', text: 'Important Question' }, // header
  { text: 'Choose wisely' } // footer
);
```

## List Messages

Send messages with selectable lists:

```typescript
await client.sendListMessage(
  '1234567890',
  'Please select a product',
  'View Products',
  [
    {
      title: 'Popular Items',
      rows: [
        { id: '1', title: 'Product 1', description: 'Description 1' },
        { id: '2', title: 'Product 2', description: 'Description 2' }
      ]
    }
  ],
  { type: 'text', text: 'Our Catalog' }, // header
  { text: 'Select to learn more' } // footer
);
```

## Product Messages

Send single product or product list messages:

```typescript
// Single product
await client.sendProductMessage(
  '1234567890',
  'catalog_id',
  'product_retailer_id',
  'Check out this product!',
  { text: 'Limited time offer' }
);

// Product list
await client.sendProductListMessage(
  '1234567890',
  'catalog_id',
  [
    {
      title: 'Featured Products',
      product_items: [
        { product_retailer_id: 'product1' },
        { product_retailer_id: 'product2' }
      ]
    }
  ],
  'Our Products',
  'Check out our selection',
  { text: 'Special offers inside' }
);
```

## Flow Messages

Send flow messages for interactive experiences:

```typescript
await client.sendFlowMessage(
  '1234567890',
  'flow_id',
  'flow_token',
  'Start Flow',
  'Begin your journey',
  { text: 'Interactive Experience' },
  { text: 'Follow the steps' }
);
```

## Rating Messages

Send rating request messages:

```typescript
await client.sendRatingMessage(
  '1234567890',
  'Rate our service',
  'Please share your experience',
  'rating_id'
);
```
