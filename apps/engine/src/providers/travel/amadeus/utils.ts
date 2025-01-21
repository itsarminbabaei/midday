type AmadeusErrorResponse = {
  response?: {
    result?: {
      errors?: Array<{
        code: string;
        title?: string;
        detail?: string;
      }>;
    };
  };
};

export function isError(error: unknown) {
  if (!error) return false;
  if (!(error instanceof Error)) return false;
  const amadeusError = error as AmadeusErrorResponse;
  if (amadeusError.response?.result?.errors) {
    const [error] = amadeusError.response.result.errors;
    return {
      code: error.code,
      message: error.detail || error.title,
    };
  }

  return false;
}