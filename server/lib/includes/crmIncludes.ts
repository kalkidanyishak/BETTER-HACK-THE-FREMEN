
export const crmIncludes = {
  customer: {
    include: {
      contacts: true,
      opportunities: true,
      interactions: {
        include: {
          contact: true
        }
      }
    }
  },

  contact: {
    include: {
      customer: true,
      interactions: true
    }
  },

  opportunity: {
    include: {
      customer: {
        include: {
          contacts: true
        }
      }
    }
  },

  interaction: {
    include: {
      customer: true,
      contact: true
    }
  }
};