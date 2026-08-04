# Product Database

Canonical Hierarchy

Brand

↓

Category

↓

Family

↓

Series

↓

Product Type

↓

Product

--------------------------------------------------

Canonical Product Interface

apps/web/src/features/products/types/product.types.ts

--------------------------------------------------

Canonical Dataset

apps/web/src/features/products/data/products.ts

--------------------------------------------------

Repository

apps/web/src/features/products/repository/product.repository.ts

--------------------------------------------------

Rules

Every Product has

- Brand

- Category

- Family

- Series

- Product Type

- Slug

- Part Number

No duplicated Product interface.

No fake values.

No guessed specifications.

No fake stock.

No fake prices.
