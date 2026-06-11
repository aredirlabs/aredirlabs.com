const DEFAULT_TIMEOUT_MS = 30_000;

export type AuthActionResult = {
  error: string | null;
  success: boolean;
};

type AuthClientError = {
  message?: string;
};

function normalizeAuthError(error: unknown, fallback: string): string {
  if (error && typeof error === "object" && "message" in error) {
    const message = (error as AuthClientError).message;
    if (message) return message;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
}

export async function runAuthAction(
  action: () => Promise<{ error?: AuthClientError | null }>,
  options?: {
    timeoutMs?: number;
    fallbackMessage?: string;
  },
): Promise<AuthActionResult> {
  const timeoutMs = options?.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const fallbackMessage =
    options?.fallbackMessage ?? "Authentication request failed.";

  try {
    const result = await Promise.race([
      action(),
      new Promise<never>((_, reject) => {
        setTimeout(() => {
          reject(new Error("Request timed out. Please try again."));
        }, timeoutMs);
      }),
    ]);

    if (result.error) {
      return {
        error: normalizeAuthError(result.error, fallbackMessage),
        success: false,
      };
    }

    return { error: null, success: true };
  } catch (error) {
    return {
      error: normalizeAuthError(error, fallbackMessage),
      success: false,
    };
  }
}
