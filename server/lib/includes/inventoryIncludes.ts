
export const inventoryIncludes = {
  product: {
    include: {
      category: true,
      supplier: true,
      stock: {
        include: {
          warehouse: true,
          movements: true
        }
      }
    }
  },

  category: {
    include: {
      products: {
        include: {
          supplier: true,
          stock: true
        }
      }
    }
  },

  supplier: {
    include: {
      products: {
        include: {
          category: true,
          stock: true
        }
      }
    }
  },

  warehouse: {
    include: {
      stock: {
        include: {
          product: {
            include: {
              category: true,
              supplier: true
            }
          },
          movements: true
        }
      }
    }
  },

  stock: {
    include: {
      product: {
        include: {
          category: true,
          supplier: true
        }
      },
      warehouse: true,
      movements: true
    }
  },

  stockMovement: {
    include: {
      stock: {
        include: {
          product: {
            include: {
              category: true,
              supplier: true
            }
          },
          warehouse: true
        }
      }
    }
  }
};