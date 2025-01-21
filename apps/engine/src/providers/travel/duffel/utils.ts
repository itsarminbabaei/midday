import { DuffelError } from "@duffel/api";

export function isError(error: unknown) {
  if (!error) return false;
  if (!(error instanceof DuffelError)) return false;

  return {
    code: error.errors[0].code,
    message: error.errors[0].message,
  };
}

