type AmadeusErrorResponse = {
  response?: {
    data?: {
      errors?: Array<{
        code: number;
        title: string;
        detail: string;
        status: number;
      }>;
    };
  };
};

export function isError(error: unknown) {
  if (!error) return false;
  
  const amadeusError = error as AmadeusErrorResponse;
  if (amadeusError.response?.data?.errors?.[0]) {
    const [error] = amadeusError.response.data.errors;
    return {
      code: error.code.toString(),
      message: error.detail || error.title,
    };
  }

  return false;
}
