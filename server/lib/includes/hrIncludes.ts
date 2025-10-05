
export const hrIncludes = {
  employee: {
    include: {
      department: true,
      position: true,
      attendances: true,
      leaves: true,
      payrolls: true
    }
  },

  department: {
    include: {
      employees: {
        include: {
          position: true,
          attendances: true
        }
      }
    }
  },

  position: {
    include: {
      employees: {
        include: {
          department: true,
          attendances: true
        }
      }
    }
  },

  attendance: {
    include: {
      employee: {
        include: {
          department: true,
          position: true
        }
      }
    }
  },

  leave: {
    include: {
      employee: {
        include: {
          department: true,
          position: true
        }
      }
    }
  },

  payroll: {
    include: {
      employee: {
        include: {
          department: true,
          position: true
        }
      }
    }
  }
};